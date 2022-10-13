import { Skeleton } from "@mui/material";
import styles from "../Comments.module.scss";

const CommentRowSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <Skeleton variant="circular" width={40} height={40} />
      <div className={styles.info}>
        <Skeleton classes={{ root: styles.name }} width={100} height={33} />
        <Skeleton classes={{ root: styles.name }} width={250} height={23} />
      </div>
    </div>
  );
};

export default CommentRowSkeleton;
