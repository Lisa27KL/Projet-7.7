import React from "react";
import LeftNavbar from "../Common/LeftNavbar";
import ProfileEdit from "../Components/Profile/ProfileEdit";


const Profile = () => {

  return (
    <div className="profile-backgroundImg">
      <div className="cardsProfile">
        <div className="leftNavbar-Profile">
          <LeftNavbar />
        </div>
        <div className="profileEdit-Profile">
          <ProfileEdit/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
