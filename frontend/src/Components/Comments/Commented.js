// import axios from "axios";
// import React, { useState, redirect } from "react";
// import { dateToString, timeToString } from "../../Services/date";


// function Commented({ comment }) {
//   const [pseudo, setPseudo] = useState("");

//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const token = user.token;

//   axios
//     .post(`${process.env.REACT_APP_API_URL}api/users/comments/${commentId}/`, {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     })
//     .then((res) => setPseudo(res.data.user.pseudo))
//     .catch((error) => ({
//       message: error,
//     }));

//   //------------ to DELETE a Post -----------------------------------------

// //   const deletePost = () => {
// //     axios
// //       .delete(`${process.env.REACT_APP_API_URL}api/posts/${post.id}`, {
// //         headers: {
// //           Authorization: "Bearer " + token,
// //         },
// //       })
// //       .then((res) => (alert(res.data.message).redirect = "/posts"))
// //       .catch((error) => ({ message: error }));
// //   };

//   return (
//     // Message ----------------------------
//     <div className="bigCard">
//       <div className="cardPosted">
//         <div className="talks">
//           <div className="postedPseudo">Posté par : {pseudo}</div>
//           <p className="postedMessage">{post.message}</p>
//         </div>

//         {/* Date and Time -------------------- */}
//         <div className="dateTime">
//           <time className="date">
//             Le {dateToString(post.createdAt, "D/M/YY")}
//           </time>
//           <br />
//           <time className="time">{timeToString(post.createdAt, "H : M")}</time>
//         </div>
//         {/* <div className="likes"><LikesDislikes/> </div> */}
//       </div>
//       <div className="postedImage">
//         <img src={post.image} alt="Aucune fichier" className="imgPosted" />
//       </div>

//       {/* Actions Delete and Modify -------------------- */}
//       <div id="actions">
//         {/* <div className="actionModifyPosted"
//                 onClick={() => {ModifyPost()}}
//                 redirect="/posts"
//               >
//                 <img src={eraser} alt="eraserModify" id="eraserPost" />
//               </div> */}

//         <div className="actionDeletePosted">
//           <img
//             src={folder}
//             alt="binDelete"
//             id="binPost"
//             onClick={() => {
//               deletePost();
//             }}
//             redirect="/posts"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Commented;
