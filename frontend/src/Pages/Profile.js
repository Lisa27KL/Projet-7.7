import React, { useContext, useState } from "react";
import Navbar from "../Common/Navbar";
import ProfileEdit from "../Components/Profile/ProfileEdit";
import group from "../Common/img/group.png";
import settings from "../Common/img/settings.png";
import UserContext from "../Components/Profile/UserContext";
import Admin from "../Components/Admin/Admin";

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const { user, users } = useContext(UserContext);

  console.log(users);
  return (
    <div className="profile-backgroundImg">
      <div></div>
      <div className="navbar-Profile">
        <Navbar />
        {user.role !==1 && (
          <div className="nav-button">
        {toggle === false && (<img
          src={settings}
          alt="profileSettings"
          className="nav-button"
          onClick={()=> setToggle(!toggle)}
        /> )}</div>)}

        {user.role === 1 && (
          <div className="nav-button">
            {toggle === false && (
              <img
                src={group}
                alt="groupUsers"
                className="groupIcon"
                onClick={() => setToggle(!toggle)}
              />
            )}
            {toggle && (
              <div>
                <div >
                  <button onClick={() => setToggle(!toggle)} className="closeModal">&times;</button>

                <div className="allUsers">
                  {users.map((profileUser, id) => (
                    <Admin key={id} profileUser={profileUser} />
                  ))}
                </div>


                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="cardsProfile">
        <div className="profileEdit-Profile">
          <ProfileEdit />
        </div>
      </div>
    </div>
  );
};

export default Profile;
