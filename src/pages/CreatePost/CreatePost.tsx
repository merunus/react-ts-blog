import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../models/paths";
import { selectSinglePost } from "../../redux/post/selectors";
import { createPost, editPost, fetchSinglePost } from "../../redux/post/slice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { createPostSchema } from "../../validation/validations";
import CreatePostContainer from "./CreatePostContainer";
import { ICreatePostFields } from "./types";

const CreatePost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const post = useAppSelector(selectSinglePost);
  const { postId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreatePostFields>({
    mode: "onChange",
    resolver: yupResolver(createPostSchema),
  });

  useEffect(() => {
    if (postId) {
      dispatch(fetchSinglePost(postId));
      if (post) {
        post.title && setValue("title", post.title);
        post.title && setValue("description", post.description);
        post.title && setValue("text", post.fullText);
      }
    }
  }, [dispatch, postId, navigate, setValue]); // Linter causes infinitive loop !

  const formSubmit = async (fields: ICreatePostFields) => {
    const { title, description, text } = fields;
    if (postId) {
      dispatch(editPost({ title, description, fullText: text, postId })).then(
        () =>
          setTimeout(() => {
            navigate(`${Paths.FullPost}/${postId}`);
          }, 500)
      );
      return;
    }
    dispatch(createPost({ title, description, fullText: text })).then(() =>
      setTimeout(() => {
        navigate(Paths.Home);
      }, 500)
    );
  };

  return (
    <CreatePostContainer
      postId={postId}
      register={register}
      errors={errors}
      formSubmit={formSubmit}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePost;
