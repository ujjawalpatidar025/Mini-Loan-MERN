import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/isAuthenticated",
          { token }
        );

        if (!response.data.others) {
          navigate("/login");
        } else {
          const user = response.data.others;
          if (response.data.others.isAdmin) {
            navigate("/admin/request");
          }
          localStorage.setItem("_id", user._id);
          setloading(false);
        }
      } catch (err) {
        console.log(err.response.data.message);

        navigate("/login");
      }
    };

    fetchdata();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("_id");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <div className="bg-white">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex bg-white justify-between items-center w-[90vw] m-auto h-20">
            <h1 className="text-4xl font-bold bg-white">MINI LOAN APP</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-slate-500 rounded-md text-white"
            >
              Signout
            </button>
          </div>
          <hr />

          <div className="flex justify-center items-center h-[85vh] gap-7 bg-white">
            <Link to="/create-loan">
              <button className="p-5 border-gray-800 border rounded-lg bg-white hover:bg-gray-200">
                Create Loan
              </button>
            </Link>
            <Link to="/applied-loan">
              <button className="p-5 border-gray-800 border rounded-lg bg-white hover:bg-gray-200">
                View Loan
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
