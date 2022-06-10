import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../../Services/authHeader";

const PostContext = createContext();

export const PostProvider = ({children}) =>{
    const [posts, setPosts] = useState([]);

    const [pseudo, setPseudo] = useState([]);
    //const { pseudo } = JSON.parse(sessionStorage.getItem("user"));

    useEffect (()=> {
        axiosPosts();
    }, []);

    const axiosPosts = async() =>{
        await axios.get(`${process.env.REACT_APP_API_URL}api/posts`, authHeader())
        .then((res) => setPosts(res.data))
        .catch((error) => ({ message: error }));
    };

    const addPost = async(newPost)=>{
        await axios.post(`${process.env.REACT_APP_API_URL}api/posts`, newPost, authHeader())
        .then((res) => setPosts([res.data,...posts]))
        .catch((error) => ({ message: error }));
    };

    const getPseudo = async(post) =>{
        await axios.get(`${process.env.REACT_APP_API_URL}api/users/${post.userId}/`,authHeader())
        .then((res) => setPseudo(res.data.user.pseudo))
        .catch((error) => ({ message: error }));
    };
    console.log(getPseudo);


    const updatePost = async(id, post)=>{
        await axios.put(`${process.env.REACT_APP_API_URL}api/posts/${post.id}`, authHeader())
        .then((res) => alert(setPosts(res.data,...post)))
        .catch((error) => ({ message: error }));
    };

    const deletePost = async(id, post)=>{
        await axios.delete(`${process.env.REACT_APP_API_URL}api/posts/${id}`, authHeader());
        setPosts(posts.filter((post) => post.id !== id));
    };

    return (
        <PostContext.Provider
        value = {{
            posts,
            pseudo,
            addPost,
            getPseudo,
            updatePost,
            deletePost,
        }}>
        {children}
    </PostContext.Provider>
    );
};
export default PostContext;