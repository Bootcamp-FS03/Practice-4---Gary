import { Post } from "./post.model";
import { User } from "./user.model";

export interface Comment {
    text: string;
    author: string | User; // Puedes usar User si tienes la definición de la interfaz User
    post: string | Post; // Puedes usar Post si tienes la definición de la interfaz Post
}
  
export interface CommentForPost{
    text: string;
    author : User;
    post : string;
}