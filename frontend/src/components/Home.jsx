import React from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { base } from "../baseUrl.js";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleLoggedIn } from "../features/userSlice.js";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;

  const logout = async () => {
    try {
      const response = await axios.post(`${base}/users/logout`);
      toast.success(response.data.message);
      navigate("/login");
      Cookies.remove("aToken");
      dispatch(toggleLoggedIn(false));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl lg:text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <NavLink
            to={"/user-details"}
            className={`link link-hover underline-offset-2 underline hover:text-primary`}
          >
            View User Details
          </NavLink>
          <br />
          <button onClick={logout} className="btn btn-primary mt-8">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
