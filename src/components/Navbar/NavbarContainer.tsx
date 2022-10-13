import React from "react";
import { TNavbarContProps } from "./types";
import { Link, NavLink } from "react-router-dom";
import { Paths } from "../../models/paths";
import styles from "./Navbar.module.scss";
import { FaBars } from "react-icons/fa";
import { Avatar, Button } from "@mui/material";
import { api, Endpoints } from "../../models/endpoints";

const NavbarContainer: React.FC<TNavbarContProps> = ({ openSidebar, user }) => {
  return (
    <nav className={styles.container}>
      <Link className={styles.logo} to={Paths.Home}>
        Blogify
      </Link>
      <div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <NavLink
              end
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to={Paths.Home}
            >
              My Posts
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to={Paths.CreatePost}
            >
              Create Post
            </NavLink>
          </li>
          <li className={styles.link}>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
              to={Paths.AllPosts}
            >
              Explore
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.icons}>
        <Button
          onClick={() => openSidebar("userModal")}
          variant="contained"
          size="small"
        >
          <Avatar
            classes={{ root: styles.avatar }}
            src={user?.avatar ? `${api.BaseURL}${user.avatar}` : ""}
          />
          {user && user.name.length > 10
            ? `${user.name.substring(0, 10)}...`
            : user?.name}
        </Button>
        <FaBars
          onClick={() => openSidebar("sidebarModal")}
          className={styles.bars}
        />
      </div>
    </nav>
  );
};

export default NavbarContainer;
