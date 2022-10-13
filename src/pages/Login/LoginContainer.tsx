import React from "react";
import { TLoginContProps } from "./types";
import styles from "../Register/Register.module.scss";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { InputAdornment } from "@mui/material";
import { AiFillEye, AiOutlineMail, AiFillEyeInvisible } from "react-icons/ai";
import { VscKey } from "react-icons/vsc";
import { capitalizer } from "../../utils/capitalizer";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { Paths } from "../../models/paths";

const LoginContainer: React.FC<TLoginContProps> = ({
  errors,
  formSumbit,
  handleSubmit,
  isLoading,
  register,
  showPassword,
  togglePasswordEye,
}) => {
  return (
    <Paper classes={{ root: styles.container }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Login In
      </Typography>
      <form onSubmit={handleSubmit(formSumbit)}>
        <TextField
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={capitalizer(errors?.email?.message)}
          autoComplete="off"
          className={styles.field}
          {...register("email", { required: "Please provide e-mail!" })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AiOutlineMail className={styles.icon} />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
        <Box className={styles.passwordRow}>
          <TextField
            error={Boolean(errors.password?.message)}
            autoComplete="off"
            label="Password"
            helperText={capitalizer(errors?.password?.message)}
            fullWidth
            {...register("password", { required: "Please provide password!" })}
            type={showPassword ? "text" : "password"}
            className={styles.field}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VscKey className={styles.icon} />
                </InputAdornment>
              ),
            }}
            variant="standard"
          />
          {!showPassword ? (
            <AiFillEye onClick={togglePasswordEye} className={styles.eye} />
          ) : (
            <AiFillEyeInvisible
              onClick={togglePasswordEye}
              className={styles.eye}
            />
          )}
        </Box>
        <Button
          disabled={isLoading}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
        <Typography classes={{ root: styles.question }}>
          Not registered yet?
          <Link to={Paths.Register} className={styles.questionBtn}>
            Sign Up
          </Link>
        </Typography>
      </form>
    </Paper>
  );
};

export default LoginContainer;
