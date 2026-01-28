import React from "react";
import Profile from "../components/Profile";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {

  return (
    <div>
      <h1 className="font-semibold text-gray-500 text-3xl my-5">Home</h1>
      <p className="text-3xl text-blue-500 hover:text-blue-800 my-5 cursor-pointer">
        <Link to={"/profile"}>Click to see you Profile</Link>
      </p>
      <p className="text-3xl text-blue-500 hover:text-blue-800 my-5 cursor-pointer">
        <Link to={"/products"}>Click to see all products</Link>
      </p>
      <p className="text-3xl text-blue-500 hover:text-blue-800 my-5 cursor-pointer">
        <Link to={"/addproduct"}>Add new products</Link>
      </p>

    </div>
  );
};

export default Home;
