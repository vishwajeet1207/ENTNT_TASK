import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Select } from "antd";
import Spinner from "../componets/Spinner";
const { Option } = Select;
export default function AllProduct({ allCategory }) {
  const [product, setChangeProduct] = useState([]);

  const [updateProduct, setUpdateProduct] = useState();
  const [newOption, setNewOption] = useState("allproduct");
  const getProduct = async () => {
    const res = await axios.get("/product/");
    setChangeProduct(res.data.product);
    console.log("load continuouslly");

    // setCheck("load");
  };

  async function deleteProduct(id) {
    console.log("start deleting");
    try {
      const res = await axios.post("/product/delete/" + id, {
        phone: Cookies.get("phone"),
      });
      toast.success(res.data.message);
      const temp = product.filter((item) => item._id !== id);
      setChangeProduct(temp);
    } catch (error) {
      toast.error("Product Not Deleted");
    }
  }
  useEffect(() => {
    getProduct();
  }, []);

  const [spinnerCheck, setSpinnerCheck] = useState(false);
  const [changePhoto, setChangePhoto] = useState(false);
  const [photo, setPhoto] = useState("");
  const updateProductToDB = async (e) => {
    setSpinnerCheck(true);
    e.preventDefault();
    try {
      const setProductData = new FormData();
      setProductData.append("name", updateProduct.name);
      setProductData.append("description", updateProduct.description);
      setProductData.append("quantity", updateProduct.quantity);
      setProductData.append("category", updateProduct.category);
      setProductData.append("shipping", updateProduct.shipping);
      setProductData.append("price", updateProduct.price);
      photo && setProductData.append("photo", photo);

      var res = await axios.post(
        "/product/update/" + updateProduct._id,
        setProductData
      );

      var temp = product.filter((item) => item._id != updateProduct._id);
      console.log(res.data.product);
      setChangeProduct([...temp, res.data.product]);

      toast.success(res.data.message);
      setSpinnerCheck(false);
      setNewOption("allproduct");
    } catch (error) {
      toast.error("Something is Wrong");
      setSpinnerCheck(false);
    }
  };
  const updateProductDetail = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
    console.log(updateProduct);
  };
  return (
    <>
      {newOption === "allproduct" ? (
        <>
          {product.length === 0 ? (
            <div className="flex items-center h-full justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex  flex-wrap">
              {product.map((item, key) => {
                return (
                  <div
                    // to="/product"
                    // state={{ items: item }}
                    key={key}
                    className=" m-2 w-[18rem]   bg-white item-center rounded border-2  border-solid "
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
                          setUpdateProduct(item);

                          setNewOption("update");
                        }}
                        className="py-2 ml-2 text-center px-3 flex-1 rounded bg-blue-600 text-white font-bold mr-1 "
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => {
                          setChangePhoto(false);

                          // deleteCategory(cate);
                          deleteProduct(item._id);
                        }}
                        className=" mr-2 py-2 text-center flex-1 px-3 rounded bg-red-600 text-white font-bold ml-1"
                      >
                        Delete
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <form className="bg-white p-6">
          <span>Update product</span>

          <div>
            <div>
              <div className="my-2">
                <label className="font-bold">Name</label>
                <div className=" my-2  ">
                  <input
                    type="text"
                    className="mr-5 border-slate-300"
                    name="name"
                    onChange={updateProductDetail}
                    required=""
                    placeholder="First Name"
                    autoComplete="name"
                    tabIndex={1}
                    value={updateProduct.name}
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
                      setUpdateProduct({
                        ...updateProduct,
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
                    onChange={updateProductDetail}
                    className="border-slate-300"
                    placeholder="Description"
                    maxLength={10}
                    autoComplete="tel"
                    tabIndex={2}
                    value={updateProduct.description}
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
                  onChange={updateProductDetail}
                  placeholder="Price"
                  maxLength={6}
                  autoComplete="postal-code"
                  tabIndex={3}
                  value={updateProduct.price}
                />
              </div>
              <div className="my-2">
                <label className="font-bold">Quantity</label>

                <input
                  className="my-2 border-slate-300"
                  type="number"
                  name="quantity"
                  onChange={updateProductDetail}
                  placeholder="Quantity"
                  maxLength={6}
                  autoComplete="postal-code"
                  tabIndex={3}
                  value={updateProduct.quantity}
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
                    value={updateProduct.shipping ? "Yes" : "No"}
                    onChange={(value) => {
                      setUpdateProduct({
                        ...updateProduct,
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
                      setPhoto(e.target.files[0]);
                      setUpdateProduct({
                        ...updateProduct,
                        photo: e.target.files[0],
                      });
                      setChangePhoto(true);
                    }}
                  />
                </label>
              </div>

              <div className="my-2">
                {!changePhoto ? (
                  <img
                    className="my-2 border-slate-300"
                    width={"200px"}
                    src={`http://localhost:5000/product/${updateProduct._id}`}
                    height={"200px"}
                  />
                ) : (
                  <img
                    className="my-2 border-slate-300"
                    width={"200px"}
                    src={URL.createObjectURL(updateProduct.photo)}
                    height={"200px"}
                  />
                )}
              </div>
            </div>

            <div className="my-2">
              <button
                className="bg-blue-600 px-10 rounded-lg py-2 text-white"
                type="submit"
                onClick={updateProductToDB}
              >
                {spinnerCheck ? <Spinner /> : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
