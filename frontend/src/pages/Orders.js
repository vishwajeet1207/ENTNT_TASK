import React, { useEffect, useRef, useState } from "react";
import { Select } from "antd";
import axios from "axios";

import moment from "moment";
import toast from "react-hot-toast";
import Spinner from "../componets/Spinner";
export default function Orders() {
  const Option = Select;
  const borderforTable = useRef(
    "border-2  border-white border-solid  border-card-border"
  );
  const [allStatus, setAllStatus] = useState([
    "Not Processing",
    "Processing",
    "Shipped",
    "Deliverd",
    "Cancel",
  ]);
  const [allOrders, setAllOrders] = useState([]);
  async function getALLOrder() {
    const res = await axios.get("/order");
    setAllOrders(res.data.order);
  }
  async function updateOrder(value, id) {
    try {
      const res = await axios.post("/order/update/" + id, {
        status: value,
      });
      if (res.data.success) {
        getALLOrder();
      }
      toast.success("updated");
    } catch (error) {
      toast.error("Something is happen");
    }
  }
  useEffect(() => {
    getALLOrder();
  }, []);
  return allOrders.length === 0 ? (
    <div className="flex items-center h-[100vh] justify-center">
      <Spinner />
    </div>
  ) : (
    <div className="">
      {allOrders.map((item, key) => {
        return (
          <div className={` ${key == 0 ? "mb-3" : "my-3"}  bg-white`}>
            <table key={key} className=" w-full table-fixed">
              <thead>
                <tr>
                  <th className={`${borderforTable.current}`}>Status</th>
                  <th className={`${borderforTable.current}`}>Buyer</th>
                  <th className={`${borderforTable.current}`}>Date</th>
                  <th className={`${borderforTable.current}`}>Payment</th>
                  <th className={`${borderforTable.current}`}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className={`${borderforTable.current}`}>
                    <Select
                      type="text"
                      bordered={false}
                      placeholder={"Select Status"}
                      defaultValue={item.status}
                      size="large"
                      showSearch
                      onChange={(value) => {
                        updateOrder(value, item._id);
                      }}
                      className="mr-5 w-full border-slate-300"
                    >
                      {allStatus.map((item, key) => {
                        return (
                          <Option key={key} value={item}>
                            {item}
                          </Option>
                        );
                      })}
                    </Select>
                  </td>
                  <td className={`${borderforTable.current}`}>
                    {item.buyer.firstname}
                  </td>
                  <td className={`${borderforTable.current}`}>
                    {moment(item.createAt).fromNow()}
                  </td>
                  <td className={`${borderforTable.current}`}>
                    {item.payment}
                  </td>
                  <td className={`${borderforTable.current}`}>
                    {item.product.length}
                  </td>
                </tr>
              </tbody>
            </table>
            {item.product.map((pro, key) => {
              return (
                <div
                  className={`${
                    key === 0
                      ? "p-3 m-1 border-t-2 border-inherit border-solid"
                      : "border-2 border-white"
                  } flex flex-row  mx-5 py-3 `}
                >
                  <div className="w-1/3 h-[192px] rounded bg-red  ">
                    <img
                      src={`http://localhost:5000/product/${pro._id}`}
                      className="w-[192px] h-full"
                    />
                  </div>
                  <div className="flex ml-5 w-2/3 flex-col ">
                    <div className="flex   justify-between">
                      <a className="font-bold"> {pro.name} </a>
                      <a className="font-bold"> {pro.price} </a>
                    </div>

                    <div className="flex">
                      <a className="font-normal">
                        {" "}
                        {pro.description.substring(0, 200)}...{" "}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex p-3 m-1 border-t-2 border-inherit border-solid justify-between flex-row">
              <div className="font-bold text-[15px]">Delivery Address</div>
              <div>
                <div className="font-bold text-[15px] ">
                  <span> {item.address.addressName}</span>
                  <span>, {item.address.addressPhone}</span>
                </div>
                <div className="font-bold text-[15px]">
                  <span>{item.address.addressLine}</span>
                  <span>{item.address.addressPincode}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
