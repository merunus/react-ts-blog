import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { TComment } from "../../../redux/comment/types";
import { TUser } from "../../../redux/user/types";
import { IReplyCommentFields, IUpdateCommentFields } from "../types";

export type TCommentRowContProps = {
  isReply?: boolean;
  isReplying: boolean;
  commenter: TUser | null | undefined;
  isEditing: boolean;
  text: string;
  dateCreated: string;
  isEditable: boolean;
  likes: string[];
  replies?: TComment[];
  user: TUser | null;
  users: TUser[];
  handleDelete: () => void;
  handleReply: () => void;
  handleEdit: () => void;
  handleLike: () => void;
  submitReplyForm: (data: IReplyCommentFields) => void;
  submitEditForm: (data: IUpdateCommentFields) => void;
  registerReply: UseFormRegister<IReplyCommentFields>;
  registerEdit: UseFormRegister<IUpdateCommentFields>;
  handleSubmitReply: UseFormHandleSubmit<IReplyCommentFields>;
  handleSubmit: UseFormHandleSubmit<IUpdateCommentFields>;
  replyErrors: FieldErrors<IReplyCommentFields>;
  errors: FieldErrors<IUpdateCommentFields>;
};
