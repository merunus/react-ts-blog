import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { capitalizer } from "../../../utils/capitalizer";
import styles from "../Comments.module.scss";
import { TCommentsContainerProps } from "./types";

const CommentsContainer: React.FC<TCommentsContainerProps> = ({
  isLoading,
  skeletons,
  commentaries,
  errors,
  register,
  submitForm,
  handleSubmit,
}) => {
  return (
    <Paper classes={{ root: styles.container }}>
      <Typography sx={{ textAlign: "center" }} variant="h6">
        Commentaries
      </Typography>
      {isLoading ? skeletons : commentaries}
      <div className={styles.root}>
        <div className={styles.form}>
          <form id="create-comment" onSubmit={handleSubmit(submitForm)}>
            <TextField
              label="Write comment"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              helperText={capitalizer(errors?.text?.message)}
              error={Boolean(errors.text?.message)}
              {...register("text", { required: "Please provide text!" })}
            />
            <Button type="submit" form="create-comment" variant="contained">
              Send comment
            </Button>
          </form>
        </div>
      </div>
    </Paper>
  );
};

export default CommentsContainer;
