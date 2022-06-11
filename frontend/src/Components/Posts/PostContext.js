import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../../Services/authHeader";

const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [modifyPost, setModifyPost] = useState("");

  useEffect(() => {
    axiosPosts();
  }, [newPost, modifyPost]);

  const axiosPosts = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/posts`, authHeader())
      .then((res) => setPosts(res.data))
      .catch((error) => ({ message: error }));
  };

  const addPost = async (data) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}api/posts`, data, authHeader())
      .then((res) => setNewPost(res.data))
      .catch((error) => ({ message: error }));
  };

  const updatePost = async (id, data) => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/posts/${id}`,
        data,
        authHeader()
      )
      .then((res) => setModifyPost([res.data]))
      .catch((error) => ({ message: error }));
  };

  const deletePost = async (id) => {
    await axios.delete(
      `${process.env.REACT_APP_API_URL}api/posts/${id}`,
      authHeader()
    );
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export default PostContext;
