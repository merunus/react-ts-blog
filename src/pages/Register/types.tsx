import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";


export interface IRegisterFields {
  name: string;
  email: string;
  password: string;
}

export type TRegisterContProps = {
  isLoading: boolean;
  showPassword: boolean;
  errors: FieldErrors<IRegisterFields>;
  register: UseFormRegister<IRegisterFields>;
  formSumbit: (fields: IRegisterFields) => void;
  handleSubmit: UseFormHandleSubmit<IRegisterFields>;
  togglePasswordEye: () => void;
};
