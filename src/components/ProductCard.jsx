import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';


const ProductCard = ({ item, onDelete }) => {

    return (
        <div className='bg-gray-100 shadow-lg hover:shadow-2xl transition-shadow text-black rounded-md flex flex-col gap-y-2 w-fit p-2 m-2'>
            <div>
                <img className='w-[250px] h-[200px] object-cover rounded-md' src={item.image} alt={item.name} />
            </div>
            <h3 className='font-semibold text-xl capitalize'>{item.name}</h3>
            <p className='text-gray-900 font-mono'>₹<span className='ml-0.5'>{item.price}</span></p>
            <div className='flex gap-x-1.5 mb-1'>
                <Link to={`/editproduct/${item._id}`}>
                    <div className='bg-blue-500 hover:bg-gray-300 transition-colors hover:text-blue-500 p-2 text-white rounded-md'>
                        <CiEdit size={20} />
                    </div>
                </Link>
                <div className='bg-red-500 hover:bg-gray-300 transition-colors hover:text-red-500 p-2 text-white rounded-md'>
                    <MdDelete onClick={() => { onDelete(item._id) }} size={20} />
                </div>
            </div>
        </div>
    )
}

export default ProductCard