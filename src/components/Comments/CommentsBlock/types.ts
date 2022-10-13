import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ICreateCommentFields } from "../types";

export type TCommentsContainerProps = {
  isLoading: boolean;
  skeletons: JSX.Element[];
  commentaries: JSX.Element[];
  errors: FieldErrors<ICreateCommentFields>;
  register: UseFormRegister<ICreateCommentFields>;
  submitForm: (fields: ICreateCommentFields) => void;
  handleSubmit: UseFormHandleSubmit<ICreateCommentFields>;
};
