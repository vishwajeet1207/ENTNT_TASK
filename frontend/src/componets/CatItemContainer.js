import React, { useEffect, useState } from "react";
import CAT from "../files/category.json";
import "./CatltemContainer.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
export default function CatItemContainer(props) {
  const [categoryitem, setCategoryItem] = useState([]);
  const [temp, setTemp] = useState(false);
  function leftside() {
    var temp = document.getElementById("itemcontainer");
    temp.scrollLeft = temp.scrollLeft - 500;
  }
  const getFilter = async () => {
    const temp = await props.allproduct.filter(
      (item) => item.category === props.category
    );
    setCategoryItem(temp);
  };
  function rightside() {
    var temp = document.getElementById("itemcontainer");
    temp.scrollLeft = temp.scrollLeft + 500;
  }

  useEffect(() => {
    getFilter();
    setTemp(true);
  }, []);
  if (categoryitem.length === 0 && temp) {
    return <></>;
  }
  if (categoryitem.length === 0 && !temp) {
    return (
      <div className=" flex justify-center  loading-container m-4">
        <div className="flex justify-center items-center h-full  loading"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white m-4">
        <div className="p-4 font-[700] text-lg">{props.categoryName}</div>
        <div className="flex items-center  pb-10">
          <div
            onClick={leftside}
            className=" h-[100px]  z-10 absolute left-4 inline-block flex items-center  bg-white"
          >
            <MdChevronLeft size={40} className=" opacity-80 cursor-pointer " />
          </div>
          <div
            id="itemcontainer"
            className="flex overflow-x-scroll scroll-smooth scrollbar-hide"
            // className="flex-wrap flex-row flex"
          >
            {categoryitem.map((item, key) => {
              return (
                <Link
                  to={"/filter"}
                  state={{ category: props.categoryName }}
                  key={key}
                  id="card"
                  className="flex flex-col m-2 bg-white item-center rounded border-2  border-solid "
                >
                  <div className="imagediv relative w-[200px] h-[200px] p-2">
                    <img
                      className="w-full h-full object-fit hover:scale-105 hover-in-out duration-300"
                      src={`http://localhost:5000/product/${item._id}`}
                    />
                  </div>
                  <div id="itemheader" className="text-center" style={{}}>
                    <p className="text-base font-normal	">
                      {item.name.substring(0, 20)}...
                    </p>
                    <p className="text-lg font-bold	">{item.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div
            onClick={rightside}
            className=" h-[100px]  z-10 absolute right-4 inline-block flex items-center  bg-white"
          >
            <MdChevronRight size={40} className=" opacity-80 cursor-pointer " />
          </div>
        </div>
      </div>
    </>
  );
}
