import React, { useState } from "react";
import ProductCard from "./ProductCard";

const AllProducts = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault;
  };

  return (
    <div>
      <div className="bg-slate-50 pb-8 mb-6">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">
            Search for the products you're looking for !
          </h1>
        </div>
        <div className="mx-auto max-w-4xl">
          <form onSubmit={handleSearch}>
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="productPageWrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mx-auto max-w-xs sm:max-w-2xl md:max-w-2xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-5xl mt-8">
        <ProductCard
          id="1"
          name="Mac Book Pro 16 inches 128Tb 1"
          price="50000"
          imageUrl="https://images.hindustantimes.com/tech/img/2021/09/14/1600x900/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg"
        />
        <ProductCard
          id="2"
          name="Branded new cycle for sale in VIT"
          price="8000"
          imageUrl="https://apollo.olx.in/v1/files/7obd0fwvtyf01-IN/image;s=780x0;q=60"
        />
        <ProductCard
          id="3"
          name="Brand New Watch with water resistance"
          price="4576"
          imageUrl="https://apollo.olx.in/v1/files/rpeng8x7thmx-IN/image;s=780x0;q=60"
        />
        <ProductCard
          id="4"
          name="Mac Book Pro 16 inches 128Tb 1"
          price="50000"
          imageUrl="https://images.hindustantimes.com/tech/img/2021/09/14/1600x900/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg"
        />
        <ProductCard
          id="5"
          name="Branded new cycle for sale in VIT"
          price="8000"
          imageUrl="https://apollo.olx.in/v1/files/7obd0fwvtyf01-IN/image;s=780x0;q=60"
        />
        <ProductCard
          id="6"
          name="Brand New Watch with water resistance"
          price="5023"
          imageUrl="https://apollo.olx.in/v1/files/rpeng8x7thmx-IN/image;s=780x0;q=60"
        />
      </div>
    </div>
  );
};

export default AllProducts;
