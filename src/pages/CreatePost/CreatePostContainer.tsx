import React from "react";
import { TCreatePostContProps } from "./types";
import styles from "./CreatePost.module.scss";
import { capitalizer } from "../../utils/capitalizer";
import { Button, Paper, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Paths } from "../../models/paths";

const CreatePostContainer: React.FC<TCreatePostContProps> = ({
  postId,
  errors,
  formSubmit,
  handleSubmit,
  register,
}) => {
  return (
    <section className={styles.container}>
      <Paper style={{ padding: 30 }}>
        <form id="create-post" onSubmit={handleSubmit(formSubmit)}>
          <TextField
            classes={{ root: styles.title }}
            variant="standard"
            placeholder="Post title..."
            fullWidth
            helperText={capitalizer(errors?.title?.message)}
            error={Boolean(errors.title?.message)}
            {...register("title", { required: "Please provide name!" })}
          />
          <TextField
            classes={{ root: styles.description }}
            variant="standard"
            placeholder="Description"
            fullWidth
            helperText={capitalizer(errors?.description?.message)}
            error={Boolean(errors.description?.message)}
            {...register("description", { required: "Please provide name!" })}
          />
          <TextField
            fullWidth
            id="standard-multiline-static"
            label="Text"
            multiline
            rows={4}
            helperText={capitalizer(errors?.text?.message)}
            error={Boolean(errors.text?.message)}
            variant="standard"
            {...register("text", { required: "Please provide name!" })}
          />
        </form>
        <div className={styles.buttons}>
          <Button
            form="create-post"
            type="submit"
            size="large"
            variant="contained"
          >
            {postId ? "Edit" : "Post"}
          </Button>
          <Link to={postId ? `${Paths.FullPost}/${postId}` : Paths.Home}>
            <Button size="large">Cancel</Button>
          </Link>
        </div>
      </Paper>
    </section>
  );
};

export default CreatePostContainer;
