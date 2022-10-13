import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface ILoginFields {
  email: string;
  password: string;
}

export type TLoginContProps = {
  isLoading: boolean;
  showPassword: boolean;
  errors: FieldErrors<ILoginFields>;
  register: UseFormRegister<ILoginFields>;
  formSumbit: (fields: ILoginFields) => void;
  handleSubmit: UseFormHandleSubmit<ILoginFields>;
  togglePasswordEye: () => void

};
