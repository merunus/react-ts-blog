import { RootState } from "../store";

export const selectPostData = (state: RootState) => state.post;
export const selectMyPosts = (state: RootState) => state.post.myPosts;
export const selectSinglePost = (state: RootState) => state.post.post;
