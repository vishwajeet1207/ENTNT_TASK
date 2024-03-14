import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { addUser } from "../store/UserSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import toast from "react-hot-toast";
import Layout from "../componets/Layout";
import { useAuth } from "../Context/AuthContext";
import moment from "moment";
export default function UserProfle() {
  var dis = useDispatch();
  const navigator = useNavigate();
  const [auth, setAuth] = useAuth();
  const [profileDetail, setProfileDetail] = useState(null);
  const [option, setOption] = useState("profileinfo");
  const [allOrders, setAllOrders] = useState([]);
  const borderforTable = useRef(
    "border-2  border-white border-solid  border-card-border"
  );
  const [address, setAddress] = useState({
    addressName: "",
    addressPhone: "",
    addressPincode: "",
    addressLine: "",
  });
  const updateProfile = function (e) {
    var name = e.target.name;
    var value = e.target.value;
    setProfileDetail({ ...profileDetail, [name]: value });
  };
  async function getAllOrdersFromDB() {
    const res = await axios.get("/order/" + Cookies.get("id"));
    if (res.data.success) {
      setAllOrders(res.data.order);
      toast.success("order received");
    }
  }

  const addAddress = function (e) {
    var name = e.target.name;
    var value = e.target.value;

    setAddress({ ...address, [name]: value });
  };
  async function addAddressToDB() {
    try {
      var res = await axios.post(
        "/userProfile/addAddress",
        {
          ADDRE: address,
          id: Cookies.get("id"),
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      toast.success(res.data.message);
      setAuth({
        ...auth,
        user: { ...auth.user, ["address"]: [...auth.user.address, address] },
      });
      localStorage.setItem("auth", JSON.stringify(auth));
      setProfileDetail({
        ...profileDetail,
        ["address"]: [...profileDetail.address, address],
      });
      setAddress({
        addressName: "",
        addressPhone: "",
        addressPincode: "",
        addressLine: "",
      });
    } catch (error) {
      toast.error("Something is Wrong");
    }
  }

  async function updateNewProfile() {
    try {
      var res = await axios.post(
        "/userProfile/updateProfile",
        {
          profile: profileDetail,
          id: Cookies.get("id"),
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Something is Wrong");
    }
  }
  async function getProfileDetail() {
    var res = await axios.post(
      "/userProfile",
      {
        userID: Cookies.get("id"),
      }
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // }
    );
    setProfileDetail(res.data);
  }
  useEffect(() => {
    getProfileDetail();
    getAllOrdersFromDB();
  }, []);
  if (profileDetail === null) {
    return (
      <>
        <div className=" flex justify-center  loading-container m-4">
          <div className="flex justify-center items-center h-full  loading"></div>
        </div>
      </>
    );
  }
  return (
    <>
      <Layout>
        <div className="flex   mt-6 justify-center">
          <div className=" w-full mx-4">
            <div className=" flex max-[915px]:flex-col ">
              <div className="w-2/6 max-[915px]:w-full mr-4">
                <div className="flex bg-white p-3   items-center flex-row">
                  <img
                    src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                    className="w-[40px] h-[40px]"
                  />
                  <span className="ml-5">{profileDetail.firstname}</span>
                </div>
                <div className="bg-white my-4">
                  <div className="text-lg pl-8 py-2 ">Account Setting</div>
                  <div
                    onClick={() => {
                      setOption("profileinfo");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "profileinfo"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    UserProfle
                  </div>
                  <div
                    onClick={() => {
                      setOption("addAddress");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "addAddress"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    Address
                  </div>
                  <div
                    onClick={() => {
                      setOption("signout");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "signout"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    All Orders
                  </div>
                </div>
              </div>
              <div className="w-4/6 max-[915px]:w-full">
                {option === "addAddress" ? (
                  <>
                    <form className="bg-white p-6">
                      <span>ADD A NEW ADDRESS</span>

                      <div>
                        <div>
                          <div className="my-2">
                            <label className="font-bold">Name</label>
                            <div className=" my-2  ">
                              <input
                                type="text"
                                className="mr-5 border-slate-300"
                                name="addressName"
                                onChange={addAddress}
                                required=""
                                placeholder="First Name"
                                autoComplete="name"
                                tabIndex={1}
                                value={address.addressName}
                              />
                            </div>
                          </div>
                          <div className="my-2">
                            <label className="font-bold">
                              10-digit mobile number
                            </label>
                            <div className="my-2">
                              <input
                                type="text"
                                name="addressPhone"
                                onChange={addAddress}
                                className="border-slate-300"
                                required=""
                                placeholder="Mobile Number"
                                maxLength={10}
                                autoComplete="tel"
                                tabIndex={2}
                                value={address.addressPhone}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="my-2">
                            <label className="font-bold">Pincode</label>

                            <input
                              className="my-2 border-slate-300"
                              type="text"
                              name="addressPincode"
                              required=""
                              onChange={addAddress}
                              placeholder="Pincode"
                              maxLength={6}
                              autoComplete="postal-code"
                              tabIndex={3}
                              value={address.addressPincode}
                            />
                          </div>
                          <div className="my-2">
                            <label className="font-bold">
                              Address (Area and Street)
                            </label>

                            <input
                              className="my-2 border-slate-300"
                              type="text"
                              required=""
                              placeholder="Full Address"
                              name="addressLine"
                              onChange={addAddress}
                              tabIndex={4}
                              value={address.addressLine}
                            />
                          </div>
                        </div>

                        <div className="my-2">
                          <button
                            className="bg-blue-600 px-10 rounded-lg py-2 text-white"
                            type="button"
                            onClick={() => {
                              addAddressToDB();
                            }}
                            tabIndex={10}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                    <div className="p-6 bg-white">
                      {profileDetail.address.length === 0 ? (
                        <div>No Address Found</div>
                      ) : (
                        profileDetail.address.map((addres, key) => {
                          return (
                            <div
                              key={key}
                              className={`${
                                profileDetail.address.length === key + 1
                                  ? "border-b"
                                  : ""
                              } w-full border-slate-400	border-t border-l border-r rounded-10 p-6`}
                            >
                              <div>
                                <span className="font-semibold">
                                  {addres.addressName}
                                </span>
                                <span className="font-bold ml-5">
                                  {addres.addressPhone}
                                </span>
                              </div>
                              <div className="">
                                <span>{addres.addressLine}</span>-
                                <span className="font-bold">
                                  {addres.addressPincode}
                                </span>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </>
                ) : option === "signout" ? (
                  <div className="">
                    {allOrders.length === 0 ? (
                      <p>No Order Available</p>
                    ) : (
                      allOrders.map((item, key) => {
                        return (
                          <div
                            className={` ${
                              key == 0 ? "mb-3" : "my-3"
                            }  bg-white`}
                          >
                            <table
                              key={key}
                              className=" border-2  border-white border-solid  border-card-border w-full table-fixed"
                            >
                              <thead>
                                <tr>
                                  <th className={`${borderforTable.current}`}>
                                    Status
                                  </th>
                                  <th className={`${borderforTable.current}`}>
                                    Buyer
                                  </th>
                                  <th className={`${borderforTable.current}`}>
                                    Date
                                  </th>
                                  <th className={`${borderforTable.current}`}>
                                    Payment
                                  </th>
                                  <th className={`${borderforTable.current}`}>
                                    Quantity
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="text-center">
                                  <td className={`${borderforTable.current}`}>
                                    {item.status}
                                  </td>
                                  <td className={`${borderforTable.current}`}>
                                    {item.buyer.firstname}
                                  </td>
                                  <td className={`${borderforTable.current}`}>
                                    {moment(item.createAt).fromNow()}
                                  </td>
                                  <td className={`${borderforTable.current}`}>
                                    {item.payment}
                                  </td>
                                  <td className={`${borderforTable.current}`}>
                                    {item.product.length}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            {item.product.map((pro, key) => {
                              return (
                                <div className="flex flex-row border-2 mx-5 py-3 border-white ">
                                  <div className="w-1/3 h-[192px] rounded bg-red  ">
                                    <img
                                      src={`http://localhost:5000/product/${pro._id}`}
                                      className="w-[192px] h-full"
                                    />
                                  </div>
                                  <div className="flex ml-5 w-2/3 flex-col ">
                                    <div className="flex   justify-between">
                                      <a className="font-bold"> {pro.name} </a>
                                      <a className="font-bold"> {pro.price} </a>
                                    </div>

                                    <div className="flex">
                                      <a className="font-normal">
                                        {" "}
                                        {pro.description.substring(0, 200)}
                                        {"..."}
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })
                    )}
                  </div>
                ) : (
                  <form className="bg-white p-6">
                    <div>
                      <div>
                        <div className="my-2">
                          <label className="font-bold">Personal Info</label>
                          <div className=" my-2 flex ">
                            <input
                              type="text"
                              onChange={updateProfile}
                              className="mr-5 border-slate-300"
                              name="firstname"
                              required=""
                              placeholder="First Name"
                              autoComplete="name"
                              tabIndex={1}
                              defaultValue={profileDetail.firstname}
                            />

                            <input
                              type="text"
                              className="mx-5 border-slate-300"
                              name="lastname"
                              required=""
                              onChange={updateProfile}
                              placeholder="Last Name"
                              autoComplete="name"
                              tabIndex={1}
                              defaultValue={profileDetail.lastname}
                            />
                          </div>
                        </div>
                        <div className="my-2">
                          <label className="font-bold">Your gender</label>
                          <div className="my-2">
                            <input
                              type="radio"
                              name="gender"
                              className="w-[20px] h-[20px] border-slate-300"
                              value="male"
                              checked={
                                profileDetail.gender === "male" ? true : false
                              }
                              onChange={updateProfile}
                            />
                            <p className=" inline ml-3"> Male</p>

                            <input
                              className="ml-5 w-[20px] border-slate-300 h-[20px]"
                              type="radio"
                              onChange={updateProfile}
                              name="gender"
                              checked={
                                profileDetail.gender === "female" ? true : false
                              }
                              value="female"
                            />
                            <p className="ml-3 inline"> Female</p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="my-2">
                          <label className="font-bold">Email</label>

                          <input
                            className="my-2 border-slate-300"
                            type="email"
                            name="email"
                            required=""
                            onChange={updateProfile}
                            placeholder="Enter Your Email"
                            autoComplete="postal-code"
                            defaultValue={profileDetail.email}
                          />
                        </div>
                        <div className="my-2">
                          <label className="font-bold">Mobile Number</label>

                          <input
                            className="my-2 border-slate-300"
                            type="text"
                            required=""
                            placeholder="Enter Mobile Number"
                            name="phone"
                            onChange={updateProfile}
                            tabIndex={4}
                            defaultValue={profileDetail.phone}
                          />
                        </div>
                      </div>

                      <div className="my-2">
                        <button
                          onClick={() => {
                            updateNewProfile();
                          }}
                          className="bg-blue-600 px-10 rounded-lg py-2 text-white"
                          type="button"
                          tabIndex={10}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
