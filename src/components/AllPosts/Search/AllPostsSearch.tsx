import { useAppDispatch } from "../../../redux/store";
import { ISearchFields } from "./types";
import { useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { useCallback } from "react";
import {
  clearSearch,
  fetchAllPosts,
  setSearch,
} from "../../../redux/post/slice";
import AllPostsSearchContainer from "./AllPostsSearchContainer";

const AllPostsSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, watch, resetField } =
    useForm<ISearchFields>({
      mode: "onChange",
    });

  const submitSearch = (fields: ISearchFields) => {
    const { search } = fields;
    dispatch(fetchAllPosts({ search }));
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearch(str));
      submitSearch({ search: str });
    }, 750),
    []
  );

  const clearSearchValue = () => {
    resetField("search");
    dispatch(clearSearch());
    dispatch(fetchAllPosts({ search: "" }));
  };

  const onChange = (value: string) => updateSearchValue(value);

  return (
    <AllPostsSearchContainer
      onChange={onChange}
      clearSearchValue={clearSearchValue}
      submitSearch={submitSearch}
      handleSubmit={handleSubmit}
      setValue={setValue}
      watch={watch}
      register={register}
    />
  );
};

export default AllPostsSearch;
