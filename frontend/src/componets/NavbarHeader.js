import React, { startTransition, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavbarHeader.css";
import { AiOutlineShop } from "react-icons/ai";
import { HiOutlineUser } from "react-icons/hi";
import { PiShoppingCart } from "react-icons/pi";
import { BiLogOut } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ItemFromCard } from "../store/CardSlice";
import Cookies from "js-cookie";
import axios from "axios";
import { addUser } from "../store/UserSlice";
import { setToken } from "../store/AuthSlice";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/Cart";
import { useSearch } from "../Context/Search";
export default function NavbarHeader() {
  const { data } = useSelector((state) => state.cardSlice);
  const { userdata } = useSelector((state) => state.userSlice);
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [search, setSearch] = useSearch();
  const [keyword, setKeyword] = useState("");
  // const { token, user } = useSelector((state) => state.authSlice);
  const navigator = useNavigate();
  const getBySearch = async () => {
    if (search.keyword === "") {
      toast.error("Product Not found");
      navigator("/");
    }
    try {
      const res = await axios.post("/product/search/" + search.keyword);
      if (res.data.success) {
        setSearch({
          ...search,
          product: res.data.product,
          keyword: "",
        });
        if (res.data.product.length == 0) {
          toast.error("Not found");
          navigator("/");
        } else {
          navigator("/search");
        }
      }
    } catch {
      setSearch({
        ...search,
        product: [],
      });
      toast.error("Not found");
    }
  };
  const dis = useDispatch();
  const logOOUT = () => {
    toast.success("Successfully Logout");
    Cookies.remove("id");
    Cookies.remove("userName");
    Cookies.remove("token");
    Cookies.remove("phone");
    localStorage.removeItem("cart");

    localStorage.removeItem("auth");
    setAuth({ ...auth, token: "", user: null });

    axios.defaults.headers.common["Authorization"] = "";
    dis(addUser({ data: " " }));
    navigator("/");
  };
  useEffect(() => {
    dis(addUser({ data: Cookies.get("id") }));
    dis(ItemFromCard());
    dis(setToken({ user: Cookies.get("user"), token: Cookies.get("token") }));
    const data = localStorage.getItem("auth");
    if (data) {
      const datanew = JSON.parse(data);
      setAuth({ ...auth, token: datanew.token, user: datanew.user });
    }
  }, [userdata, auth.token]);
  return (
    <>
      <div
        id="contaier "
        className="sticky top-0 z-20 w-full bg-[#2874f0] shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]"
      >
        <div id="menucontaier">
          <div className="subcontainer ">
            <Link className="divofcont subfirst flex_4" to={"/"}>
              <div>
                <span>
                  <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/flipkart-095e08.svg"></img>
                </span>
              </div>
            </Link>
            <div className="divofcont subsecond searchbar flex_9">
              <button onClick={getBySearch}>
                <BsSearch id="searchicon" />
              </button>
              <input
                type="text"
                value={search.keyword}
                onChange={(e) => {
                  setSearch({ ...search, keyword: e.target.value });
                }}
                placeholder="Search for Product, Brands and More"
              />
            </div>
          </div>
          <div className="subcontainer2">
            <Link
              to={"/signup"}
              className={`${
                Cookies.get("id") ? "hidden" : ""
              } divofcont flex_2 `}
            >
              <span>
                <HiOutlineUser className="image_icon" />
              </span>
              <span>Sign In</span>
            </Link>
            <span
              onClick={logOOUT}
              className={`${
                Cookies.get("id") ? "" : "hidden"
              } divofcont flex_2 `}
            >
              <span>
                <BiLogOut />
              </span>
              <span>Logout</span>
            </span>
            <Link className="divofcont flex_2 " to="/card">
              <span>{cart.length}</span>

              <span>
                <PiShoppingCart className="image_icon" />
              </span>
              <span>Cart</span>
            </Link>
            <Link
              className="divofcont flex_1"
              // Cookies.get("id") == undefined ? "/signup" :
              to={
                auth.user
                  ? auth.user.role === "1"
                    ? "/admin-dashboard"
                    : "/user-dashboard"
                  : "/user-dashboard"
              }
            >
              <div>
                <span>
                  <p className="image_icon">
                    {auth.user
                      ? auth.user.role === "1"
                        ? "ADMIN"
                        : "USER"
                      : "USER"}
                  </p>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
