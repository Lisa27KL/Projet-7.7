// import React, {useState} from 'react'
// import axios from "axios";


// function CommentsEdit() {
//      const [message, setMessage] = useState("");

//      const handleMessageSubmit = (e) =>{
//          e.preventDefault();
//         const user = JSON.parse(sessionStorage.getItem("user"));
//         const token = user.token;

//         axios
//       .post(`${process.env.REACT_APP_API_URL}api/comments/`, {
//         headers: {
//         //   Authorization: "Bearer " + token,
//         },
//       })
//       .then((res) => console.log(res.data))
//       .catch((error) => ({
//         message: error,
//       }));
//      }

//   return (
//     <div className='page-Comments'>
//         <form onSubmit={(e) =>{handleMessageSubmit(e)}}>Commentez : {message} </form>
        
//     </div>
//   )
// }

// export default CommentsEdit;
