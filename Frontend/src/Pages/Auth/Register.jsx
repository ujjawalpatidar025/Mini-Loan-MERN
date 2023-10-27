import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
      name: name,
    };
    try {
      console.log(email, password);
      const response = await axios.post(
        "http://localhost:4000/api/users/signup",
        data
      );
      toast.success("Register Success");
      localStorage.setItem("_id", response.data.others._id);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h1 className=" bg-white text-2xl font-semibold text-center mb-6">
          Register
        </h1>
        <form onSubmit={handleRegister} className="bg-white">
          <div className=" bg-white mb-4">
            <label
              htmlFor="name"
              className="block bg-white text-gray-600 text-sm font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white p-2 border border-gray-300 rounded"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 bg-white">
            <label
              htmlFor="email"
              className="block  text-gray-600 bg-white text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border bg-white border-gray-300 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 bg-white">
            <label
              htmlFor="password"
              className="block bg-white text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 bg-white border border-gray-300 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2  bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="bg-white py-3">
          <p className="bg-white">
            Already having Account{" "}
            <Link to="/login" className="font-bold hover:underline  bg-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
