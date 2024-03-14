import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Layout from "./Layout";

export default function Redirecting() {
  const navigate = useNavigate();
  const [count, setCount] = useState(4);
  useEffect(() => {
    const temp = setInterval(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      navigate("/signup");
      return () => clearInterval(temp);
    }
  }, [count]);
  return (
    <Layout>
      <div className=" flex justify-center  loading-container m-4">
        <span>
          <div className="flex justify-center items-center h-full  loading"></div>
          <p className="text-lg font-bold text-black flex justify-center">
            Redirecting in {count} seconds
          </p>
        </span>
      </div>
    </Layout>
  );
}
