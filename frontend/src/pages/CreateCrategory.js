import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Spinner from "../componets/Spinner";

export default function CreateCrategory({ allCategory, setAllCategory }) {
  const [createForm, setCreateForm] = useState("block");
  const [spinnerCheck, setSpinnerCheck] = useState(false);
  const { auth, setAuth } = useAuth();
  const [Category, setCategory] = useState({
    name: "",
  });
  const [editFormUpdate, setEditFormUpdate] = useState("hidden");

  const [categoryToEdit, setCategoryToEdit] = useState({ _id: "", name: "" });

  // const [allCategory, setAllCategory] = useState([]);
  const updateNewCategory = function (e) {
    setCategoryToEdit({ ...categoryToEdit, name: e.target.value });
  };
  // async function getCategory() {
  //   var res = await axios.post("http://localhost:5000/category/get", {
  //     phone: Cookies.get("phone"),
  //   });
  //   setAllCategory(res.data.category);
  // }
  async function updateOneCategory() {
    var res = await axios.post(
      "http://localhost:5000/category/update/" + categoryToEdit._id,
      {
        phone: Cookies.get("phone"),
        name: categoryToEdit.name,
      }
    );
    const allnewcat = allCategory.filter(
      (catitem) => catitem._id !== categoryToEdit._id
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setAllCategory([...allnewcat, res.data.temp]);
    } else {
      toast.error(res.data.message);
    }
  }
  const updateCategory = function (e) {
    var name = e.target.name;
    var value = e.target.value;
    setCategory({ ...Category, [name]: value });
  };
  async function addCategory() {
    setSpinnerCheck(true);
    try {
      var res = await axios.post(
        "/category",
        {
          name: Category.name,
          phone: Cookies.get("phone"),
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // }
      );
      if (res.data.success) {
        setAllCategory([...allCategory, res.data.temp]);
      }
      setCategory.name = "";
      toast.success(res.data.message);
      setSpinnerCheck(false);
    } catch (error) {
      toast.error("Something is Wrong");
      setSpinnerCheck(false);
    }
  }
  async function deleteCategory(cat) {
    var res = await axios.post("/category/delete", {
      phone: Cookies.get("phone"),
      name: cat.name,
    });
    const allnewcat = allCategory.filter(
      (catitem) => catitem.name !== cat.name
    );
    if (res.data.success) {
      toast.success(res.data.message);
      setAllCategory(allnewcat);
    } else {
      toast.error(res.data.message);
    }
  }
  // useEffect(() => {
  //   getCategory();
  // }, []);
  return (
    <>
      <form className={`${createForm} bg-white p-6`}>
        <div>
          <div>
            <div className="my-2">
              <label className="font-bold">Create New Category</label>
              <div className=" my-2 flex ">
                <input
                  type="text"
                  onChange={updateCategory}
                  className="mr-5 border-slate-300"
                  name="name"
                  required=""
                  placeholder="Enter Category Name"
                  autoComplete="name"
                  tabIndex={1}
                  defaultValue={Category.name}
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <button
              onClick={() => {
                addCategory();
              }}
              className="bg-blue-600 px-10 rounded-lg py-2 text-white"
              type="button"
              tabIndex={10}
            >
              {spinnerCheck ? <Spinner /> : "Save Category"}
            </button>
          </div>
        </div>
      </form>
      <form className={`${editFormUpdate}  bg-white p-6`}>
        <div>
          <div>
            <div className="my-2">
              <label className="font-bold">Update Category</label>
              <div className=" my-2 flex ">
                <input
                  type="text"
                  onChange={updateNewCategory}
                  className="mr-5 border-slate-300"
                  name="name"
                  placeholder="Enter Category Name"
                  tabIndex={1}
                  defaultValue={categoryToEdit.name}
                />
              </div>
            </div>
          </div>

          <div className="my-2">
            <button
              onClick={() => {
                updateOneCategory();
                setEditFormUpdate("hidden");
                setCreateForm("block");
              }}
              className="bg-blue-600 px-10 rounded-lg py-2 text-white"
              type="button"
              tabIndex={10}
            >
              Update
            </button>
          </div>
        </div>
      </form>
      <div className="p-6 bg-white">
        {allCategory.length === 0 ? (
          <div>No Category Found</div>
        ) : (
          allCategory.map((cate, key) => {
            return (
              <div
                className={`${
                  Category.length === key + 1 ? "border-b" : ""
                } w-full border-slate-400	border-t  rounded-10 p-6`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{cate.name}</span>
                  <span></span>
                  <span className="flex items-center justify-between  ">
                    <span
                      onClick={() => {
                        setCategoryToEdit(cate);
                        setEditFormUpdate("block");
                        setCreateForm("hidden");
                      }}
                      className="py-2 px-3 rounded bg-blue-600 text-white font-bold ml-5"
                    >
                      Edit
                    </span>
                    <span
                      onClick={() => {
                        deleteCategory(cate);
                      }}
                      className="py-2 px-3 rounded bg-red-600 text-white font-bold ml-5"
                    >
                      Delete
                    </span>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}
