import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../../Services/authHeader";

const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const  userId  = JSON.parse(sessionStorage.getItem("user")).id;
    const [user, setUser] = useState([]);
    const [newUser, setNewUser] = useState("");

    useEffect (()=>{
        getUser();
    }, [newUser]);

    const getUser = async() =>{
        await axios
        .get(`${process.env.REACT_APP_API_URL}api/users/${userId}`, authHeader())
        .then((res) => setUser(res.data.user))
        .catch((error) => ({ message: error }));
    };

    const updateUser = async(data) => {
        await axios
        .put(`${process.env.REACT_APP_API_URL}api/users/${userId}`, authHeader())      
        .then((res) => setNewUser(res.data)
        .catch((error)=> ({message : error})))
    };

    const deleteUser = async() =>{
        await axios
        .delete(`${process.env.REACT_APP_API_URL}api/users/${userId}`, authHeader())
        .then(sessionStorage.removeItem("user")
        .catch((error)=> ({message : error})))
    
    }

    return (
        <UserContext.Provider
        value = {{
            user,
            updateUser,
            deleteUser,
        }}>
            {children}
        </UserContext.Provider>
    );

};

export default UserContext;