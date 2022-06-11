//import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../../Services/authHeader";

import PostContext from "./PostContext";
import { DateToString, TimeToString } from "../../Services/DateContext";
import bin2 from "../../Common/img/bin2.png";
import eraser from "../../Common/img/eraser1.png";
import UserContext from "../Profile/UserContext";

const Posted = ({ post }) => {
  const {updatePost, deletePost } = useContext(PostContext);
  const {user} = useContext(UserContext);
  const [update, setUpdate] = useState(false);
  const [pseudo, setPseudo] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFile, setNewFile] = useState();
  
  const handleNewMessage = (e) => {
    setNewMessage(e.target.value);
  };
  
  const handleNewImage = (e) => {
    setNewImage(URL.createObjectURL(e.target.files[0]));
    setNewFile(e.target.files[0]);
  };

  const handleModify = (id) => {
    if (newMessage || newImage) {
      const formData = new FormData();

      if (newMessage) formData.append("message", newMessage);
      if (newFile) formData.append("image", newFile);

      if (window.confirm("Etes-vous sûr de vouloir modifier?")) {
        updatePost(id, formData);
      }
    }
  };


  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deletePost(id);
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}api/users/${post.userId}/`,
        authHeader()
      )
      .then((res) => setPseudo(res.data.user.pseudo))
      .catch((error) => ({ message: error }));
  },[post]);

  return (
    <>
      {/* Message ---------------------------- */}
      <div className="bigCard">
        <div className="cardPosted">
          <div className="talks">

            <div className="postedPseudo">Posté par : {pseudo}</div>

            <p className="postedMessage">{post.message}</p>
          </div>

          {/* Date and Time -------------------- */}
          <div className="dateTime">
            <time className="date">Le {DateToString(post.createdAt)}</time>
            <br />
            <time className="time">{TimeToString(post.createdAt)}</time>
          </div>
        </div>
        {post.image && (
          <div className="postedImage">
            <img src={post.image} alt="Aucun fichier" className="imgPosted" />
          </div>
        )}
      </div>

      {/* Actions Delete and Modify --------------------  */}

      <div id="actions">
      {user.id === post.userId &&(<div id="modifyDeleteBtn">
          {update === false && (
            <img
              src={eraser}
              alt="eraserModify"
              id="eraserPost"
              onClick={() => setUpdate(!update)}
            />
          )}

          {update && (
            <>
              <textarea
                type="text"
                defaultValue={post.message}
                onChange={(e) => handleNewMessage(e)}
                className="writeModification"
              />
              <input
                type="file"
                name="image"
                id="file"
                placeholder="image"
                onChange={(e) =>handleNewImage(e)}
                
              />

              <button
                type="button"
                onClick={() => handleModify(post.id)}
                className="actionModifyPosted"
              ></button>
            </>
          )}

          <button
            type="button"
            onClick={() => {
              handleDelete(post.id);
            }}
            className="actionDeletePosted"
          >
           <img src={bin2} alt="binDelete" id="binPost" />
          </button>
        </div>)}
      </div>
    </>
  );
};

export default Posted;
