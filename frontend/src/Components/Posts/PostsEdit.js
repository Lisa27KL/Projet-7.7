import React, { useState, useContext } from "react";
import PostContext from "../../Components/Posts/PostContext";
import chating from "../../Common/img/chating.png";
import bin from "../../Common/img/delete.png";
import publish from "../../Common/img/publish.png";

const PostsEdit = () => {
  const { addPost } = useContext(PostContext);
  const { deletePost } = useContext(PostContext);

  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message || image) {
      const formData = new FormData();
      formData.append("message", message);
      if (file) formData.append("image", file);
      if (
        window.confirm(
          "Êtes-vous sûr de vouloir poster cette publication ? OK pour continuer, CANCEL pour annuler"
        )
      )
        addPost(formData);
      empty();
    }
  };

  const empty = (e) => {
    setMessage("");
    setImage("");
    setFile("");
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce post ?")) {
      deletePost(id);
    }
  };

  return (
    <div className="page-posts">
      <div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="postsCards"
        >
          <div className="Icon-Title">
            <img src={chating} alt="ChatingImage" className="chatingImg" />
            <label className="postTitle">What's Up Guys ?</label>
          </div>
          <br />
          <textarea
            className="cardMessage"
            type="textarea"
            value={message}
            required
            onChange={(e) => handleMessageChange(e)}
          />
          <br />
          <div className="blocImgActions">
            <div className="bloc-Image">
              <label className="post-Image">Image :</label>
              <input
                id="file"
                className="imgBTN"
                type="file"
                name="image"
                size="lg"
                onChange={(e) => handleImageChange(e)}
              />

              {image ? (
                <div>
                  <img src={image} alt="" id="futurImg" />{" "}
                </div>
              ) : null}
            </div>
            <br />
            <div className="actionsPostsEdit">
              <img
                src={bin}
                alt="binDelete"
                id="binBtn"
                onClick={(e) => handleDelete(e)}
              />
              <img
                src={publish}
                alt="binDelete"
                id="editBtn"
                onClick={(e) => handleSubmit(e)}
              />

              <div></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostsEdit;
