import React from "react";
import {
  Avatar,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "react-modal";
import { capitalizer } from "../../../utils/capitalizer";
import styles from "./UserModal.module.scss";
import { TUserModalContProps } from "./types";

const UserModalContainer: React.FC<TUserModalContProps> = ({
  isModalOpen,
  close,
  image,
  logoutUser,
  uploadImage,
  user,
  customStyles,
  errors,
  handleSubmit,
  register,
  submitUpdateProfile,
}) => {
  return (
    <Container>
      <Modal
        closeTimeoutMS={200}
        isOpen={isModalOpen.userModal}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Sidebar Modal"
      >
        <div>
          <Typography variant="h1" classes={{ root: styles.title }}>
            User Information
          </Typography>
          <div className={styles.container}>
            <div className={styles.info}>
              <div className={styles.avatarPart}>
                {!image ? (
                  <div className={styles.avatarPlaceholder}>
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                      }}
                    ></Avatar>
                  </div>
                ) : (
                  <div className={styles.avatar}>
                    <img alt="avatar" src={image && image} />
                  </div>
                )}
                <Button
                  size="small"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    margin: "20px auto 0 auto",
                  }}
                  variant="outlined"
                  component="label"
                >
                  Upload Avatar
                  <input
                    {...register("Avatar")}
                    hidden
                    accept="image/*"
                    onChange={(e) => uploadImage(e)}
                    type="file"
                  />
                </Button>
              </div>
              <form
                onSubmit={handleSubmit(submitUpdateProfile)}
                id="update-form"
                className={styles.inputs}
              >
                <TextField
                  {...register("Name", {
                    required: "Please provide name!",
                  })}
                  size="small"
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  className={styles.input}
                  autoComplete="off"
                  error={Boolean(errors.Name?.message)}
                  defaultValue={user?.name}
                  helperText={capitalizer(errors?.Name?.message)}
                />
                <TextField
                  {...register("Profession")}
                  size="small"
                  id="outlined-basic"
                  label="Profession"
                  variant="outlined"
                  autoComplete="off"
                  defaultValue={user?.profession}
                  error={Boolean(errors.Profession?.message)}
                  helperText={capitalizer(errors?.Profession?.message)}
                  className={styles.input}
                />
                <TextField
                  {...register("Skills")}
                  size="small"
                  id="outlined-basic"
                  label="Skills"
                  variant="outlined"
                  autoComplete="off"
                  defaultValue={user?.skills}
                  error={Boolean(errors.Skills?.message)}
                  helperText={capitalizer(errors?.Skills?.message)}
                  className={styles.input}
                />
              </form>
            </div>
            <div className={styles.buttons}>
              <Button
                onClick={logoutUser}
                size="medium"
                variant="contained"
                color="error"
              >
                Logout
              </Button>
              <Button
                form="update-form"
                type="submit"
                size="medium"
                variant="contained"
                color="success"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
};

export default UserModalContainer;
