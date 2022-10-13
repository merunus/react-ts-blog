import { Container } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import { Paths } from "../../../models/paths";
import styles from "./SidebarModal.module.scss";
import Modal from "react-modal";
import { TSidebarModalContProps } from "./types";

const SidebarContainer: React.FC<TSidebarModalContProps> = ({
  close,
  isModalOpen,
  customStyles,
}) => {
  return (
    <Container>
      <Modal
        closeTimeoutMS={200}
        isOpen={isModalOpen.sidebarModal}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Sidebar Modal"
      >
        <div className={styles.container}>
          <h1 className={styles.title}>Blogify</h1>
          <ul className={styles.links}>
            <NavLink
              end
              onClick={close}
              to={Paths.Home}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.link}` : styles.link
              }
            >
              My Posts
            </NavLink>
            <NavLink
              onClick={close}
              to={Paths.CreatePost}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.link}` : styles.link
              }
            >
              Create Post
            </NavLink>
            <NavLink
              onClick={close}
              to={Paths.AllPosts}
              className={({ isActive }) =>
                isActive ? `${styles.active} ${styles.link}` : styles.link
              }
            >
              Explore
            </NavLink>
          </ul>
        </div>
      </Modal>
    </Container>
  );
};

export default SidebarContainer;
