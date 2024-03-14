import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import FilterItemCont from "../componets/FilterItemCont.js";
import { useDispatch, useSelector } from "react-redux";
import { addCat } from "../store/CatSlice.js";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Layout from "../componets/Layout.js";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.js";
import Spinner from "../componets/Spinner.js";
import { useCart } from "../Context/Cart.js";
import toast from "react-hot-toast";
export default function FilterPage() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useCart();
  const [newFilter, setNewFilter] = useState(0);
  const [filter, setFilter] = useState({
    category: [],
    price: [],
  });
  const priceFileter = [
    [0, 100],
    [100, 300],
    [300, 500],
    [500, 800],
    [800, 1000],
  ];
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
  const [check, setCheck] = useState("wait");
  const [allCategory, setAllCategory] = useState([]);
  const getFilter = async () => {
    setCheck("wait");
    const res = await axios.post("/product/filter", filter);
    setProduct(res.data.product);
    setCheck("load");
  };
  const getAllProduct = async () => {
    setCheck("wait");

    const res = await axios.get("/product/");
    setProduct(res.data.product);
    setCheck("load");
  };
  const addFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (e.target.checked) {
      setFilter({ ...filter, [name]: [...filter.category, value] });
    } else {
      var newFilter = filter.category.filter((item) => item !== value);
      setFilter({
        category: newFilter,
        price: filter.price,
      });
    }
  };
  async function getCategory() {
    var res = await axios.post("/category/get", {
      phone: Cookies.get("phone"),
    });

    setAllCategory(res.data.category);
    if (res.data.success) {
      if (newFilter == 0) {
        if (loc.state?.category) {
          const tem = res.data.category.filter(
            (item) => item.name == loc.state.category
          );
          if (tem.length > 0) {
            if (loc.state?.category) {
              setFilter({ ...filter, category: [tem[0]._id] });
            }
          }
        }
        setNewFilter(1);
      }
    }
  }

  useEffect(() => {
    if (!loc.state?.category) {
      setNewFilter(1);
    }
    getCategory();
    if (!loc.state?.category) {
      getAllProduct();
    }
  }, []);
  useEffect(() => {
    if (newFilter == 1) {
      if (
        filter.category.length ||
        filter.price.length ||
        filter.price.length === 0
      )
        getFilter();
    }
  }, [filter.category, filter.price]);

  return (
    <>
      <Layout>
        <div className="flex mt-4 flex-row">
          <div className="w-3/12 ml-2">
            <div className="py-2 bg-white flex justify-center border-b-2 rounded font-bold">
              <p>FILTER OPTION</p>
            </div>
            <div className="py-2 bg-white pl-4 border-b-2 rounded ">
              <div className="font-bold">CATEGORY</div>
              <div>
                {allCategory.map((item, key) => {
                  return (
                    <div className="" key={key}>
                      <label className="block pl-2 bg-white text-black py-2 ">
                        <input
                          type="checkbox"
                          key={key}
                          onChange={addFilter}
                          name="category"
                          value={item._id}
                        />

                        <p className="ml-2 inline">{item.name}</p>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="py-2 bg-white pl-4 rounded ">
              <div className="font-bold">PRICE</div>
              <div>
                {priceFileter.map((item, key) => {
                  return (
                    <div className="" key={key}>
                      <label className="block pl-2 bg-white text-black py-2 ">
                        <input
                          name="price"
                          onChange={() => {
                            setFilter({ ...filter, price: [item[0], item[1]] });
                          }}
                          type="radio"
                          key={key}
                          value={item}
                        />

                        <p className="ml-2 inline">
                          ${item[0]}-{item[1]}
                        </p>
                      </label>
                    </div>
                  );
                })}

                <div className="">
                  <label className="block pl-2 bg-white text-black py-2 ">
                    <input
                      name="price"
                      onChange={() => {
                        setFilter({ ...filter, price: [] });
                      }}
                      type="radio"
                    />
                    <p className="ml-2 inline">None</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-9/12 ml-1">
            <div className="ml-3   flex items-center font-bold">
              <p className="py-2 pl-2 w-full mr-2 rounded bg-white">
                Filter Product
              </p>
            </div>
            {check === "wait" ? (
              <div className="flex items-center h-full justify-center">
                <Spinner />
              </div>
            ) : product.length === 0 ? (
              <div className="flex items-center h-full justify-center">
                <p className="">No Product Found</p>
              </div>
            ) : (
              <div className="flex  flex-wrap">
                {product.map((item, key) => {
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
                              state: { product: item, allproduct: product },
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
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
