import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/core/models/post.model';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'fs-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.sass'],
})
export class FeedComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postsService.posts$;
  }

  postTrackByFn(index: number, post: Post) {
    return post._id;
  }
}
