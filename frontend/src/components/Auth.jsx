import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import Cookies from "js-cookie";

function Auth() {
  const token = Cookies.get("token");
  if (token) {
    return <Outlet />;
  } else {
    return <Login />;
  }
}

export default Auth;
