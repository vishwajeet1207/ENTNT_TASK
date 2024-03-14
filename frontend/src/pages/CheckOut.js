import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Layout from "../componets/Layout";
// import Razorpay from "razorpay";

import { useAuth } from "../Context/AuthContext";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";
import useRazorpay from "react-razorpay";
import Spinner from "../componets/Spinner";

export default function CheckOut() {
  const [newCart, setNewCart] = useState([]);
  const [Razorpay] = useRazorpay();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    change: false,
  });
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [itmetocheck, setItemToCheck] = useState({
    change: true,
    itmesC: "",
  });
  const totalPrice = useRef(0);
  const totalItem = useRef(0);
  var newcountOfItem = 0;
  var loc = useLocation();
  const [product, setProduct] = useState(null);
  const [paymentOption, setPaymentOption] = useState("cash on delivery");
  const [profileInfo, setProfileDetail] = useState(null);
  const [checkout, setCheckOut] = useState({
    addressRadio: 0,
  });
  const paymentCheck = (e) => {
    setPaymentOption(e.target.value);
  };
  const startOrderExection = async () => {
    var paymentDetail = {};

    paymentDetail.amount = totalPrice.current + totalItem.current * 30;
    paymentDetail.currency = "INR";
    paymentDetail.email = profileInfo.email;

    const tem = cart.map((item) => {
      delete item.createdAt;
      delete item.updatedAt;
      delete item.count;
      delete item.__v;
      return item;
    });
    if (paymentOption === "cash on delivery") {
      const res = await axios.post("/order", {
        tem,
        buyer: profileInfo._id,
        payment: "Cash ON Delivery",
        address: auth.user.address[checkout.addressRadio],
      });
      if (res.data.success) {
        setCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("checkoutCondition", 1);
        navigate("/", {
          state: { checkoutmessage: res.data.message },
        });
      } else {
        localStorage.setItem("checkoutCondition", 1);

        navigate("/", {
          state: { checkoutmessage: res.data.message },
        });
      }
    } else {
      const res = await axios.post("/payment", paymentDetail);
      if (res.data.success) {
        var options = {
          key: res.data.key_id,
          amount: "" + res.data.amount + "",
          currency: "INR",
          name: cart.length + "items",
          description: "All product payment",
          image: "https://dummyimage.com/600x400/000/fff",
          order_id: "" + res.data.order_id + "",
          handler: async function (response) {
            const res = await axios.post("/order", {
              tem,
              buyer: profileInfo._id,
              payment: "Completed",
              address: auth.user.address[checkout.addressRadio],
            });
            setCart([]);
            localStorage.setItem("cart", JSON.stringify([]));
            localStorage.setItem("checkoutCondition", 1);

            navigate("/", {
              state: { checkoutmessage: res.data.message },
            });

            // window.open("/","_self")
          },
          prefill: {
            contact: "7558337381",
            name: profileInfo.firstname,
            email: profileInfo.email,
          },
          notes: {
            description: "",
          },
          theme: {
            color: "#2300a3",
          },
        };
        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
          localStorage.setItem("checkoutCondition", 1);
          navigate("/", {
            state: { checkoutmessage: "Payment Failed" },
          });
        });

        rzp1.open();
        // var razorpayObject = new Razorpay(options);
        // razorpayObject.on("payment.failed", function (response) {
        //   alert("Payment Failed");
        // });
        // razorpayObject.open();
      }
      toast.success(res.data.message);
    }
  };
  const [selectedItem, setSelectedItem] = useState({
    item: [
      {
        title: "",
      },
    ],
  });
  async function getProfileDetail() {
    var res = await axios.post(
      "/userProfile",
      {
        userID: Cookies.get("id"),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setProfileDetail(res.data);
  }

  const onSelectitem = function (e) {
    if (e.target.checked) {
      setSelectedItem({ item: [...selectedItem.item, e.target.value.it] });
    } else {
      var newItEM = selectedItem.item.filter(
        (item) => item.title !== e.target.value.title
      );
      selectedItem(newItEM);
    }
  };
  const onclickHandle = function (e) {
    var name = e.target.name;
    var value = e.target.value;
    setCheckOut({ ...checkout, [name]: value });
  };
  function totalPRICE() {
    totalItem.current = 0;
    totalPrice.current = 0;
    cart.map((item) => {
      totalPrice.current = totalPrice.current + item.price * item.count;
      totalItem.current = totalItem.current + item.count;
    });
  }
  useEffect(() => {
    totalPRICE();
  }, [cart.length]);
  useEffect(() => {
    getProfileDetail();
  }, []);
  const [orderSumm, setOrderSumm] = useState(false);
  if (profileInfo === null) {
    return (
      <div className="flex items-center h-full justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Layout>
        <div className="flex max-[690px]:flex-col max-[690px]:ml-5 mr-3">
          <div className=" w-3/5 flex  flex-col  my-5   mx-5 max-[690px]:w-full max-[690px]:mx-0">
            <div className="">
              <div className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]">
                <div className="bg-white pt-2.5 pb-2">
                  {" "}
                  <span className=" ml-7 text-[16px] px-2  rounded-sm text-blue-600 bg-chekout-number-bg">
                    1
                  </span>{" "}
                  <span className="ml-3 font-bold text-ckekout-title">
                    LOGIN
                  </span>
                </div>
                <div className="ml-12 pb-3 pl-5 "> {profileInfo.phone}</div>
              </div>
              {address.change === true ? (
                <div className="mt-5 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] flex justify-between">
                  <div className="">
                    <div className="bg-white pt-2.5 pb-2">
                      {" "}
                      <span className=" ml-7 text-[16px] px-2  rounded-sm text-blue-600 bg-chekout-number-bg">
                        2
                      </span>{" "}
                      <span className="ml-3 font-bold text-ckekout-title">
                        DELIVERY ADDRESS
                      </span>
                    </div>
                    <div className="ml-12 pb-3 pl-5 ">
                      <span className="font-semibold">
                        {auth.user.address[checkout.addressRadio].addressName}
                      </span>{" "}
                      <span className="">
                        {auth.user.address[checkout.addressRadio].addressLine}
                      </span>
                      {"-"}
                      <span className="font-semibold">
                        {
                          auth.user.address[checkout.addressRadio]
                            .addressPincode
                        }
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-5">
                      <span
                        onClick={() => {
                          setAddress({ change: false });
                          setItemToCheck({ change: true });
                        }}
                        className="mt-2 text-blue-600 py-2 px-4 rounded-sm border border-slate-300 mr-6"
                      >
                        CHANGE
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]">
                  <div className="bg-blue-600 py-2.5  ">
                    {" "}
                    <span className=" ml-7 text-[16px] px-2  rounded-sm text-blue-600 bg-white">
                      2
                    </span>{" "}
                    <span className="ml-3 font-bold text-white">
                      DELIVERY ADDRESS
                    </span>
                  </div>
                  <div className=" pb-3  ">
                    {auth.user.address.map((addres, key) => {
                      return (
                        <div
                          key={key}
                          className={`flex ${
                            profileInfo.address.length - 1 === key
                              ? ""
                              : "border-b"
                          } mt-2 border-slate-300 pb-2`}
                        >
                          <input
                            className="mt-3 ml-8"
                            type="radio"
                            value={key}
                            onChange={onclickHandle}
                            name="addressRadio"
                          />
                          <div className="ml-5 mt-2">
                            <div className="text-base">
                              <span className="  font-semibold">
                                {addres.addressName}
                              </span>
                              <span className=" font-bold ml-3">
                                {addres.addressPhone}
                              </span>
                            </div>
                            <div className="text-base">
                              <span className="">{addres.addressLine}</span>-
                              <span className=" font-bold">
                                {addres.addressPincode}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="ml-10 mt-6 mb-6">
                      <span
                        onClick={() => {
                          setAddress({ change: true });
                          setItemToCheck({ change: false });
                        }}
                        style={{ backgroundColor: "#fb641b" }}
                        className="py-3 px-4 ml-6  text-white font-bold"
                      >
                        DELIVER HERE
                      </span>
                    </div>
                  </div>
                </div>
              )}
              {itmetocheck.change === true ? (
                <div className="mt-5 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] flex justify-between">
                  <div className="">
                    <div className="bg-white pt-2.5 pb-2">
                      {" "}
                      <span className=" ml-7 text-[16px] px-2  rounded-sm text-blue-600 bg-chekout-number-bg">
                        3
                      </span>{" "}
                      <span className="ml-3 font-bold text-ckekout-title">
                        ORDER SUMMARY
                      </span>
                    </div>
                    <div className="ml-12 pb-3 pl-5 ">
                      <span className="font-semibold">{cart.length}</span>
                    </div>
                  </div>
                  <div className="">
                    <div className="mt-5">
                      <span
                        onClick={() => {
                          setItemToCheck({ change: false });
                          setAddress({ change: true });
                        }}
                        className="mt-2 text-blue-600 py-2 px-4 rounded-sm border border-slate-300 mr-6"
                      >
                        CHANGE
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-5 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]">
                  <div className="bg-blue-600 py-2.5  ">
                    {" "}
                    <span className=" ml-7 text-[16px] px-2  rounded-sm text-blue-600 bg-white">
                      3
                    </span>{" "}
                    <span className="ml-3 font-bold text-white">
                      ORDER SUMMARY{" "}
                    </span>
                  </div>
                  <div className=" pb-3  ">
                    {cart.map((items, key) => {
                      return (
                        <div key={key} className="flex w-full">
                          <div className="flex flex-row w-full border-2 mx-5 py-3 border-white border-solid box-border border-b-card-border">
                            <div className="w-1/3 h-[150px] rounded bg-red  ">
                              <img
                                src={`http://localhost:5000/product/${items._id}`}
                                className="w-[150px] h-[150px]"
                              />
                            </div>
                            <div className="flex ml-5 w-2/3 flex-col justify-between">
                              <div>
                                <div className="flex   justify-between">
                                  <a> {items.name} </a>
                                  <a className="font-bold pr-4">
                                    {" "}
                                    ${items.price}{" "}
                                  </a>
                                </div>
                                <div className="pl-3 pt-2">
                                  {items.description}
                                </div>
                              </div>

                              <div className="flex justify-between">
                                <a> instock = {items.shipping} </a>
                                <div className="flex flex-row">
                                  <span
                                    className="mx-4 px-4 bg-blue-600 text-white"
                                    onClick={() => {
                                      // dis(addToDataBaseInCard(item, "-1"));
                                    }}
                                  >
                                    {items.count}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className=" flex justify-between ml-10 mt-6 mb-6">
                    <div>
                      Order confirmation email will be sent to{" "}
                      <span className="font-semibold">{profileInfo.email}</span>
                    </div>
                    <div
                      onClick={() => {
                        setItemToCheck({ change: true });
                      }}
                      style={{ backgroundColor: "#fb641b" }}
                      className="py-3 px-4   text-white font-bold"
                    >
                      Continue
                    </div>
                  </div>
                </div>
              )}
              {/* loc.state.item */}

              <div className="mt-5 bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.08)]">
                <div className="bg-blue-600 py-2.5  ">
                  {" "}
                  <span className=" ml-7 text-[16px] px-2  rounded-sm text-blue-600 bg-white">
                    4
                  </span>{" "}
                  <span className="ml-3 font-bold text-white">
                    PAYMENT OPTION
                  </span>
                </div>
                <div className="ml-12 mt-4">
                  {" "}
                  <div className="flex items-start justify-between flex-row">
                    <div>
                      <div className="my-2">
                        <input
                          name="paymentoption"
                          type="radio"
                          onChange={paymentCheck}
                          value={"cash on delivery"}
                          checked={
                            paymentOption === "cash on delivery" ? true : false
                          }
                        />
                        <p className="inline font-medium ml-4 ">
                          Cash On Delivery
                        </p>
                      </div>
                      <div className="my-2 pb-4">
                        <input
                          name="paymentoption"
                          type="radio"
                          onChange={paymentCheck}
                          checked={paymentOption === "paynow" ? true : false}
                          value={"paynow"}
                        />
                        <p className="inline font-medium ml-4 ">PayNow</p>
                      </div>
                    </div>

                    <span
                      style={{ backgroundColor: "#fb641b" }}
                      onClick={startOrderExection}
                      className="py-2 px-4 h-[40px] mr-6 rounded text-white font-bold "
                    >
                      Process Order
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <span className="shadow-[0_2px_4px_0_rgba(0,0,0,0.08)] w-2/5 h-[45vh] bg-white b my-5  mr-5 ml-2 max-[690px]:w-full max-[690px]:mx-0 ">
            <div className="p-8">
              <div className="mb-3 text-2xl font-bold">Order Summary</div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Subtotal</a>
                <a className="text-black font-bold">{totalPrice.current}</a>
              </div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Shipping estimate</a>
                <a className="text-black font-bold">{totalItem.current * 30}</a>
              </div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Tax estimate</a>
                <a className="text-black font-bold">0</a>
              </div>
              <div className="flex my-4 text-gray-600 justify-between">
                <a className="ml-0">Order total</a>
                <a className="text-black font-bold">
                  {totalPrice.current + totalItem.current * 30}
                </a>
              </div>
              {/* <button
                type="submit"
                style={{ backgroundColor: "#fb641b" }}
                className=" text-white font-bold rounded-sm w-full h-[50px]"
              >
                Checkout
              </button> */}
            </div>
          </span>
        </div>
      </Layout>
    </>
  );
}
