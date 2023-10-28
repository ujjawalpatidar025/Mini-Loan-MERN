import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { useParams } from "react-router-dom";

function Installments() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [data, setdata] = useState("");
  const [modal, setmodal] = useState(false);

  // Dummy data for loan requests
  const params = useParams();
  const handleModal = async (installmentid, loanid) => {
    setloading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:4000/api/loan/payment",
        { token, installmentid, loanid }
      );

      window.location.reload();
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

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
    const id = params.id;

    const fetchdata = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/loan/getloanid",
          { token, id }
        );

        if (!response.data.data) {
          navigate("/");
        } else {
          setdata(response.data.data);

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
        <div>
          <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-semibold text-center mb-6 bg-transparent">
              Loan Installments
            </h1>

            <div className="grid gap-4 bg-transparent">
              <div className="bg-white p-4 rounded shadow-lg flex gap-2 justify-around items-center flex-wrap">
                <div className="bg-white w-[20vw]">
                  <strong className="bg-white">Loan Amount:</strong>{" "}
                  {data.amount}
                </div>
                <div className="bg-white w-[20vw]">
                  <strong className="bg-white">Loan Term:</strong>
                  {data.term} weeks
                </div>
                <button
                  className={`mt-2 p-2 font-bold  rounded ${
                    data.status == `Pending`
                      ? `text-red-600`
                      : data.status == `Paid`
                      ? `text-green-500`
                      : `text-yellow-600`
                  }`}
                >
                  {data.status}
                </button>
              </div>
            </div>
            {data.status == "Pending" ? (
              <h2 className="mt-5 text-red-500 font-bold ">
                *You cannot pay any installments [ need approval from the admin
                side ]
              </h2>
            ) : (
              ""
            )}
            <div className="grid gap-4 bg-transparent mt-20 h-[60vh] overflow-y-scroll">
              {data.installments.map((request, index) => (
                <div
                  key={request.id}
                  className="bg-white p-4 rounded shadow-lg flex gap-2 h-20 justify-around items-center flex-wrap"
                >
                  <div className="bg-white w-[20vw]">
                    <strong className="bg-white">Installment No.: </strong>
                    {index + 1}
                  </div>
                  <div className="bg-white w-[20vw]">
                    <strong className="bg-white">Installment Amount :</strong>{" "}
                    {"RS.  "}
                    {request.am}
                  </div>
                  <div className="bg-white w-[20vw]">
                    <strong className="bg-white">Scheduled Dates :</strong>{" "}
                    {request.dt}
                  </div>
                  <div
                    className={`mt-2 p-2  font-bold  rounded  ${
                      request.status == `Pending`
                        ? `text-red-500`
                        : `text-green-500`
                    }`}
                  >
                    {request.status}
                  </div>

                  <button
                    index={request._id}
                    onClick={() => handleModal(request._id, data._id)}
                    disabled={
                      data.status === `Pending` || request.status === "Paid"
                    }
                    className={`ml-2 mt-2 p-1 px-5 border-2  border-gray-400 text-gray-500 rounded hover:bg-gray-200 ${
                      request.status == `Paid` ? `hidden` : ``
                    }`}
                  >
                    Pay
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Installments;
