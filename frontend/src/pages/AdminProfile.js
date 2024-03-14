import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { addUser } from "../store/UserSlice";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import toast from "react-hot-toast";
import Layout from "../componets/Layout";
import { useAuth } from "../Context/AuthContext";
import { Select } from "antd";
import CreateCrategory from "./CreateCrategory";
import UpdateProduct from "./UpdateProduct";
import AllProduct from "./AllProduct";
import Spinner from "../componets/Spinner";
import Orders from "./Orders";
const { Option } = Select;
export default function AdminProfile() {
  var dis = useDispatch();
  const navigator = useNavigate();
  const { auth, setAuth } = useAuth();
  const [allCategory, setAllCategory] = useState([]);
  const [spinnerCheck, setSpinnerCheck] = useState(false);
  const [option, setOption] = useState("category");
  const [updateNEWProduct, setUpdateNEWProduct] = useState(false);

  const [newproduct, setProduct] = useState({
    price: "",
    description: "",
    quantity: "",
    name: "",
    category: "",
    shipping: "",
  });

  // const [price,setPrice]= useState();
  // const [description,setDescription]= useState();
  // const onFilterChange = function (e) {
  //   setFilterCategory(e.target.value);
  // };
  const [updateProduct, setUpdateProduct] = useState();

  const addproduct = function (e) {
    var name = e.target.name;
    var value = e.target.value;

    setProduct({ ...newproduct, [name]: value });
  };
  const addproductToDB = async function (e) {
    e.preventDefault();
    setSpinnerCheck(true);
    try {
      console.log(newproduct);
      const setProductData = new FormData();
      setProductData.append("name", newproduct.name);
      setProductData.append("description", newproduct.description);
      setProductData.append("quantity", newproduct.quantity);
      setProductData.append("category", newproduct.category);
      setProductData.append("shipping", newproduct.shipping);
      setProductData.append("price", newproduct.price);
      setProductData.append("photo", newproduct.photo);

      var res = await axios.post("/product/createProduct", setProductData);
      toast.success(res.data.message);
      setProduct({
        price: "",
        description: "",
        quantity: "",
        name: "",
        category: "",
        shipping: "",
      });
      setSpinnerCheck(false);
    } catch (error) {
      toast.error(error);
      setSpinnerCheck(false);
    }
  };

  async function getCategory() {
    var res = await axios.post("/category/get", {
      phone: Cookies.get("phone"),
    });
    setAllCategory(res.data.category);
  }

  useEffect(() => {
    getCategory();
  }, []);
  // if (Category === null) {
  //   return (
  //     <>
  //       <div className=" flex justify-center  loading-container m-4">
  //         <div className="flex justify-center items-center h-full  loading"></div>
  //       </div>
  //     </>
  //   );
  // }
  return (
    <>
      <Layout>
        <div className="flex   mt-6 justify-center">
          <div className=" w-full mx-2 ">
            <div className=" flex max-[915px]:flex-col ">
              <div className="w-3/12 mr-2 ">
                <div className="bg-white py-2">
                  <div className="text-lg pl-8 py-2 border-b-2 ">
                    Account Setting
                  </div>
                  <div
                    onClick={() => {
                      setOption("category");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "category"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    Create Category
                  </div>
                  <div
                    onClick={() => {
                      setOption("product");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "product"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    Create Product
                  </div>
                  <div
                    onClick={() => {
                      setOption("allproduct");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "allproduct"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    All Product
                  </div>
                  <div
                    onClick={() => {
                      setOption("order");
                    }}
                    className={` text-lg pl-8 font-normal py-2  ${
                      option === "order"
                        ? "bg-blue-600 text-white"
                        : "bg-white text-black hover:bg-yellow-300 hover:text-black"
                    } `}
                  >
                    Order
                  </div>
                </div>
              </div>
              <div className="w-9/12 ">
                {option === "product" ? (
                  <>
                    <form className="bg-white p-6">
                      <span>ADD A NEW product</span>

                      <div>
                        <div>
                          <div className="my-2">
                            <label className="font-bold">Name</label>
                            <div className=" my-2  ">
                              <input
                                type="text"
                                className="mr-5 border-slate-300"
                                name="name"
                                onChange={addproduct}
                                required=""
                                placeholder="First Name"
                                autoComplete="name"
                                value={newproduct.name}
                              />
                            </div>
                          </div>
                          <div className="my-2">
                            {/* {filterCategory.length} */}
                            <label className="font-bold">Category</label>
                            <div className=" my-2  ">
                              <Select
                                type="text"
                                bordered={false}
                                placeholder="Select Category"
                                size="large"
                                showSearch
                                onChange={(value) => {
                                  // let newFilter = filterCategory.filter(
                                  //   (item) => item !== value
                                  // );
                                  setProduct({
                                    ...newproduct,
                                    category: value,
                                  });

                                  // setFilterCategory([...newFilter, value]);
                                }}
                                className="mr-5 w-full border-slate-300"
                              >
                                {allCategory.map((item) => {
                                  return (
                                    <Option key={item._id} value={item._id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </div>
                          </div>
                          <div className="my-2">
                            <label className="font-bold">Description</label>
                            <div className="my-2">
                              <input
                                type="text"
                                name="description"
                                onChange={addproduct}
                                className="border-slate-300"
                                placeholder="Description"
                                autoComplete="tel"
                                value={newproduct.description}
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="my-2">
                            <label className="font-bold">Price</label>

                            <input
                              className="my-2 border-slate-300"
                              type="number"
                              name="price"
                              onChange={addproduct}
                              placeholder="Price"
                              autoComplete="postal-code"
                              value={newproduct.price}
                            />
                          </div>
                          <div className="my-2">
                            <label className="font-bold">Quantity</label>

                            <input
                              className="my-2 border-slate-300"
                              type="number"
                              name="quantity"
                              onChange={addproduct}
                              placeholder="Quantity"
                              autoComplete="postal-code"
                              value={newproduct.quantity}
                            />
                          </div>
                          <div className="my-2">
                            <label className="font-bold">Shipping</label>
                            <div className=" my-2  ">
                              <Select
                                type="text"
                                bordered={false}
                                placeholder="Select Category"
                                size="large"
                                showSearch
                                onChange={(value) => {
                                  setProduct({
                                    ...newproduct,
                                    shipping: value,
                                  });
                                }}
                                className="mr-5 w-full border-slate-300"
                              >
                                <Option key={1} value={true}>
                                  {"Yes"}
                                </Option>
                                <Option key={2} value={false}>
                                  {"No"}
                                </Option>
                              </Select>
                            </div>
                          </div>
                          <div className="my-2 py-2 text-center border border-inherit">
                            <label className="font-bold">
                              Upload Photo
                              <input
                                className="my-2 border-slate-300"
                                type="file"
                                accept="images/*"
                                name="photo"
                                hidden
                                onChange={(e) => {
                                  setProduct({
                                    ...newproduct,
                                    photo: e.target.files[0],
                                  });
                                }}
                              />
                            </label>
                          </div>

                          <div className="my-2">
                            {newproduct.photo ? (
                              <img
                                className="my-2 border-slate-300"
                                width={"200px"}
                                src={URL.createObjectURL(newproduct.photo)}
                                height={"200px"}
                              />
                            ) : (
                              "NO Image Uploaded"
                            )}
                          </div>
                        </div>

                        <div className="my-2">
                          <button
                            className="bg-blue-600 px-10 rounded-lg py-2 text-white"
                            type="submit"
                            onClick={addproductToDB}
                          >
                            {spinnerCheck ? <Spinner /> : "Create Product"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </>
                ) : option === "allproduct" ? (
                  <AllProduct allCategory={allCategory} />
                ) : option === "category" ? (
                  <CreateCrategory
                    allCategory={allCategory}
                    setAllCategory={setAllCategory}
                  />
                ) : (
                  <Orders />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
