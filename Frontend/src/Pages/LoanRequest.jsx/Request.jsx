import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "../Loading";

function Request() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [request, setrequest] = useState("");

  // Dummy data for loan requests

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("_id");

    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/loan/getrequests",
          { token }
        );
        //console.log(response);
        setrequest(response.data.data);
        setloading(false);
      } catch (err) {
        console.log(err);

        navigate("/login");
      }
    };

    fetchdata();
  }, []);

  const dummyRequests = [
    {
      id: 1,
      userName: "John Doe",
      amount: 10000,
      term: 3,
    },
    {
      id: 2,
      userName: "Jane Smith",
      amount: 8000,
      term: 2,
    },
    {
      id: 3,
      userName: "Alice Johnson",
      amount: 15000,
      term: 4,
    },
  ];

  const handleApprove = async (id) => {
    // console.log(`Loan request ${requestId} has been approved.`);
    setloading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/loan/approve",
        { id, token }
      );
      toast.success(response.data.message);

      setloading(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
      navigate("/admin/request");
    }
  };

  const handleReject = (requestId) => {
    // Implement the logic to reject the loan request with the given requestId
    // You may need to send a request to your backend for this action
    console.log(`Loan request ${requestId} has been rejected.`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-[2rem] mb-5">Admin Dashboard</h1>
          <hr className="bg-black h-1" />
          <h1 className="text-2xl font-semibold text-center mb-6 bg-transparent mt-6">
            Loan Requests
          </h1>
          {request.length == 0 ? (
            <div className="h-[60vh] text-4xl flex justify-center items-center text-gray-400">
              No Requests yet
            </div>
          ) : (
            ""
          )}
          <div className="grid gap-4 bg-transparent">
            {request.map((request, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded shadow-lg flex gap-2 justify-around items-center flex-wrap"
              >
                <div className="bg-white w-[25vw]">
                  <strong className="bg-white">User ID:</strong>{" "}
                  {request.userid}
                </div>
                <div className="bg-white w-[20vw]">
                  <strong className="bg-white">Loan Amount:</strong> RS.
                  {request.amount}
                </div>
                <div className="bg-white w-[20vw]">
                  <strong className="bg-white">Loan Term:</strong>{" "}
                  {request.term} weeks
                </div>
                <button
                  onClick={() => handleApprove(request._id)}
                  className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Request;
