import React, { useEffect } from "react";
import NavbarHeader from "./NavbarHeader";
import toast, { Toaster } from "react-hot-toast";
export default function Layout(props) {
  return (
    <>
      {/* <NavbarHeader /> */}
      {props.children}
      <Toaster />
    </>
  );
}
