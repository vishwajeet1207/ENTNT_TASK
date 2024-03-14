import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
const AuthContext = createContext();
const AuthProvieder = (props) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  axios.defaults.headers.common["Authorization"] = Cookies.get("token");
  useEffect(() => {
    // const data = Cookies.get("token");
    // const user = Cookies.get("user");
    const data = localStorage.getItem("auth");
    if (data) {
      const datanew = JSON.parse(data);
      setAuth({ ...auth, token: datanew.token, user: datanew.user });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvieder };
