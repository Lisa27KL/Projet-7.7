import React, { useContext, useState } from "react";
import UserContext from "./UserContext";
import eraser from "../../Common/img/eraser1.png";
import stamp2 from "../../Common/img/stamp2.png";
import bin from "../../Common/img/delete.png";
import back from "../../Common/img/back.png";

function ProfileNew() {
  const { user, updateUser, deleteUser } = useContext(UserContext);
  const [update, setUpdate] = useState(false);

  const [newBio, setNewBio] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPseudo, setNewPseudo] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFile, setNewFile] = useState();
  const [file, setFile] = useState("");

  const handleNewBio = (e) => {
    setNewBio(e.target.value);
  };

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const handleNewPseudo = (e) => {
    setNewPseudo(e.target.value);
  };

  const handleNewImage = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
    setNewFile(e.target.files[0]);
  };

  const handleModify = (id) => {
    if (newBio || newFile || newEmail || newPseudo || newImage) {
      const formData = new FormData();

      if (newBio) formData.append("bio", newBio);
      if (newFile) formData.append("image", newFile);
      if (newImage) formData.append("image", file);
      if (newEmail) formData.append("email", newEmail);
      if (newPseudo) formData.append("pseudo", newPseudo);
      if (window.confirm("Etes-vous sûr de vouloir modifier?")) {
        updateUser(id, formData);
        setUpdate(!update);
        empty();
      }
    }
  };

  const empty = (e) => {
    setNewBio("");
    setNewEmail("");
    setNewPseudo("");
    setNewImage("");
    setNewFile("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir nous quitter ?")) {
      deleteUser(id);
      sessionStorage.removeItem("user");
    }
  };

  return (
    <>
      <div className="profileSet">
        <div >
          {update === false && (
            <img
              src={eraser}
              alt="eraserModify"
              className="eraserUser"
              onClick={() => setUpdate(!update)}
            />
          )}
          
          {update && (
            <>
                    <div className="modifyProfile">

              <textarea
                type="text"
                placeholder="Mon Email"
                defaultValue={user.email}
                onChange={(e) => handleNewEmail(e)}
                className="settingsModification"
              />
              <textarea
                type="text"
                placeholder="Mon Pseudo"
                defaultValue={user.pseudo}
                onChange={(e) => handleNewPseudo(e)}
                className="settingsModification"
              />
              <textarea
                type="text"
                placeholder="Ma Biographie"
                defaultValue={user.bio}
                onChange={(e) => handleNewBio(e)}
                className="settingsModification"
              />

              <input
                type="file"
                name="image"
                id="file"
                placeholder="image"
                onChange={(e) => handleNewImage(e)}
              />

              <div className="deleteProfile">
              <img
                src={stamp2}
                alt="stampValidate"
                onClick={() => handleModify(user.id)}
                className="stampProfile"
              />
              <img
                src={bin}
                alt="binDelete"
                className="binPost"
                onClick={() => handleDelete(user.id)}
              />
              </div>
              </div>
            </>
          )}
          {update === true && (
            <img
              src={back}
              alt="backModify"
              className="backModify"
              onClick={() => setUpdate(!update)}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProfileNew;
