import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name);
    // console.log(value);
    setLoginData({ ...loginData, [name]: value });
  };
  // console.log(registerData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await resp.json();
      console.log(data.message);
      if (!resp.ok) {
        setLoading(false);
        toast.error(data.message || "Login failed");
        return;
      }
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      setTimeout(() => {
        navigate("/");
      }, 1500);
      setLoading(false);
    } catch (error) {
      console.log("fetching is failed", error);
      setLoading(false);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <h1 className="text-4xl mb-5 font-semibold">Login</h1>
      <div className="">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block">Email</label>
            <input
              className="w-full ring-2 ring-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 px-4"
              type="text"
              onChange={handleChange}
              // value={registerData.email}
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block">Password</label>
            <input
              className="w-full ring-2 ring-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 px-4"
              type="text"
              onChange={handleChange}
              // value={registerData.password}
              name="password"
              placeholder="Enter your Password"
            />
          </div>
          <div className="w-full">
            <button
              disabled={loading}
              type="submit"
              className="bg-black text-white w-full py-2 hover:bg-gray-900"
            >
              {loading ? "checking..." : "login"}
            </button>
          </div>
          <div>
            <p>
              You don't have an account?{" "}
              <span className="text-blue-500 hover:text-blue-800">
                <Link to={"/signup"}>Register</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
