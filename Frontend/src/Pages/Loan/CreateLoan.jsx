import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Loading from "../Loading";

function CreateLoan() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [term, setTerm] = useState("");
  const [loading, setloading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const token = localStorage.getItem("token");
    const _id = localStorage.getItem("_id");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/loan/create",
        { amount, term, _id, token }
      );

      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      console.log(err);

      navigate("/");
    }
  };
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

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="h-screen  w-[35vw] mx-auto my-auto p-8">
          <h1 className="text-4xl mt-20 text-neutral-400  text-center mb-6 ">
            <span className="font-bold text-neutral-400">C</span>reate{" "}
            <span className="font-bold text-neutral-400">L</span>oan
          </h1>
          <hr />

          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-5 bg-white p-8 rounded "
          >
            <div className="mb-4 bg-white">
              <label
                htmlFor="amount"
                className="block bg-white text-gray-600 text-sm font-medium mb-2"
              >
                Loan Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                min="10000"
                className="w-full focus:outline-none focus:ring-gray-400 focus:ring-2  bg-white p-2 border border-gray-300 rounded"
                placeholder="Loan Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 bg-white">
              <label
                htmlFor="term"
                className="block bg-white text-gray-600 text-sm font-medium mb-2"
              >
                Loan Term (in weeks)
              </label>
              <input
                type="number"
                id="term"
                name="term"
                max={amount}
                min="1"
                className="w-full focus:outline-none focus:ring-gray-400 focus:ring-2  bg-white p-2 border border-gray-300 rounded"
                placeholder="Loan Term"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                required
              />
              <p className="bg-white text-sm text-gray-600">
                *Must be smaller than the amount
              </p>
            </div>
            <button
              type="submit"
              className="w-full p-2 border-2 border-gray-400 text-gray-500 text-lg rounded hover:bg-gray-200 "
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CreateLoan;
