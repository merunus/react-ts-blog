import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../models/paths";
import { selectCommentData } from "../../redux/comment/selectors";
import { fetchComments } from "../../redux/comment/slice";
import { selectPostData, selectSinglePost } from "../../redux/post/selectors";
import {
  deletePost,
  fetchSinglePost,
  fetchUploadPostImage,
  likePost,
} from "../../redux/post/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import { fetchAllUsers } from "../../redux/user/slice";
import FullPostContainer from "./FullPostContainer";

const FullPost = () => {
  const [isFullImage, setIsFullImage] = useState(false);
  const { user, users } = useAppSelector(selectUserData);
  const { comments } = useAppSelector(selectCommentData);
  const post = useAppSelector(selectSinglePost);
  const { isLoading } = useAppSelector(selectPostData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { pathname } = useLocation();
  const isEditable = post?.postedBy === user?._id;
  const creator = users.find((user) => user._id === post?.postedBy);
  
  useEffect(() => {
    if (postId) dispatch(fetchSinglePost(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    if (postId) dispatch(fetchComments(postId));
  }, [dispatch, postId, comments.length]);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDeletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId)).then(() => navigate(Paths.Home));
    }
  };

  const handleLikePost = (postId: string) => {
    user && dispatch(likePost({ postId, userId: user?._id, isFullPost: true }));
  };

  const handleFullImage = () => setIsFullImage((prevValue) => !prevValue);

  const goBack = () => {
    navigate(-1);
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.append("image", image);
      if (post)
        dispatch(fetchUploadPostImage({ image: formData, postId: post?._id }));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <FullPostContainer
      post={post}
      uploadImage={uploadImage}
      goBack={goBack}
      user={user}
      handleDeletePost={handleDeletePost}
      handleLikePost={handleLikePost}
      handleFullImage={handleFullImage}
      creator={creator}
      isEditable={isEditable}
      isLoading={isLoading}
      isFullImage={isFullImage}
    />
  );
};

export default FullPost;
