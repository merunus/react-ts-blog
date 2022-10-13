export type TPost = {
  title: string;
  dateCreated: string;
  description: string;
  fullText: string;
  likes: string[];
  postedBy: string;
  __v?: string;
  _id: string;
  image?: string;
};

export interface IPostSliceState {
  allPosts: TPost[] | [];
  totalPages: number;
  myPosts: TPost[] | [];
  post: TPost | null;
  isLoading: boolean;
  search: string;
}

export type TCreatePostParams = {
  title: string;
  description: string;
  fullText: string;
};
export type TAllPostsParams = {
  search?: string;
  totalPages?: number;
  page?: number;
  limit?: number;
};
export type TUploadImageParams = {
  postId: string;
  image: string | FormData;
};

export interface TEditPostParams extends TCreatePostParams {
  postId: string;
}

export type TLikePostParams = {
  postId: string;
  userId: string;
  isFullPost?: boolean;
  isMyPosts?: boolean;
  isAllPosts?: boolean;
};
