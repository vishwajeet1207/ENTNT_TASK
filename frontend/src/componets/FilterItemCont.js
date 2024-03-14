import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters, AiFillStar } from "react-icons/ai";
import { ItemFromCat } from "../store/CatSlice.js";
import "./FiterItemCont.css";
import { Link } from "react-router-dom";
export default function FilterItemCont() {
  const dis = useDispatch();
  const { data, status, cat } = useSelector((state) => state.catSlice);

  useEffect(() => {
    dis(ItemFromCat(cat));
  }, [cat]);
  if (status === "WAIT") {
    return (
      <div className=" flex justify-center  loading-container m-4">
        <div className="flex justify-center items-center h-full  loading"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white  m-4">
        <div className="p-4 font-[700] text-lg">{cat}</div>
        <div
          id="itemcontainer"
          // className="flex overflow-x-scroll scroll-smooth scrollbar-hide"
          className="grid grid-cols-5 col-auto max-[988px]:grid-cols-3 max-[760px]:grid-cols-2 max-[1030px]:grid-cols-4  max-[1000px]:gap-1  "
        >
          {data.map((item) => {
            return (
              <Link
                to="/product"
                state={{ items: item }}
                className=" m-3   bg-white item-center rounded border-2  border-solid "
              >
                <div className="imagediv relative w-[200px] h-[200px] p-2">
                  <img
                    className="w-full h-full object-cover hover:scale-105 hover-in-out duration-300"
                    src={item.image}
                  />
                </div>
                <div
                  id="itemheader"
                  className="text-center w-[200px]"
                  style={{}}
                >
                  <span className="text-base font-normal	">{item.title}</span>
                  <div className="text-lg mb-2 flex justify-between font-bold item-center	">
                    <span className="ml-2  ">
                      <span className="bg-rating-bg text-white text-sm py-1 px-2 rounded">
                        {item.rating.rate}
                        <AiFillStar className="inline-block" size={15} />
                      </span>
                      <span className="mx-1 text-sm">
                        {item.rating.count} {"Ratings"}
                      </span>
                    </span>
                    <span className="mr-3">{item.price}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
