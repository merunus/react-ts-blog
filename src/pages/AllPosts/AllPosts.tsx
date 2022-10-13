import { useEffect } from "react";
import { AllPostsSearch, NoPosts, Post, PostSkeleton } from "../../components";
import { selectPostData } from "../../redux/post/selectors";
import { fetchAllPosts, likePost } from "../../redux/post/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styles from "./AllPosts.module.scss";
import { v4 as uuidv4 } from "uuid";
import { fetchAllUsers } from "../../redux/user/slice";
import { selectUserData } from "../../redux/user/selectors";
import AllPostsPagination from "../../components/AllPosts/Pagination/AllPostsPagination";

const AllPosts = () => {
  const dispatch = useAppDispatch();
  const { allPosts, isLoading, totalPages } = useAppSelector(selectPostData);
  const { users, user } = useAppSelector(selectUserData);
  useEffect(() => {
    dispatch(fetchAllPosts({ search: "" }));
  }, [dispatch]);

  const handleLikePost = (postId: string) =>
    user && dispatch(likePost({ postId, userId: user?._id, isAllPosts: true }));

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const posts = allPosts.map((post) => {
    if (user) {
      const creator = users.find((user) => user._id === post.postedBy);
      const isLiked = post.likes.includes(user._id);
      return (
        <Post
          avatar={creator?.avatar}
          key={uuidv4()}
          name={creator?.name}
          {...post}
          isLiked={isLiked}
          handleLikePost={handleLikePost}
        />
      );
    }
    return null;
  });

  const skeletons = [...Array(6)].map(() => {
    return <PostSkeleton key={uuidv4()} />;
  });

  if (!isLoading && allPosts.length < 1) {
    return (
      <section className={styles.container}>
        <AllPostsSearch />
        <NoPosts isAllPost={true} />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <AllPostsSearch />
      <div className={styles.posts}>{isLoading ? skeletons : posts}</div>
      {totalPages > 1 && <AllPostsPagination />}
    </section>
  );
};

export default AllPosts;
