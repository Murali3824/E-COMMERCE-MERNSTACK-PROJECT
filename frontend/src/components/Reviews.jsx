import React from 'react';

const Reviews = () => {
  return (
    <div className="container my-14 sm:mx-auto sm:p-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        
        {/* Rating Section */}
        <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800">Customer Ratings</h2>
          <div className='flex items-center mt-2 gap-6'>
            <div className="flex flex-col gap-4 items-center mt-2">
              <div className='flex items-center gap-2'>
              <span className="text-6xl font-bold text-green-600">5</span>
              <span className="text-4xl text-green-600 ml-1">★</span>
              </div>
              <p className="ml-2 text-gray-500">2 Verified Buyers <span className="text-green-600">✔</span></p>
            </div>

            {/* Star rating breakdown */}
            <div className=" w-full mt-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center mb-2">
                  <div className='flex items-center gap-[5px]'>
                    <span className="font-medium text-gray-700">{star}</span>
                    <span className="text-xl text-green-600 ml-1">★</span>
                  </div>
                  <div className="w-full h-2 ml-2 bg-gray-300 rounded-full">
                    {star === 5 && (
                      <div className="h-2 bg-green-600 rounded-full" style={{ width: '100%' }}></div>
                    )}
                  </div>
                  <span className="ml-2 text-gray-600">{star === 5 ? 2 : 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="w-full md:w-2/3 bg-white shadow-md rounded-lg p-6">
          <div className='flex flex-col sm:flex-row gap-4 justify-between sm:items-center'>
            <h3 className=" text-xl font-semibold text-gray-800">What Our Customers Say</h3>
            <button className="bg-black font-normal text-white py-2 px-6 rounded-lg shadow hover:bg-gray-700 transition duration-200">
              WRITE A PRODUCT REVIEW
            </button>
          </div>

          <p className="text-gray-700 font-medium my-4">Images uploaded by customers:</p>

          {/* Review Card 1 */}
          <div className="mb-4 p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <span className="text-lg font-bold text-green-600">5.0 ★</span>
              <span className="ml-2 text-gray-700 font-semibold">Sirisha</span>
              <span className="ml-4 text-gray-400">17 Sep, 2024</span>
            </div>
            <p className="text-gray-600 mt-2">Super</p>
          </div>

          {/* Review Card 2 */}
          <div className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center">
              <span className="text-lg font-bold text-green-600">5.0 ★</span>
              <span className="ml-2 text-gray-700 font-semibold">Rohit</span>
              <span className="ml-4 text-gray-400">27 May, 2024</span>
            </div>
            <p className="text-gray-600 mt-2">Awesome <br /> Quality and design too good</p>
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6">
        
      </div>
    </div>
  );
};

export default Reviews;
