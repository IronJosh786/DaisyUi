import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { base } from "../baseUrl.js";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toggleLoggedIn } from "../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice.js";

function Home() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    const html = document.querySelector("html");
    if (darkMode) {
      html.setAttribute("data-theme", "business");
    } else {
      html.setAttribute("data-theme", "corporate");
    }
  }, [darkMode]);

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
          <NavLink
            to={"/user-details"}
            className={`link link-hover underline-offset-2 underline hover:text-primary`}
          >
            View User Details
          </NavLink>
          <br />
          <div className="text-2xl mt-4">
            {darkMode ? (
              <button onClick={changeTheme}>
                <i className="ri-sun-line"></i>
              </button>
            ) : (
              <button onClick={changeTheme}>
                <i className="ri-moon-line"></i>
              </button>
            )}
          </div>
          <br />
          <button onClick={logout} className="btn btn-primary mt-4">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
