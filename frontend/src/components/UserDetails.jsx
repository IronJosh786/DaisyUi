import axios from "axios";
import { toast } from "sonner";
import { base } from "../baseUrl";
import React, { useEffect, useState } from "react";

function UserDetails() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base}/users/get-user-details`, {
          withCredentials: true,
        });
        setDetails({
          username: response.data.data.username,
          email: response.data.data.email,
        });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src="https://images.unsplash.com/photo-1528834342297-fdefb9a5a92b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Shoes"
            className="rounded"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{details.username || "username"}</h2>
          <p>{details.email || "email"}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
