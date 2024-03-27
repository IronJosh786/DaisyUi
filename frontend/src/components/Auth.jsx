import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import Cookies from "js-cookie";

function Auth() {
  const token = Cookies.get("aToken");
  if (!token) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
