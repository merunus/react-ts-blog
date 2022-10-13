import { InputAdornment, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { TSearchContainerProps } from "./types";
import styles from "./AllPostsSearch.module.scss";

const AllPostsSearchContainer: React.FC<TSearchContainerProps> = ({
  onChange,
  clearSearchValue,
  submitSearch,
  handleSubmit,
  setValue,
  watch,
  register,
}) => {
  return (
    <Paper classes={{ root: styles.container }}>
      <Typography classes={{ root: styles.title }} variant="h4">
        Search Posts
      </Typography>
      <form onSubmit={handleSubmit(submitSearch)} className={styles.form}>
        <TextField
          classes={{ root: styles.input }}
          label="Search Post"
          fullWidth
          {...register("search")}
          onChange={(e) => {
            setValue("search", e.target.value);
            onChange(e.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaSearch />
              </InputAdornment>
            ),
          }}
        />
        <IoMdClose
          onClick={clearSearchValue}
          className={
            watch("search") ? styles.clear : `${styles.clear} ${styles.hidden}`
          }
        />
      </form>
    </Paper>
  );
};

export default AllPostsSearchContainer;
