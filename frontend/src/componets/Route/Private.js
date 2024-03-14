import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Redirecting from "../Redirecting";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/AuthSlice";
import { useAuth } from "../../Context/AuthContext";
export default function Private() {
  const dis = useDispatch();
  const [auth, setAuth] = useAuth();
  const [ok, setOK] = useState(false);
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const datanew = JSON.parse(data);
      setAuth({ ...auth, token: datanew.token, user: datanew.user });
    }
    const Auth = async () => {
      const res = await axios.get("/signup/user-auth");
      if (res.data.success) {
        setOK(true);
      } else {
        setOK(false);
      }
    };

    if (auth?.token) {
      Auth();
    } else {
      console.log(auth.token);
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Redirecting />;
}
