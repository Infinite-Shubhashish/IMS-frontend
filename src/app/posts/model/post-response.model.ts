export interface PostResponse {
    id: number;
    title: string;
    description: string;
    postType: string;
    postStatus: string;
    //
    commentCount: number | 0;
    adminComment: string | null;
    createdById: number;
    createdByUsername: string;
    createdDate: string;
    updatedDate: string;
}
