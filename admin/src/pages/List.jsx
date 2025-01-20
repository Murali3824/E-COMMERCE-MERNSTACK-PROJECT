import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.products) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success('Product removed!');
        await fetchList();
      } else {
        toast.error(response.data.message || 'Failed to remove product.');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full md:px-4">
      <h2 className="mb-6 font-bold text-2xl text-center text-gray-800">
        Product Inventory
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-6">
        {list.length > 0 ? (
          list.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition duration-200"
            >
              <img
                className="w-full h-40 object-cover rounded-lg mb-4"
                src={item.image[0]}
                alt={item.name}
              />
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-lg text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  Category: {item.category}
                </p>
                <p className="text-lg font-bold text-gray-800">
                  {currency}
                  {item.price}
                </p>
              </div>
              <button
                onClick={() => removeProduct(item._id)}
                className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition duration-200"
              >
                Remove Product
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
