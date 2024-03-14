import React, { useEffect } from "react";

export default function HeadingSlider() {
  return (
    <div className="m-4 bg-white">
      <div
        id="container"
        className="flex duration-1000 overflow-x-scroll bg-white item-center scroll whitespace-nowrap scroll-smooth scrollbar-hide  "
      >
        <div id="first" className=" first min-w-full  h-[100px] bg-red">
          <p className="text-red-500">hello</p>
        </div>
        <div id="card" className="min-w-full  h-[100px] bg-red">
          <p className="text-black-500">hello</p>
        </div>
        <div id="card" className="min-w-full  h-[100px] bg-red">
          <p className="text-orange-500">hello</p>
        </div>
      </div>
    </div>
  );
}
