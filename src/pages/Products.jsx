import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000/api/products";
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const resp = await fetch(url);
      const data = await resp.json();
      // console.log(data.data);
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const resp = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      })
      if (!resp.ok) {
        toast.error(data.message || "Failed to delete a product");
        return;
      }
      toast.success("Product deleted");

      setProducts((prev) => prev.filter((p) => p._id !== id))

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="my-5 py-5">
      {loading && <p>Loading...</p>}
      <Link to={"/home"}><h3 className="font-bold my-3 text-3xl text-cyan-800 p-3 hover:text-cyan-500 transition-colors">Products</h3></Link>
      <span className="  p-3 font-semibold text-3xl text-cyan-800 hover:text-cyan-500">
        <Link to={"/profile"}>Profile</Link>
      </span>
      {
        products ? <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-3 mt-4">
          {products.map((product) => {
            return <ProductCard key={product._id} item={product} onDelete={handleDelete} />
          })}
        </div> : null
      }
    </div>
  );
};

export default Products;
