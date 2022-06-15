import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../../Services/authHeader";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userId = JSON.parse(sessionStorage.getItem("user")).id;
  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser();
    getAllUsers();
  }, [newUser]);

  const getUser = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/users/${userId}`, authHeader())
      .then((res) => setUser(res.data.user))
      .catch((error) => ({ message: error }));
  };

  const getAllUsers = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}api/users/`, authHeader())
      .then((res) => setUsers(res.data.users))
      .catch((error) => ({ message: error }));
  };

  const updateUser = async (id,data) => {
    await axios
      .put(
        `${process.env.REACT_APP_API_URL}api/users/${id}`,
        data,
        authHeader()
      )
      .then((res) => setNewUser([res.data]))
      .catch((error) => ({ message: error }));
  };

  const deleteUser = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/users/${id}`, authHeader())
      .then((res)=> setNewUser(res.data))
      .catch((error) => ({ message: error }));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        getAllUsers,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
