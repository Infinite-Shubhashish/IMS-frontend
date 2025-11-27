import { PostType } from "./post-type.enum";

export interface PostRequest {
    title: string;
    description: string;
    type: PostType;
}

