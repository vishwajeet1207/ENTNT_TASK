import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { addUser } from "../store/UserSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../store/AuthSlice";
import Layout from "../componets/Layout";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
export default function SignUp() {
  const [auth, setAuth] = useAuth();
  const dis = useDispatch();
  const [logsig, setLogSig] = useState("signup");
  const navigate = useNavigate();
  const location = useLocation();
  const [allInFo, setALLInfo] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    password: "",
    role: "0",
  });
  useEffect(() => {}, [allInFo]);
  async function regiseterUser() {
    try {
      const res = await axios.post(
        "/signup",
        {
          firstname: allInFo.firstname,
          lastname: allInFo.lastname,
          phone: allInFo.phone,
          password: allInFo.password,
          role: allInFo.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        setLogSig("login");
      }
      toast.success("Successfully Registerd");
    } catch {
      toast.error("Not Registed, Try Again");
    }
  }
  async function loginUser() {
    try {
      if (!allInFo.phone) {
        return "Enter phone number";
      }
      if (!allInFo.password) {
        return "Enter the Password";
      }
      const res = await axios.post(
        "/signup/signin",
        {
          phones: allInFo.phone,
          passwords: allInFo.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success == true) {
        toast.success(res.data.message);
        setAuth({ ...auth, token: res.data.token, user: res.data.user });
        //set default to all request through axios
        // axios.defaults.headers.common["Authorization"] = res.data?.token;
        localStorage.setItem(
          "auth",
          JSON.stringify({ user: res.data.user, token: res.data.token })
        );
        Cookies.set("phone", res.data.user.phone, { expires: 7 });
        Cookies.set("userName", res.data.user.firstname, { expires: 7 });
        Cookies.set("id", res.data.user._id, { expires: 7 });
        Cookies.set("token", res.data.token);
        dis(addUser({ data: res.data.user._id }));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Something is Wrong");
    }
  }
  const HandleChange = function (e) {
    var names = e.target.name;
    var values = e.target.value;
    setALLInfo({ ...allInFo, [names]: values });
  };
  // function heandleSubmit(event) {
  //   console.log(this.state.name);
  //   event.preventDefault();
  // }
  if (logsig === "login") {
    return (
      <>
        <Layout>
          <div className=" flex items-center justify-center h-full ">
            <div className="w-4/6 pt-16">
              <div className=" flex w-full max-[780px]:flex-col min-[780px]:flex-row   shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] ">
                <div className="min-[780px]:w-2/5 max-[780px]:w-full bg-signupbg p-10">
                  <div className="text-2xl text-white font-medium tracking-normal">
                    Login
                  </div>
                  <div className="text-[#dbdbdb] text-lg mt-6">
                    Get access to your Orders, Wishlist and Recommendations
                  </div>
                </div>
                <form className="min-[780px]:w-3/5 max-[780px]:w-full bg-white">
                  <div className="p-10">
                    <input
                      type="text"
                      className="p-5 mt-4"
                      name="phone"
                      value={allInFo.phone}
                      onChange={HandleChange}
                      placeholder="Enter your mobile number"
                    />
                    <input
                      type="password"
                      className="p-5 mt-4"
                      name="password"
                      value={allInFo.password}
                      onChange={HandleChange}
                      placeholder="Enter password"
                    />
                    <div
                      onClick={loginUser}
                      className="w-full mt-4 py-3 rounded-sm text-center font-medium text-ml text-white"
                      style={{ backgroundColor: "#fb641b" }}
                    >
                      Log In
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <div className=" flex items-center justify-center h-full ">
          <div className="w-4/6 pt-16">
            <div className=" flex w-full max-[780px]:flex-col min-[780px]:flex-row shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] ">
              <div className="min-[780px]:w-2/5 max-[780px]:w-full  bg-signupbg p-10">
                <div className="text-2xl text-white font-medium tracking-normal">
                  Looks like you're new here!
                </div>
                <div className="text-[#dbdbdb] text-lg mt-6">
                  Sign up with your mobile number to get started
                </div>
              </div>
              <form
                // onSubmit={heandleSubmit()}
                className="min-[780px]:w-3/5 max-[780px]:w-full bg-white"
              >
                <div className="p-10">
                  <div className="mt-4 flex">
                    <input
                      type="text"
                      className="p-5 mr-2 "
                      name="firstname"
                      value={allInFo.name}
                      onChange={HandleChange}
                      placeholder="FirstName"
                    />
                    <input
                      type="text"
                      className="p-5 ml-2 "
                      name="lastname"
                      value={allInFo.name}
                      onChange={HandleChange}
                      placeholder="LastName"
                    />
                  </div>

                  <input
                    type="text"
                    className="p-5 mt-4"
                    name="phone"
                    value={allInFo.phone}
                    onChange={HandleChange}
                    placeholder="Enter your mobile number"
                  />
                  <input
                    type="password"
                    className="p-5 mt-4"
                    name="password"
                    value={allInFo.password}
                    onChange={HandleChange}
                    placeholder="Enter password"
                  />
                  <div className="mt-4">
                    {/* <label className="font-bold"> genYourder</label> */}
                    <div className="">
                      <input
                        type="radio"
                        name="role"
                        className="w-[20px] h-[20px] border-slate-300"
                        value={0}
                        checked={allInFo.role === "0" ? true : false}
                        onChange={HandleChange}
                      />
                      <p className=" inline ml-3"> User</p>

                      <input
                        className="ml-5 w-[20px] border-slate-300 h-[20px]"
                        type="radio"
                        onChange={HandleChange}
                        name="role"
                        checked={allInFo.role === "1" ? true : false}
                        value={1}
                      />
                      <p className="ml-3 inline"> Admin</p>
                    </div>
                  </div>
                  <div
                    onClick={regiseterUser}
                    className="w-full mt-4 py-3 rounded-sm text-center font-medium text-ml text-white"
                    style={{ backgroundColor: "#fb641b" }}
                  >
                    Sign up
                  </div>
                  <div
                    onClick={() => {
                      setLogSig("login");
                    }}
                    className="w-full mt-4 py-3 rounded-sm text-center shadow-[2px_2px_2px_2px_rgba(0,0,0,0.08)] font-medium text-ml text-signupbg"
                    // style={{ backgroundColor: "#fb641b" }}
                  >
                    Existing User? Log in
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
