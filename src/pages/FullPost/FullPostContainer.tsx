import React from "react";
import { TFullPostContProps } from "./types";
import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Comments, Post, PostSkeleton } from "../../components";
import styles from "./FullPost.module.scss";

const FullPostContainer: React.FC<TFullPostContProps> = ({
  goBack,
  handleDeletePost,
  handleFullImage,
  handleLikePost,
  isEditable,
  isFullImage,
  isLoading,
  post,
  creator,
  user,
  uploadImage,
}) => {
  return (
    <Container classes={{ root: styles.container }}>
      <div className={styles.back}>
        <Button
          onClick={goBack}
          variant="outlined"
          startIcon={<AiOutlineArrowLeft />}
        >
          Back
        </Button>
      </div>
      {post && !isLoading ? (
        <Post
          image={post.image}
          isFullImage={isFullImage}
          avatar={creator?.avatar}
          isLiked={post.likes.includes(user ? user._id : "")}
          isEditable={isEditable}
          {...post}
          name={creator?.name}
          isFullPost
          uploadImage={uploadImage}
          handleFullImage={handleFullImage}
          deletePost={handleDeletePost}
          handleLikePost={handleLikePost}
        />
      ) : (
        <PostSkeleton isFullPost />
      )}
      <Comments />
    </Container>
  );
};

export default FullPostContainer;
