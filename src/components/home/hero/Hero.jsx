import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Hero = () => {
  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   console.log("Search");
  // };

  return (
    <div className="flex flex-col text-center sm:flex-col sm:text-left md:flex-col md:text-left lg:flex-row lg:text-left xl:flex-row xl:text-left justify-evenly items-center mt-3 mb-2">
      <div>
        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold w-96 text-blue-600 mb-6">
          Spot Store by VITspot Buy & Sell Items
        </h1>
        <p className="w-80 text-gray-400 mb-6">
          Buy & Sell items like books, electronics, cycles etc in VIT using Spot
          Store
        </p>
        <div>
          <Button
            className="w-full lg:w-fit xl:w-fit"
            gradientDuoTone="purpleToBlue"
            as={Link}
            to={"/products"}
          >
            Checkout Products
          </Button>
        </div>
        {/* <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg
              className="w-[18px] h-[18px] text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              id="input-group-1"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Eg - Dumbbells"
            />
          </form>
        </div> */}
      </div>
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/spot-store-37a5a.appspot.com/o/spot-store-assets%2Fimages%2Fhero-image.svg?alt=media&token=3782a389-d1bc-4843-8741-fe57fa94628a"
          alt="hero logo"
          width="450px"
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default Hero;
