import React from "react";
import { BiHeart, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Paths } from "../../models/paths";
import { capitalizer } from "../../utils/capitalizer";
import styles from "./Post.module.scss";
import { FiTrash } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { TPostProps } from "./types";
import moment from "moment";
import { Avatar, Button } from "@mui/material";
import { api, Endpoints } from "../../models/endpoints";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";

const Post: React.FC<TPostProps> = ({
  title,
  description,
  likes,
  _id,
  dateCreated,
  name,
  fullText,
  isFullPost,
  deletePost,
  isEditable,
  editPost,
  handleLikePost,
  isLiked,
  avatar,
  image,
  isFullImage,
  uploadImage,
  handleFullImage,
}) => {
  return (
    <article className={isFullPost ? styles.fullContainer : styles.container}>
      {image && (
        <img
          className={
            isFullImage ? `${styles.image} ${styles.full}` : styles.image
          }
          src={`${api.BaseURL}${image}`}
          alt="img"
        />
      )}
      {isFullPost && (
        <>
          {image &&
            (isFullImage ? (
              <BiShow
                onClick={handleFullImage}
                className={styles.showFullImage}
              />
            ) : (
              <AiOutlineEyeInvisible
                onClick={handleFullImage}
                className={styles.showFullImage}
              />
            ))}
        </>
      )}

      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.userInfo}>
            <Avatar src={avatar ? `${api.BaseURL}${avatar}` : ""} />
            <div className={styles.info}>
              <h1>{name}</h1>
              <p>{moment(dateCreated).format("HH:mm MMMM d, YYYY ")}</p>
            </div>
          </div>

          {isFullPost && isEditable && (
            <div className={styles.buttons}>
              <div className={styles.imageUpload}>
                <Button
                  classes={{ root: styles.upload }}
                  size="small"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: "0px auto 0 auto",
                  }}
                  component="label"
                >
                  <BsCardImage />
                  <input
                    hidden
                    accept="image/*"
                    onChange={uploadImage}
                    type="file"
                  />
                </Button>
              </div>
              <FiTrash onClick={deletePost} />
              <Link to={`${Paths.EditPost}/${_id}`}>
                <MdEdit onClick={editPost} />
              </Link>
            </div>
          )}
        </header>
        <div className={styles.title}>
          <h1>
            {isFullPost ? (
              capitalizer(title)
            ) : (
              <Link to={`${Paths.FullPost}/${_id}`}>{capitalizer(title)}</Link>
            )}
          </h1>
          <div className={styles.description}>
            <p>{capitalizer(description)}</p>
            <hr />
          </div>
        </div>
        {isFullPost && (
          <div className={styles.fullText}>
            <h1>{fullText}</h1>
          </div>
        )}
        <div className={styles.icons}>
          <div className={styles.iconRow}>
            <BiHeart
              onClick={() => handleLikePost?.(_id)}
              className={isLiked && styles.liked}
            />
            <p>{likes ? likes.length : 0}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Post;
