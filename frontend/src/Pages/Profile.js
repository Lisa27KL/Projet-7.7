import React, { useContext, useState } from "react";
import Navbar from "../Common/Navbar";
import ProfileEdit from "../Components/Profile/ProfileEdit";
import group from "../Common/img/group.png";
import back from "../Common/img/back.png";
import UserContext from "../Components/Profile/UserContext";
import Admin from "../Components/Profile/Admin";

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const { user, users } = useContext(UserContext);

  return (
    <div className="profile-backgroundImg">
      <div className="navbar-Profile">
        <Navbar className="navBarProfileOnly" />
      </div>
      <div className="profileView">
        {user.role === 1 && (
          <div className="settingsProfileBtn">
            {toggle === false && (
              <img
                src={group}
                alt="profileSettings"
                className="nav-button"
                onClick={() => setToggle(!toggle)}
              />
            )}
          </div>
        )}
        {toggle && (
          <div className="blocActions">
            <div className="backBlocActions">
              <img
                src={back}
                alt="profileSettings"
                className="nav-button"
                onClick={() => setToggle(!toggle)}
              />
            </div>
            <div className="users">
              {users.map((profileUser, id) => (
                <Admin key={id} profileUser={profileUser} />
              ))}
            </div>
          </div>
        )}
        <div className="profileEdit-Profile">
          <ProfileEdit />
        </div>
      </div>
    </div>
  );
};

export default Profile;
