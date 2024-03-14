import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Redirecting from "../Redirecting";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../store/AuthSlice";
import { useAuth } from "../../Context/AuthContext";
export default function AdminPrivate() {
  const dis = useDispatch();
  const [auth, setAuth] = useAuth();
  const [ok, setOK] = useState(false);
  useEffect(() => {
    const Auth = async () => {
      console.log(auth.user.phone);
      const res = await axios.post("/signup/admin-dashboard", {
        phone: auth.user.phone,
      });
      if (res.data.success) {
        setOK(true);
        console.log("true");
      } else {
        setOK(false);
        console.log("false", auth.user);
      }
    };

    if (auth?.token) {
      console.log(" set ");
      Auth();
    } else {
      console.log("not set ");
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Redirecting />;
}
