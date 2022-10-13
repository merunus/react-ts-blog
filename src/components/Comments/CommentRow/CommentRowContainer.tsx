import {
  Avatar,
  Button,
  ButtonGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { BiHeart } from "react-icons/bi";
import { BsArrow90DegUp, BsReplyFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { capitalizer } from "../../../utils/capitalizer";
import CommentRow from "./CommentRow";
import { v4 as uuidv4 } from "uuid";
import styles from "../Comments.module.scss";
import { TCommentRowContProps } from "./types";
import { api, Endpoints } from "../../../models/endpoints";
import moment from "moment";

const CommentRowContainer: React.FC<TCommentRowContProps> = ({
  isReply,
  isReplying,
  commenter,
  isEditing,
  text,
  dateCreated,
  isEditable,
  likes,
  user,
  replies,
  users,
  handleDelete,
  handleEdit,
  handleLike,
  handleReply,
  submitEditForm,
  submitReplyForm,
  errors,
  handleSubmit,
  handleSubmitReply,
  registerEdit,
  registerReply,
  replyErrors,
}) => {
  return (
    <div className={`${isReply ? `${styles.replyRow}` : `${styles.row}`}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {isReply && <BsArrow90DegUp className={styles.replyArrow} />}
          <Avatar
            sx={{ width: 40, height: 40 }}
            src={`${api.BaseURL}${commenter?.avatar}`}
          />
          <div className={styles.info}>
            <Typography classes={{ root: styles.name }} variant="h4">
              {commenter && commenter.name && commenter?.name.length > 15
                ? `${commenter?.name.substring(0, 15)}...`
                : commenter?.name}
            </Typography>
            {!isEditing && (
              <Typography classes={{ root: styles.comment }} variant="h6">
                {text.length > 20 ? `${text.substring(0, 20)}...` : text}
              </Typography>
            )}
            {isEditing && (
              <form
                id="edit-comment"
                onSubmit={handleSubmit(submitEditForm)}
                className={styles.editForm}
              >
                <TextField
                  autoComplete="off"
                  defaultValue={text}
                  label="Text"
                  variant="standard"
                  helperText={capitalizer(errors?.comment?.message)}
                  error={Boolean(errors.comment?.message)}
                  {...registerEdit("comment", {
                    required: "Please provide comment!",
                  })}
                />
                <Button
                  form="edit-comment"
                  type="submit"
                  fullWidth={isReply}
                  size="small"
                  variant="outlined"
                  classes={{ root: styles.editBtn }}
                >
                  Edit
                </Button>
              </form>
            )}
          </div>
        </div>
        <div className={styles.time}>
          <p>{moment(dateCreated).format("HH:mm dddd")}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.iconsBlock}>
          {!isReply && (
            <BsReplyFill onClick={handleReply} className={styles.reply} />
          )}

          {isEditable && (
            <div className={styles.icons}>
              <MdModeEdit onClick={handleEdit} />
              <IoMdClose onClick={handleDelete} />
            </div>
          )}
          {!isEditable && user && (
            <div className={styles.like}>
              <BiHeart
                onClick={handleLike}
                className={
                  likes.includes(user._id)
                    ? `${styles.heart} ${styles.liked}`
                    : styles.heart
                }
              />
              <p>{likes.length}</p>
            </div>
          )}
        </div>
      </div>

      <div className={styles.replies}>
        {replies &&
          replies.map((reply) => {
            const commenter = users.find(
              (user) => user._id === reply.commentedBy
            );
            return (
              <CommentRow
                key={uuidv4()}
                {...reply}
                commenter={commenter}
                isReply={true}
              />
            );
          })}
      </div>
      {isReplying && (
        <form
          className={styles.replyForm}
          id="reply-comment"
          onSubmit={handleSubmitReply(submitReplyForm)}
        >
          <TextField
            autoComplete="off"
            fullWidth
            label="Reply to the comment"
            variant="outlined"
            helperText={capitalizer(replyErrors?.reply?.message)}
            error={Boolean(replyErrors.reply?.message)}
            {...registerReply("reply")}
          />
          <ButtonGroup
            variant="outlined"
            aria-label="outlined primary button group"
          >
            <Button type="submit">Reply</Button>
            <Button onClick={handleReply} color="error">
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      )}
    </div>
  );
};

export default CommentRowContainer;
