import React from "react";
import Login from "./Login";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function Auth() {
  const { isLoggedIn } = useSelector((state) => state.user);
  let token = Cookies.get("aToken") || isLoggedIn;
  return token ? <Outlet /> : <Login />;
}

export default Auth;
