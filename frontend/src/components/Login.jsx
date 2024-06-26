import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { base } from "../baseUrl.js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toggleLoggedIn } from "../features/userSlice.js";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(`${base}/users/login`, userDetails);
      toast.success(response.data.message);
      dispatch(toggleLoggedIn(true));
      Cookies.set("aToken", response.data.data.accessToken, {
        expires: 1,
        path: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl lg:text-5xl font-bold">Login now!</h1>
          <p className="py-6 max-w-[60ch]">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit} className="card-body p-2 md:p-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                id="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                id="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <label className="label text-center">
              <p className="label-text-alt">
                Don't have an account?
                <NavLink
                  to={"/signup"}
                  className={"link link-hover underline-offset-2"}
                >
                  {" "}
                  Sign Up
                </NavLink>
              </p>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
