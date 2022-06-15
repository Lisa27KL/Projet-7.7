import React, { useContext } from "react";
import UserContext from "./UserContext";
import bin from "../../Common/img/delete.png";

const Admin = ({ profileUser }) => {
  const { deleteUser } = useContext(UserContext);

  const handleDelete = (id) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      deleteUser(id);
    }
  };
  return (
    <>
      <div>
        <div className="usersProfiles">
          <div className="settingsUsers">
            <h2>
              <p>{profileUser.pseudo}</p>
            </h2>
            <h3>
              <p>{profileUser.email}</p>
            </h3>
            <h4>
              <p>{profileUser.bio}</p>
            </h4>
          </div>
          <div className="deleteUserByAdmin">
            <img
              src={bin}
              alt="deleteUser"
              className="binBtn"
              onClick={() => handleDelete(profileUser.id)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
