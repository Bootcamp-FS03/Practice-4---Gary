import { Author } from './author.model';

export interface Post {
  _id: string;
  text: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}


export interface CreatePost {
  text: string;
  author: string;
}
