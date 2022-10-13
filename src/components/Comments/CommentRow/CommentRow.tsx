import React, { useState } from "react";
import { TComment } from "../../../redux/comment/types";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IReplyCommentFields, IUpdateCommentFields } from "../types";
import { selectUserData } from "../../../redux/user/selectors";
import {
  createComment,
  deleteComment,
  editComment,
  likeComment,
} from "../../../redux/comment/slice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  editCommentSchema,
  replyCommentSchema,
} from "../../../validation/validations";
import { useForm } from "react-hook-form";
import CommentRowContainer from "./CommentRowContainer";

const CommentRow: React.FC<TComment> = React.memo(
  ({
    text,
    commentedBy,
    _id,
    commenter,
    likes,
    dateCreated,
    postId,
    replies,
    isReply,
  }) => {
    const dispatch = useAppDispatch();
    const { user, users } = useAppSelector(selectUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const isEditable = user?._id === commentedBy;
    const {
      register: registerReply,
      handleSubmit: handleSubmitReply,
      setValue: setReplyValue,
      formState: { errors: replyErrors },
    } = useForm<IReplyCommentFields>({
      mode: "onChange",
      resolver: yupResolver(replyCommentSchema),
    });
    const {
      register: registerEdit,
      handleSubmit,
      formState: { errors },
    } = useForm<IUpdateCommentFields>({
      mode: "onChange",
      resolver: yupResolver(editCommentSchema),
    });

    const handleDelete = () => {
      if (window.confirm("Are you sure you want to delete this comment?"))
        dispatch(deleteComment(_id));
    };

    const handleReply = () => {
      setIsReplying((prevValue) => !prevValue);
      setReplyValue("reply", "");
      setIsEditing(false);
    };

    const handleEdit = () => {
      setIsEditing((prevValue) => !prevValue);
      setIsReplying(false);
    };

    const handleLike = () =>
      user && dispatch(likeComment({ commentId: _id, userId: user?._id }));

    const submitReplyForm = (data: IReplyCommentFields) => {
      const { reply } = data;
      if (postId)
        dispatch(
          createComment({ text: reply, followedCommentID: _id, postId })
        );
    };

    const submitEditForm = (data: IUpdateCommentFields) => {
      const { comment } = data;
      dispatch(editComment({ commentId: _id, text: comment }));
    };

    return (
      <CommentRowContainer
        isReply={isReply}
        isReplying={isReplying}
        commenter={commenter}
        isEditing={isEditing}
        text={text}
        dateCreated={dateCreated}
        isEditable={isEditable}
        likes={likes}
        replies={replies}
        user={user}
        users={users}
        handleDelete={handleDelete}
        handleReply={handleReply}
        handleEdit={handleEdit}
        handleLike={handleLike}
        submitReplyForm={submitReplyForm}
        submitEditForm={submitEditForm}
        errors={errors}
        replyErrors={replyErrors}
        handleSubmit={handleSubmit}
        handleSubmitReply={handleSubmitReply}
        registerEdit={registerEdit}
        registerReply={registerReply}
      />
    );
  }
);

export default CommentRow;
