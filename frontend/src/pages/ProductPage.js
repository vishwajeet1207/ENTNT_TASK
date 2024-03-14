import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";

export default function ProductPage(props) {
  const location = useLocation();

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
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex bg-white w-[80vw] mt-4 flex-row">
          <div className="flex-1">
            {" "}
            <img
              src={`http://localhost:5000/product/${location.state.product._id}`}
              className="w-full p-4 h-[60vh]"
            />
          </div>
          <div className="flex-1 m-4">
            <div>
              <div className="flex my-2 flex-row justify-between">
                <span className="font-medium text-[20px]">
                  {location.state.product.name}
                </span>
                <span className="font-medium text-[20px]">
                  {location.state.product.price}
                </span>
              </div>

              <div className="my-2">
                <p className="font-medium text-[15px]">Description</p>
                <p className="font-normal mt-2 text-[#4b5563] text-[15px]">
                  {location.state.product.description}
                </p>
              </div>
              <div
                onClick={() => {
                  addToCart(location.state.product);
                }}
                style={{ backgroundColor: "#fb641b" }}
                className="my-2 text-white font-semibold text-[17px] rounded-md py-3 text-center"
              >
                Add To Cart
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  // <div>{location.state.product.name}</div>;
}
