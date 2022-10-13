import { TPost } from "../../redux/post/types";

export interface TPostProps extends TPost {
  name?: string;
  avatar?: string;
  isLiked?: boolean;
  isEditable?: boolean;
  isFullPost?: boolean;
  isFullImage?: boolean;
  deletePost?: () => void;
  editPost?: () => void;
  handleLikePost?: (postId: string) => void;
  handleFullImage?: () => void;
  uploadImage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type TSkeletonProps = {
  isFullPost?: boolean;
};
