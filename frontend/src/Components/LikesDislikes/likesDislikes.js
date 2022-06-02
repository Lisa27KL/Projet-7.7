// import React, {useState} from 'react';


//  function likesDislikes() {
//      const [like, setlike] = useState[0]
//      const [dislike, setdislike] = useState[0]

//      const [likeActive, setlikeActive] = useState[false]
//      const [dislikeActive, setdislikeActive] = useState[false]

//      function likeF(){
//         if(likeActive){
//             setlikeActive(false)
//             setlike(like-1)
//         }else{
//             setlikeActive(true)
//             setlike(like+1)

//             if(dislikeActive){
//                 setdislikeActive(false)
//                 setlike(like+1)
//                 setdislike(dislike-1)
//             }
//         }
//      }

//      function dislikeF(){
//         if(dislikeActive){
//             setdislikeActive(false)
//             setdislike(like-1)
//         }else{
//             setdislikeActive(true)
//             setdislike(like+1)

//             if(likeActive){
//                 setlikeActive(false)
//                 setdislike(dislike+1)
//                 setlike(like-1)
//             }
//         }
//     }

//   return (
//     <div className='likesDislikes'>
//         <div></div>
//         <button onClick={likeF}>Like {like} </button>
//        <button onClick={dislikeF}>Dislike {dislike} </button> 
//     </div>
//   )
// }

// export default likesDislikes;