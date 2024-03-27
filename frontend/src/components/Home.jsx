import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { base } from "../baseUrl.js";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toggleLoggedIn } from "../features/userSlice.js";
import { useDispatch } from "react-redux";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const logout = async () => {
    try {
      const response = await axios.post(`${base}/users/logout`);
      toast.success(response.data.message);
      navigate("/login");
      dispatch(toggleLoggedIn(false));
      Cookies.remove("aToken");
    } catch (error) {
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
          <button onClick={logout} className="btn btn-primary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
