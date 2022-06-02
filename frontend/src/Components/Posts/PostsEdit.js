import React, { useState } from "react";
import axios from "axios";
// import { uploadFile } from "../../Services/uploadFile";
import chating from "../../Common/img/chating.png";

function PostsEdit() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [newImageFile, setNewImageFile] = useState("");

  //const inputFile = useRef(null);
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  function handleDeleteImage(e) {
    e.preventDefault();
    setNewImageFile(null);
    if (image) {
      if (window.confirm("Voulez-vous vraiment supprimer l'image du post ?")) {
        setImage("");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = user.token;
    const formData = new FormData();
    formData.append("message", message);
    formData.append("image", file);

    axios
      .post(`${process.env.REACT_APP_API_URL}api/posts/`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => console.log(data))
      .catch((error) => ({
        message: error,
      }));
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
            onChange={(e) => {
              handleMessageChange(e);
            }}
          />
          <br />

          <div className="bloc-Image">
            <label className="post-Image">Image :</label>
            <input
              id="file"
              className="imgBTN"
              type="file"
              name="image"
              size="lg"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />

            {image ? (
              <div>
                <img src={image} alt="" id="futurImg" />{" "}
              </div>
            ) : null}
          </div>
          <br />
          <div className="actions">
            <button
              onClick={handleDeleteImage}
              redirect="/posts"
              className="publish-btn"
            >
              Supprimer
            </button>
          </div>

          <input type="submit" value="Publier" className="publish-btn" />
        </form>
      </div>
    </div>
  );
}

export default PostsEdit;

// function PostsEdit(file, body) {
//   const [message, setMessage] = useState("");

//   // formData.append('data', JSON.stringify(body));

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   //   const handleImageChange = (e) =>{
//   //   setImage(e.target.files[0])
//   // };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     const token = user.token;
//     // const formData = new FormData();
//     // formData.append('image', file);

//     axios
//       .post(
//         `${process.env.REACT_APP_API_URL}api/posts/`,
//         {
//           message,
//         },
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       )
//       .then((data) =>
//         //filename: data.filename,
//         console.log("C'est posté !")
//       )
//       .catch((error) => ({
//         message: error,
//       }));
//   };

//   return (
//     <div className="page-posts">
//       <div>
//         <form
//           onSubmit={(e) => {
//             handleSubmit(e);
//           }}
//           className="postsCards"
//         >
//           <div className="Icon-Title">
//             <img src={chating} alt="ChatingImage" className="chatingImg" />
//             <label className="postTitle">What's Up Guys ?</label>
//           </div>
//           <br />
//           <input
//             className="cardMessage"
//             type="textarea"
//             value={message}
//             required
//             onChange={(e) => {
//               handleMessageChange(e);
//             }}
//           />
//           <br />

//           <div className="bloc-Image">
//             <label className="post-Image">Image :</label>
//             <input
//               id="file"
//               className="imgBTN"
//               type="file"
//               name="file"
//               size="lg"
//             />
//           </div>
//           <br />

//           <input type="submit" value="Publier" className="publish-btn" />
//         </form>
//       </div>
//     </div>
//   );
// }

// export default PostsEdit;
