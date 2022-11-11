import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormData from "form-data";

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

axios.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");
  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();

      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const checkAuth = () => {
    const localAccessToken = localStorage.getItem("token"),
      localUsername = localStorage.getItem("username");

    if (localAccessToken && localUsername) {
      return true;
    }
    return false;
  };

  const [auth, setAuth] = useState(() => checkAuth());

  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const handleAuth = (accessToken, name) => {
    localStorage.clear();
    localStorage.setItem("token", accessToken);
    localStorage.setItem("username", name);
    setAuth(true);
    setUsername(name);
    navigate("/user/page");
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth(false);
    setUsername("");
    navigate("/");
  };

  const register = async ({ username, email, password, Avatar }) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", Avatar);

    await axios({
      method: "post",
      url: "http://localhost:4000/auth/register",
      data: formData,
      headers: { "Content-Type": "multipart/form-data " },
    })
      .then(function (response) {
        const { accessToken, name } = response.data;
        handleAuth(accessToken, name);
        navigate("/user/page");
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });

      const { accessToken, name } = response.data;

      handleAuth(accessToken, name);

      navigate("/user/page");
    } catch (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        register,
        login,
        handleLogout,
        username,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth };
