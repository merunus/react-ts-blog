import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export interface ISearchFields {
  search: string;
}
export type TSearchContainerProps = {
  onChange: (value: string) => void;
  clearSearchValue: () => void;
  submitSearch: (fields: ISearchFields) => void;
  handleSubmit: UseFormHandleSubmit<ISearchFields>;
  setValue: UseFormSetValue<ISearchFields>;
  watch: UseFormWatch<ISearchFields>;
  register: UseFormRegister<ISearchFields>;
};
