import { Pagination } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { TPaginationContainerProps } from "./types";
import styles from "./AllPostsPagination.module.scss";

const AllPostsPaginationContainer: React.FC<TPaginationContainerProps> = ({
  page,
  totalPages,
  handleChange,
}) => {
  return (
    <Container classes={{ root: styles.pagination }}>
      <Pagination
        color="primary"
        size="large"
        page={page}
        count={totalPages}
        onChange={(_, num) => handleChange(num)}
      />
    </Container>
  );
};

export default AllPostsPaginationContainer;
