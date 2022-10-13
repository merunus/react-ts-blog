import { Link } from "react-router-dom";
import { Paths } from "../../models/paths";
import styles from "./NoPosts.module.scss";
import Image from "../../assets/images/no-posts.svg";
import { TNotFound } from "./types";

const NoPosts: React.FC<TNotFound> = ({ isAllPost }) => {
  return (
    <section className={styles.container}>
      <div className={styles.info}>
        <h1>{isAllPost ? `No posts ` : `You don't have any posts yet`}</h1>
        {!isAllPost && (
          <Link to={Paths.CreatePost} className={styles.btn}>
            Create Post
          </Link>
        )}
      </div>
      <img src={Image} className={styles.img} alt="no-posts" />
    </section>
  );
};

export default NoPosts;
