export interface ICreateCommentFields {
  text: string;
}
export interface IUpdateCommentFields {
  comment: string;
}
export interface IReplyCommentFields {
  reply: string;
}

export type TCreateCommentParams = {
  postId: String;
  text: string;
  followedCommentID?: string;
};
