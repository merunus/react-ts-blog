import { useState } from "react";
import { selectPostData } from "../../../redux/post/selectors";
import { fetchAllPosts } from "../../../redux/post/slice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import AllPostsPaginationContainer from "./AllPostsPaginationContainer";

const AllPostsPagination: React.FC = () => {
  const { totalPages, search } = useAppSelector(selectPostData);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const handleChange = (pageNumber: number) => {
    setPage(pageNumber);
    dispatch(fetchAllPosts({ search: search, page: pageNumber, totalPages }));
    window.scroll(0, 0);
  };

  return (
    <AllPostsPaginationContainer
      page={page}
      totalPages={totalPages}
      handleChange={handleChange}
    />
  );
};

export default AllPostsPagination;
