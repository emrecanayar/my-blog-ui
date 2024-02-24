export interface CreatedArticleResponse{
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createDate: string;
    updateDate: string;
    userId:string;
    categoryId:string;
}