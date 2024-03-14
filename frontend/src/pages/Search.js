import React, { useEffect } from "react";
import { useSearch } from "../Context/Search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import Spinner from "../componets/Spinner";
import axios from "axios";

export default function Search() {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  function addToCart(item) {
    var temp = false;
    cart.forEach((element, index) => {
      if (cart[index]._id === item._id) {
        temp = true;
        cart[index].count = cart[index].count + 1;
      }
    });

    if (!temp) {
      setCart([...cart, { ...item, count: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...item, count: 1 }])
      );
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart]));
    }
    toast.success("Add To Cart");
  }

  useEffect(() => {}, []);
  return search.product.length === 0 ? (
    <div>
      <Spinner />
    </div>
  ) : (
    <div className="flex  flex-wrap">
      {search.product.map((item, key) => {
        return (
          <div
            // to="/product"
            // state={{ items: item }}
            key={key}
            className=" m-3 w-[18rem]   bg-white item-center rounded border-2  border-solid "
          >
            <div className="imagediv flex justify-center flex-row items-center  h-[207px]  w-full p-2">
              <img
                className=" h-full object-flll  hover:scale-105 hover-in-out duration-300"
                src={`http://localhost:5000/product/${item._id}`}
              />
            </div>
            <div id="itemheader" className="   w-full" style={{}}>
              <div className="text-lg mb-2 flex justify-between font-medium item-center	">
                <span className="ml-2 font-semibold ">
                  {item.name.substring(0, 20)}...
                </span>
                <span className="mr-3 font-semibold text-green-600">
                  ₹{item.price}
                </span>
              </div>
              <span className="text-base ml-2 font-normal	">
                {item.description.substring(0, 30)}...
              </span>
            </div>
            <div className="flex mt-2 mb-2 text-center items-center">
              <span
                onClick={() => {
                  navigate("/product", {
                    state: { product: item },
                  });
                }}
                className="py-2 ml-2 text-center px-3 flex-1 rounded bg-blue-600 text-white font-bold mr-1 "
              >
                Detail
              </span>
              <span
                onClick={() => {
                  addToCart(item);
                }}
                className=" mr-2 py-2 text-center flex-1 px-3 rounded bg-red-600 text-white font-bold ml-1"
              >
                Add To Cart
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
