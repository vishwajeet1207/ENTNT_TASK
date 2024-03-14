import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./CardPage.css";
import {
  toDeleteFromDatabaseAndCard,
  addToDataBaseInCard,
} from "../store/CardSlice";
import { Link, useNavigate } from "react-router-dom";
import NavbarHeader from "../componets/NavbarHeader";
import Layout from "../componets/Layout";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext";

export default function CardPage() {
  var totalPrice = 0;
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  var totalItem = 0;
  const [auth, setAuht] = useAuth();
  const dis = useDispatch();
  const { data } = useSelector((state) => state.cardSlice);
  // useEffect(() => {}, [data]);
  function removeProductCart(item) {
    const temp = cart.filter((ite) => ite._id != item._id);
    setCart(temp);
    localStorage.setItem("cart", JSON.stringify(temp));
    toast.success("Remove From Cart");
  }
  return (
    <>
      <Layout>
        <div className="flex max-[690px]:flex-col max-[690px]:ml-5 mr-3">
          <div className="shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] w-3/5 flex  flex-col bg-white my-5   mx-5 max-[690px]:w-full max-[690px]:mx-0">
            {cart.length === 0 ? (
              <>
                <div className="flex max-[690px]:h-[300px] items-center w-full h-full">
                  <div className="mt-1/2 text-center w-full  text-2xl font-bold">
                    No item in Card
                  </div>
                </div>
              </>
            ) : (
              cart.map((item, key) => {
                {
                  totalPrice += item.count * item.price;
                  totalItem += item.count;
                }
                return (
                  <div
                    key={key}
                    className="flex flex-row border-2 mx-5 py-3 border-white border-solid box-border border-b-card-border"
                  >
                    <div className="w-1/3 h-[192px] rounded bg-red  ">
                      <img
                        src={`http://localhost:5000/product/${item._id}`}
                        className="w-[192px] h-full"
                      />
                    </div>
                    <div className="flex ml-5 w-2/3 flex-col justify-between">
                      <div className="flex   justify-between">
                        <a> {item.name} </a>
                        <a className="font-bold"> {item.price} </a>
                      </div>
                      <div className="flex justify-between">
                        <a> instock </a>
                        <div className="flex flex-row">
                          <span
                            className="mx-4 px-4 bg-blue-600 text-white"
                            onClick={() => {
                              dis(addToDataBaseInCard(item, "-1"));
                            }}
                          >
                            -
                          </span>
                          <p>{item.count}</p>
                          <span
                            className="mx-4 px-4 bg-blue-600 text-white"
                            onClick={() => {
                              dis(addToDataBaseInCard(item, "1"));
                            }}
                          >
                            +
                          </span>
                        </div>

                        <p
                          onClick={() => {
                            // dis(toDeleteFromDatabaseAndCard(item));
                            // console.log("remove to card call");
                            removeProductCart(item);
                          }}
                          className="text-blue-600"
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] w-2/5 h-[55vh] bg-white b my-5  mr-5 ml-2 max-[690px]:w-full max-[690px]:mx-0 ">
            <div className="p-8">
              <div className="mb-3 text-2xl font-bold">Order Summary</div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Subtotal</a>
                <a className="text-black font-bold">{totalPrice.toFixed(2)}</a>
              </div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Shipping estimate</a>
                <a className="text-black font-bold">{totalItem * 30}</a>
              </div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Tax estimate</a>
                <a className="text-black font-bold">0</a>
              </div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Order total</a>
                <a className="text-black font-bold">
                  {totalItem * 30 + totalPrice}
                </a>
              </div>
              <button
                onClick={() => {
                  cart.length === 0
                    ? toast.error("Cart is Empty")
                    : auth.user.role === "0"
                    ? navigate("/checkout")
                    : toast.error("Admin Not Have Permission");
                }}
                style={{ backgroundColor: "#fb641b" }}
                className=" text-white font-bold rounded-sm w-full h-[50px]"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
