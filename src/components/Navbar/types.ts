import { TUser } from "../../redux/user/types";

export type TNavbarContProps = {
  user: TUser | null;
  openSidebar: (name: string) => void;
};
