import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface ICreatePostFields {
  title: string;
  description: string;
  text: string;
}

export type TCreatePostContProps = {
  postId?: string;
  errors: FieldErrors<ICreatePostFields>;
  register: UseFormRegister<ICreatePostFields>;
  formSubmit: (fields: ICreatePostFields) => void;
  handleSubmit: UseFormHandleSubmit<ICreatePostFields>;
};
