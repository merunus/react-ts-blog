import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IRegisterFields } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../models/paths";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fetchRegister, fetchToken } from "../../redux/user/slice";
import { selectUserData } from "../../redux/user/selectors";
import { registerSchema } from "../../validation/validations";
import RegisterContainer from "./RegisterContainer";
const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, user } = useAppSelector(selectUserData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFields>({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const togglePasswordEye = () => setShowPassword((prevValue) => !prevValue);

  const formSumbit = async (fields: IRegisterFields) => {
    const { email, password } = fields;
    dispatch(fetchRegister(fields)).then(() =>
      dispatch(fetchToken({ email, password }))
    );
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(Paths.Home);
      }, 1000);
    }
  }, [navigate, user]);

  return (
    <RegisterContainer
      isLoading={isLoading}
      togglePasswordEye={togglePasswordEye}
      formSumbit={formSumbit}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      showPassword={showPassword}
    />
  );
};

export default Register;
