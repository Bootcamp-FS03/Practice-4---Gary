import { Component, Input } from '@angular/core';
import { Comment, CommentForPost } from 'src/app/core/models/comment.model';
import { Post } from 'src/app/core/models/post.model';
import { PostsService } from 'src/app/core/services/posts.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
})
export class PostComponent {
  @Input() post!: Post;

  constructor(public readonly profileService: ProfileService, private readonly postService : PostsService) {}

  showEditModal() {
    Swal.fire({
      title: 'Edit Post',
      input: 'text',
      inputValue: this.post.text,
      showCancelButton: true,
      confirmButtonText: 'Save',
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        return this.postService.updatePost(this.post._id, text).subscribe({
          next: (value) => {
            this.post.text = text;
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
            });
          },
        })
      },
    })
  }

  showDeleteModal() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this post!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.postService.deletePost(this.post._id);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Post deleted successfully');
      }
    });
  }

  commentPost() {
    
      
    Swal.fire({
      title: 'Comment',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Comment',
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        const comment : Comment = {
          text: text,
          author: this.profileService.profile?._id!,
          post: this.post._id,
        };
        return this.postService.createComment(this.post._id, comment).subscribe({
          next: (value) => {
            Swal.fire('Comment created successfully');
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
            });
          },
        }); 
      },
    });
  }

  getCommentsFromPost() {
    this.postService.getComments(this.post._id).subscribe({
      next: (comments : CommentForPost[]) => {
        if(!comments) {
          Swal.fire({
            icon: 'info',
            title: 'No comments',
            text: 'There are no comments for this post',
          });
          return;
        }
        Swal.fire({
          title: 'Comments',
          html: comments.map((comment) => `<p> ${comment.author.username} says "${comment.text}"</p>`).join(''),
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again.',
        });
      },
    });
  }
}
