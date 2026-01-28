import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home from "../pages/Home";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchProfile = async () => {
      try {
        const resp = await fetch("http://localhost:3000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!resp.ok) {
          throw new Error("unauthorized");
        }
        const data = await resp.json();
        setUser(data.user);
        // console.log(data.user);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  const handleLogOut = () => {
    console.log("logout")
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="p-6 w-max container flex flex-col gap-y-2">

      <h1 className="font-semibold text-gray-500 text-3xl my-5">Profile</h1>
      <div className="flex flex-col justify-center items-center ring-4 ring-gray-300 rounded-2xl">
        <div className="flex flex-col gap-y-2 bg-gray-100 p-5 rounded-2xl shadow-2xl hover:shadow-gray-500 w-full transition-colors duration-300">
          <p className="font-bold text-2xl text-cyan-800">{user?.name}</p>
          <p className="font-semibold text-xl text-gray-800">{user?.email}</p>
          {/* <p className="text-2xl text-blue-500 hover:text-blue-800 cursor-pointer">
            <Link to={"/home"}>Back to Home</Link>
          </p> */}
          <div>
            <button onClick={handleLogOut} className="bg-red-500 hover:bg-red-600 transition-colors cursor-pointer text-white px-4 pb-2 pt-1 rounded-xl font-semibold text-xl">Logout</button>
          </div>
        </div>

      </div>

      <Home />
    </div>
  );
};

export default Profile;
