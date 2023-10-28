import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [name, setname] = useState("");
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
          setname(user.name);
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
            <h1 className="text-4xl  text-gray-500  bg-white">
              <span className="font-bold">M</span>ini{" "}
              <span className="font-bold">L</span>oan{" "}
              <span className="font-bold">A</span>pp
            </h1>
            <button
              onClick={handleLogout}
              className="px-3 py-2 border-1 bg-gray-300 border-gray-500 rounded-md text-gray-600 hover:bg-gray-400 hover:text-white"
            >
              Signout
            </button>
          </div>
          <hr />
          <div className="pt-10 ">
            <h2 className="text-2xl mb-5 text-center text-gray-500">
              <span className="text-3xl font-bold">W</span>elcome!!!
            </h2>
            <h2 className="text-center text-gray-500 text-4xl font-bold">
              {name}
            </h2>
          </div>

          <div className="flex justify-center items-center h-[70vh] gap-7 bg-white">
            <Link to="/create-loan">
              <button className="p-5 border-gray-800 border rounded-full bg-white h-32 w-32 text-gray-700 hover:scale-105 ease-in-out hover:bg-gray-200 font-semibold">
                Create Loan
              </button>
            </Link>
            <Link to="/applied-loan">
              <button className="p-5  border-gray-800 border rounded-full  font-semibold text-gray-700 hover:scale-105 ease-in-out h-32 w-32 bg-white hover:bg-gray-200">
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
