import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../../core/services/posts.service';
import { ProfileService } from '../../../../core/services/profile.service';
import { CreatePost } from '../../../../core/models/post.model';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'fs-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass'],
})
export class PostFormComponent {
  isLoading: boolean = false;
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postsService: PostsService, private profileService: ProfileService, private loggerService: LoggerService) {
    this.postForm = this.fb.group({
      postContent: ['', Validators.required],
    });
  }


  create(): void {
    this.isLoading = true;
    const authorId = this.profileService.profile?._id;

    if (this.postForm.valid && authorId) {
      let createPostBody: CreatePost =
        {
          author: authorId,
          text: this.postForm.get('postContent')?.value,
        };
      this.postsService.createPost(createPostBody).subscribe({
        next: (value) => {
          this.isLoading = false;
          this.loggerService.handleSuccess('New post created successfully');
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.loggerService.handleError(err);
        },
      });
    }
  }


}
