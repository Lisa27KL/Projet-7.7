import React from "react";
import LeftNavbar from "../../Common/LeftNavbar";

const Profile = () => {
  const { pseudo } = JSON.parse(sessionStorage.getItem("user"));

  let newDate = new Date();
  //Date
  const date = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const dayMonthYear = `${date}${"/"}${
    month < 10 ? `0${month}` : `${month}`
  }${"/"}${year}`;

  //Time
  const hour = newDate.getHours();
  const minutes = newDate.getMinutes();
  const time = `${hour}${":"}${minutes < 10 ? `0${minutes}` : `${minutes}`}`;

  return (
    <>
      <div className="profile-backgroundImg ">
        <LeftNavbar />
        <div className="welcomeProfile">Hellos {pseudo}</div>
        <div className="postedDate">Nous sommes le : {dayMonthYear}</div>
        <div className="postedTime"> Il est : {time}</div>

        <div className="profile-container">
          <div className="updateProfile-container">
            <div className="left-side-avatar"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
