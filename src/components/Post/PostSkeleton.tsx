import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import styles from "./Post.module.scss";
import { TSkeletonProps } from "./types";

const PostSkeleton: React.FC<TSkeletonProps> = ({ isFullPost }) => {
  return (
    <div className={!isFullPost ? styles.skeleton : styles.skeletonIsFull}>
      <Stack spacing={1}>
        {isFullPost && (
          <Skeleton variant="rectangular" width="100%" height={300} />
        )}

        <div className={styles.skeletonContent}>
          <div className={styles.skeletonUser}>
            <div className={styles.skeletonUserDetails}>
              <div className={styles.details}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  style={{ marginRight: 10 }}
                />
                <div>
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={100} height={15} />
                </div>
              </div>
              {isFullPost && (
                <div className={styles.edit}>
                  <Skeleton
                    variant="rounded"
                    width={36}
                    height={36}
                    style={{ marginRight: 10 }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={36}
                    height={36}
                    style={{ marginRight: 10 }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={36}
                    height={36}
                    style={{ marginRight: 10 }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.skeletonInfo}>
            <Skeleton
              variant="text"
              width="80%"
              height={45}
              sx={{ marginTop: "5px" }}
            />
            <div className={styles.skeletonTags}>
              <Skeleton variant="text" width={150} height={30} />
            </div>
            {isFullPost && <Skeleton variant="text" width="60%" height={45} />}

            <Skeleton variant="text" width={50} height={30} />
          </div>
        </div>
      </Stack>
    </div>
  );
};

export default PostSkeleton;
