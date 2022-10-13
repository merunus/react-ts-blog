import React, { useEffect, useState } from "react";
import { NoPosts, Post, PostSkeleton, UserInfo } from "../../components";
import { fetchMyPosts, likePost, sortMyPosts } from "../../redux/post/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import { selectMyPosts, selectPostData } from "../../redux/post/selectors";
import styles from "./MyPosts.module.scss";
import { v4 as uuidv4 } from "uuid";
import { fetchAllUsers } from "../../redux/user/slice";
import moment from "moment";
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const MyPosts: React.FC = () => {
  const { user } = useAppSelector(selectUserData);
  const myPosts = useAppSelector(selectMyPosts);
  const { isLoading } = useAppSelector(selectPostData);
  const [noPosts, setNoPosts] = useState(false);
  const dispatch = useAppDispatch();

  const dates = new Set(
    myPosts.map((post) => moment(post.dateCreated).format("dddd"))
  );

  const chartData = {
    labels: Array.from(dates),
    datasets: [
      {
        label: "Posts Created",
        data: Array.from(dates).map((date) => {
          const posts = myPosts.filter(
            (post) => moment(post.dateCreated).format("dddd") === date
          );
          return posts.length;
        }),
        backgroundColor: ["#1976D2"],
      },
    ],
  };

  const handleLikePost = (postId: string) =>
    user && dispatch(likePost({ postId, userId: user?._id, isMyPosts: true }));

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user)
      dispatch(fetchMyPosts(user._id)).then(
        (response) => response.payload.data.length < 1 && setNoPosts(true)
      );
  }, [dispatch, user]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source && destination) dispatch(sortMyPosts({ source, destination }));
  };

  const skeletons = [...Array(6)].map(() => {
    return <PostSkeleton key={uuidv4()} />;
  });

  const posts = myPosts.map((post, index) => {
    if (user) {
      const isLiked = post.likes.includes(user._id);
      return (
        <Draggable index={index} draggableId={index.toString()} key={uuidv4()}>
          {(provided) => (
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <Post
                avatar={user.avatar}
                isLiked={isLiked}
                {...post}
                key={uuidv4()}
                name={user?.name}
                handleLikePost={handleLikePost}
              />
            </div>
          )}
        </Draggable>
      );
    }
    return null;
  });

  if (noPosts) {
    return (
      <section className={styles.container}>
        <UserInfo user={user} chartData={chartData} />
        <NoPosts isAllPost={false} />;
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <UserInfo user={user} chartData={chartData} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="Posts List">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.posts}
            >
              {isLoading ? skeletons : posts}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default MyPosts;
