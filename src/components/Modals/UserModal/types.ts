import { Modals, TUser } from "../../../redux/user/types";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

export interface IUpdateProfileFields {
  Avatar?: FileList;
  Name: string;
  Profession?: string;
  Skills?: string;
}

export type TUserModalContProps = {
  isModalOpen: Modals;
  close: () => void;
  logoutUser: () => void;
  uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  image: string;
  user: TUser | null;
  customStyles: {
    overlay: {
      backgroundColor: string;
    };
    content: {
      top: string;
      left: string;
      right: string;
      bottom: string;
      marginRight: string;
      transform: string;
      maxWidth: string;
      minWidth: string;
      backgroundColor: string;
    };
  };
  register: UseFormRegister<IUpdateProfileFields>;
  handleSubmit: UseFormHandleSubmit<IUpdateProfileFields>;
  errors: FieldErrors<IUpdateProfileFields>;
  submitUpdateProfile: (data: IUpdateProfileFields) => void;
};
