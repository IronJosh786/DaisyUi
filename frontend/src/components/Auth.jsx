import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function Auth() {
  const { isLoggedIn } = useSelector((state) => state.user);
  let token = Cookies.get("aToken") || isLoggedIn;
  if (!token) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
