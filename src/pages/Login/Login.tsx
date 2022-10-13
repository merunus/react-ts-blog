import { useForm } from "react-hook-form";
import { ILoginFields } from "./types";
import { loginSchema } from "../../validation/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../models/paths";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/user/selectors";
import { fetchToken, fetchUserByToken } from "../../redux/user/slice";
import { useEffect, useState } from "react";
import LoginContainer from "./LoginContainer";

const Register = () => {
  const { isLoading, user } = useAppSelector(selectUserData);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFields>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const togglePasswordEye = () => setShowPassword((prevValue) => !prevValue);

  const formSumbit = async (fields: ILoginFields) => {
    dispatch(fetchToken(fields)).then(() => dispatch(fetchUserByToken()));
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(Paths.Home);
      }, 1000);
    }
  }, [navigate, user]);

  return (
    <LoginContainer
      isLoading={isLoading}
      showPassword={showPassword}
      errors={errors}
      register={register}
      handleSubmit={handleSubmit}
      togglePasswordEye={togglePasswordEye}
      formSumbit={formSumbit}
    />
  );
};

export default Register;
