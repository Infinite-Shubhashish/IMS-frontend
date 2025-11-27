export interface PostResponse {
    id: number;
    title: string;
    description: string;
    postType: string;
    postStatus: string;
    adminComment: string | null;
    createdById: number;
    createdByUsername: string;
    createdDate: string;
    updatedDate: string;
}
