
import { Modals } from "../../../redux/user/types";

export type TSidebarModalContProps = {
  isModalOpen: Modals;
  close: () => void;
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
};
