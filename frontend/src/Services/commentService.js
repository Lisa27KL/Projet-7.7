// import axios from "../utils/api/axiosConfig";
// import setHeader from "../utils/api/headerConfig";

// const POST_URL = "/posts";

// class CommentService {
//   getAllComments(postId) {
//     return axios.get(`${POST_URL}/${postId}/comments`, 
//     setHeader());
//   }

//   addComment(postId, data) {
//     return axios.post(
//       `${POST_URL}/${postId}/comments`,
//       data,
//       setHeader()
//     );
//   }

//   deleteComment(postId, commentId) {
//     return axios.delete(
//       `${POST_URL}/${postId}/comments/${commentId}`,
//       setHeader()
//     );
//   }
// }

// export default new CommentService();