import { TUser } from "../user/types";

export type TComment = {
  commenter?: TUser | null;
  isReply?: boolean;
  _id: string;
  commentedBy: string;
  followedCommentID?: string;
  postId?: string;
  text: string;
  dateCreated: string;
  likes: string[];
  replies?: TComment[];
};

export interface ICommentSliceState {
  comments: TComment[];
  replies: TComment[];
  isLoading: boolean;
}

export type TEditCommentParams = {
  text: string;
  commentId: string;
};

export type TLikeCommentParams = {
  commentId: string;
  userId: string;
};
