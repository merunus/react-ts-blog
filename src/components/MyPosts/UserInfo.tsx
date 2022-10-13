import { Avatar } from "@mui/material";
import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GiSkills } from "react-icons/gi";
import { BsCalendarDate } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { api, Endpoints } from "../../models/endpoints";
import { IUserInfoProps } from "./types";
import styles from "./UserInfo.module.scss";
import moment from "moment";
import { BarChart } from "../Charts";
import { FaClipboardList } from "react-icons/fa";

const UserInfo: React.FC<IUserInfoProps> = ({ user, chartData }) => {
  return (
    <section className={styles.container}>
      <div className={styles.userDetails}>
        <Avatar
          variant="square"
          className={styles.userAvatar}
          src={
            user?.avatar
              ? `${user?.avatar ? `${api.BaseURL}${user.avatar}` : ""}`
              : undefined
          }
        />
        <div className={styles.details}>
          <h4>
            <FiUser />
            {user && user?.name}
          </h4>
          <h4>
            <AiOutlineMail />
            {user && user?.email}
          </h4>
          <h4>
            <BsCalendarDate />
            {user && moment(user.dateCreated).format("MMMM d, YYYY HH:mm")}
          </h4>
          {user?.profession && (
            <h4>
              <FaClipboardList />
              {user && user.profession}
            </h4>
          )}
          {user?.skills && (
            <h4>
              <GiSkills />
              {user && user.skills}
            </h4>
          )}
        </div>
      </div>
      <div className={styles.chart}>
        <BarChart chartData={chartData} />
      </div>
    </section>
  );
};

export default UserInfo;
