import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../../models/endpoints";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { selectUserData } from "../../../redux/user/selectors";
import {
  closeModal,
  fetchUpdateAvatar,
  fetchUpdateUser,
  logout,
} from "../../../redux/user/slice";
import { handleCustomStyles } from "../../../utils/modalCustomStyles";
import { updateSchema } from "../../../validation/validations";
import { IUpdateProfileFields } from "./types";
import UserModalContainer from "./UserModalContainer";

const UserModal: React.FC = () => {
  const { isModalOpen, user } = useAppSelector(selectUserData);
  const image = user?.avatar ? `${api.BaseURL}${user.avatar}` : "";
  const dispatch = useAppDispatch();
  const customStyles = handleCustomStyles("sidebar");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateProfileFields>({
    mode: "onChange",
    resolver: yupResolver(updateSchema),
  });

  const close = () => {
    dispatch(closeModal("userModal"));
  };

  const logoutUser = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout());
      dispatch(closeModal("userModal"));
      navigate("/login");
    }
  };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const avatar = e.target.files[0];
      const formData = new FormData();
      formData.append("avatar", avatar);
      if (user)
        dispatch(fetchUpdateAvatar({ avatar: formData, userId: user?._id }));
    }
  };

  const submitUpdateProfile: SubmitHandler<IUpdateProfileFields> = (
    data: IUpdateProfileFields
  ) => {
    const { Name, Profession, Skills } = data;
    if (user) {
      dispatch(fetchUpdateUser({ userId: user._id, Name, Profession, Skills }));
    }
  };

  return (
    <UserModalContainer
      isModalOpen={isModalOpen}
      uploadImage={uploadImage}
      close={close}
      logoutUser={logoutUser}
      image={image}
      user={user}
      customStyles={customStyles}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      submitUpdateProfile={submitUpdateProfile}
    />
  );
};

export default UserModal;
