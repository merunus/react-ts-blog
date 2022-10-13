import { TPost } from "../../redux/post/types";
import { TUser } from "../../redux/user/types";

export type TFullPostContProps = {
  post: TPost | null;
  goBack: () => void;
  handleDeletePost: () => void;
  handleLikePost: (postId: string) => void;
  handleFullImage: () => void;
  creator?: TUser;
  isEditable: boolean;
  isLoading: boolean;
  isFullImage: boolean;
  user: TUser | null;
  uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
};
