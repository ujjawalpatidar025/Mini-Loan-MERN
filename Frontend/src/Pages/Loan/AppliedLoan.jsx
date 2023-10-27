import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Loading from "../Loading";

function AppliedLoan() {
  const navigate = useNavigate();
  // Dummy data for loan requests
  const [loading, setloading] = useState(true);
  const [loans, setloans] = useState("");
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("_id");

    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/loan/getloans",
          { token }
        );

        if (!response) {
          navigate("/");
        } else {
          const all = response.data.data;
          const arr = Object.values(all).filter((item) => {
            if (id === item.userid) return item;
          });
          setloans(arr);
          setloading(false);
        }
      } catch (err) {
        console.log(err);

        navigate("/");
      }
    };

    fetchdata();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-100 p-8">
          <h1 className="text-2xl font-semibold text-center mb-6 bg-transparent">
            View Loans
          </h1>
          <hr />
          <div className="grid gap-4 bg-transparent">
            {loans.length == 0 ? (
              <div className="h-[80vh] text-4xl flex justify-center items-center text-gray-400">
                No Applied Loans Yet
              </div>
            ) : (
              ""
            )}
            {loans.length >= 1 &&
              loans.map((request) => (
                <div
                  key={request._id}
                  className="bg-white p-4 rounded shadow-lg flex gap-2 justify-around items-center flex-wrap"
                >
                  <div className="bg-white w-[20vw]">
                    <strong className="bg-white">Loan Amount:</strong> $
                    {request.amount}
                  </div>
                  <div className="bg-white w-[20vw]">
                    <strong className="bg-white">Loan Term:</strong>{" "}
                    {request.term} weeks
                  </div>
                  <button
                    className={`mt-2 p-2 font-bold text-white rounded ${
                      request.status == `Pending`
                        ? `text-red-600`
                        : request.status == `Paid`
                        ? `text-green-500`
                        : `text-yellow-500`
                    }`}
                  >
                    {request.status}
                  </button>

                  <Link
                    to={`/installments/${request._id}`}
                    className="ml-2 mt-2 p-2 text-black rounded hover:underline"
                  >
                    View Installments
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AppliedLoan;
