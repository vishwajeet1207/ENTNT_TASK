import React, { useEffect, useState } from "react";
import CategoryItem from "../files/category.json";
import "./Homapage.css";
import CatItemContainer from "../componets/CatItemContainer";

import { Link, useLocation } from "react-router-dom";
import Layout from "../componets/Layout";
import { useDispatch } from "react-redux";
import { addCat } from "../store/CatSlice.js";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function HomePage() {
  const disp = useDispatch();
  const loc = useLocation();
  const [allCategory, setAllCategory] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [useCartCheckOut, setCartCheckOut] = useState(1);
  async function getCategory() {
    var res = await axios.post("/category/get", {
      phone: Cookies.get("phone"),
    });
    setAllCategory(res.data.category);
  }
  const getProduct = async () => {
    const res = await axios.get("/product/");
    setAllProduct(res.data.product);
    // setCheck("load");
  };
  useEffect(() => {
    if (localStorage.getItem("checkoutCondition") === "1") {
      if (loc.state?.checkoutmessage != undefined) {
        toast.success(loc.state?.checkoutmessage);
        // loc.state?.checkoutmessage="";
      }
      localStorage.setItem("checkoutCondition", 0);
    }

    getProduct();
    getCategory();
  }, []);
  return (
    <>
      <Layout>
        <div id="category" className="  scrollbar-hide">
          {CategoryItem.category.map((item, key) => {
            return (
              // state={{ cat: item.title }}
              <Link
                key={key}
                onClick={() => {
                  disp(addCat(item.title));
                }}
                to={"/filter"}
                state={{ category: item.title }}
              >
                <div
                  className={`categoryChild category${key}ChildNo `}
                  key={key}
                >
                  <img className="cateImg" src={item.image} />
                  <span className="categoryTitle">{item.title}</span>
                </div>
              </Link>
            );
          })}
        </div>
        {/* <HeadingSlider /> */}
        {allproduct.length === 0 ? (
          <div className=" flex justify-center  loading-container m-4">
            <div className="flex justify-center items-center h-full  loading"></div>
          </div>
        ) : allCategory.length !== 0 ? (
          allCategory.map((item, key) => {
            return (
              <CatItemContainer
                category={item._id}
                categoryName={item.name}
                allproduct={allproduct}
                key={key}
              />
            );
          })
        ) : (
          <div>Wait</div>
        )}
      </Layout>
    </>
  );
}
