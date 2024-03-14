import React, { useEffect, useState } from "react";
import CAT from "../files/category.json";
import "./FilterContainer.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
export default function FilterContainer({ catItemSel }) {
  // function leftside() {
  //   var temp = document.getElementById("itemcontainer");
  //   temp.scrollLeft = temp.scrollLeft - 500;
  // }
  // function rightside() {
  //   var temp = document.getElementById("itemcontainer");
  //   temp.scrollLeft = temp.scrollLeft + 500;
  //   console.log(temp.scrollLeft);
  // }
  // const [categoryitem, setCategoryItem] = useState([]);
  // async function getItem() {
  //   await fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((json) => setCategoryItem(json));
  // }
  // useEffect(() => {
  //   getItem();
  // }, []);
  // if (categoryitem.length === 0) {
  //   return <div>Wait</div>;
  // }
  // if (catItemSel.length !== 0) {
  //   return <div>weight</div>;
  // }
  return (
    <>
      <div className="bg-white m-4">
        <div className="p-4 font-[700] text-lg">Category Name</div>
        <div className="flex items-center  pb-10">
          {/* <div
            
            className=" h-[100px]  z-10 absolute left-4 inline-block flex items-center  bg-white"
          >
            <MdChevronLeft size={40} className=" opacity-80 cursor-pointer " />
          </div> */}
          <div
            id="itemcontainer"
            // className="flex overflow-x-scroll scroll-smooth scrollbar-hide"
            className="flex-wrap flex-row flex"
          >
            {catItemSel.map((item) => {
              return (
                <a
                  href="#"
                  id="card"
                  className="flex flex-col m-2  bg-white item-center rounded border-2  border-solid "
                >
                  <div
                    class="imagediv"
                    className="relative w-[200px] h-[200px] p-2"
                  >
                    <img
                      className="w-full h-full object-fit hover:scale-105 hover-in-out duration-300"
                      src={item.image}
                    />
                  </div>
                  <div id="itemheader" class="text-center" style={{}}>
                    <p className="text-base font-normal	">{item.category}</p>
                    <p className="text-lg font-bold	">{item.price}</p>
                  </div>
                </a>
              );
            })}
          </div>

          {/* <div
            onClick={rightside}
            className=" h-[100px]  z-10 absolute right-4 inline-block flex items-center  bg-white"
          >
            <MdChevronRight size={40} className=" opacity-80 cursor-pointer " />
          </div> */}
        </div>
      </div>
    </>
  );
}
