import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { selectCommentData } from "../../../redux/comment/selectors";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { createCommentSchema } from "../../../validation/validations";
import CommentRow from "../CommentRow/CommentRow";
import { ICreateCommentFields } from "../types";
import { v4 as uuidv4 } from "uuid";
import { createComment } from "../../../redux/comment/slice";
import { selectPostData } from "../../../redux/post/selectors";
import CommentRowSkeleton from "../CommentRow/CommentRowSkeleton";
import { selectUserData } from "../../../redux/user/selectors";
import CommentsContainer from "./CommentsContainer";

const Comments: React.FC = () => {
  const { comments, isLoading, replies } = useAppSelector(selectCommentData);
  const { post } = useAppSelector(selectPostData);
  const { users } = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateCommentFields>({
    mode: "onSubmit",
    resolver: yupResolver(createCommentSchema),
  });

  const submitForm = (fields: ICreateCommentFields) => {
    const { text } = fields;
    if (post) {
      const postId = post?._id;
      dispatch(createComment({ text, postId })).then(() =>
        setValue("text", "")
      );
    }
  };

  const getReplies = (commentId: string) =>
    replies
      .filter((reply) => reply.followedCommentID === commentId)
      .sort(
        (a, b) =>
          new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime()
      );

  const commentaries = comments.map((comment) => {
    const commenter = users.find((user) => user._id === comment.commentedBy);
    return (
      <CommentRow
        key={uuidv4()}
        {...comment}
        commenter={commenter}
        postId={post?._id}
        replies={getReplies(comment._id)}
      />
    );
  });

  const skeletons = [...Array(comments.length)].map(() => {
    return <CommentRowSkeleton key={uuidv4()} />;
  });

  return (
    <CommentsContainer
      commentaries={commentaries}
      isLoading={isLoading}
      skeletons={skeletons}
      errors={errors}
      register={register}
      submitForm={submitForm}
      handleSubmit={handleSubmit}
    />
  );
};

export default Comments;
