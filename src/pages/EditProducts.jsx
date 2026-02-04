
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProducts = () => {
    const { id } = useParams();
    // console.log("id", id)
    const [productDetails, setProductDetails] = useState({
        name: "",
        price: "",
        image: "",
    });
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name);
        // console.log(value);
        setProductDetails({ ...productDetails, [name]: value });
    };
    // console.log(productDetails);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSend = {
            name: productDetails.name,
            price: Number(productDetails.price),
            image: productDetails.image,
        };
        console.log(dataToSend);
        try {
            setLoading(true);
            const resp = await fetch(`https://mern-authentication-backend-1.onrender.com/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
            const data = await resp.json();
            console.log(data.message);
            if (!resp.ok) {
                toast.error(data.message || "Failed to add a product");
                return;
            }
            toast.success(data.message);
            setTimeout(() => {
                navigate("/products");
            }, 1500);
            setLoading(false);
        } catch (error) {
            console.log("fetching is failed", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            const resp = await fetch(`https://mern-authentication-backend-1.onrender.com/api/products/${id}`);
            const data = await resp.json();
            // console.log(data.data)

            setProductDetails({
                name: data.data.name || "",
                price: data.data.price || "",
                image: data.data.image || "",
            })
        }
        fetchProduct()
    }, [id])

    return (
        <div className="flex h-screen justify-center items-center flex-col">
            <h1 className="text-4xl mb-5 font-semibold">Edit Product</h1>
            <div className="">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block">Name</label>
                        <input
                            className="w-full ring-2 ring-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 px-4"
                            type="text"
                            onChange={handleChange}
                            value={productDetails?.name}
                            name="name"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block">Price</label>
                        <input
                            className="w-full ring-2 ring-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 px-4"
                            type="number"
                            onChange={handleChange}
                            value={productDetails?.price}
                            name="price"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div>
                        <label className="block">Image</label>
                        <input
                            className="w-full ring-2 ring-gray-500 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 px-4"
                            type="text"
                            onChange={handleChange}
                            value={productDetails?.image}
                            name="image"
                            placeholder="Enter Product image"
                        />
                    </div>
                    <div className="w-full">
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-black text-white w-full py-2 hover:bg-gray-900"
                        >
                            {loading ? "Modifying Details..." : "Update Product"}
                        </button>
                    </div>
                    <div>
                        <p>
                            if You want to go back?{" "}
                            <span className="text-blue-500 hover:text-blue-800">
                                <Link to={"/products"}>Products</Link>
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProducts;
