import React from "react";
import HeroImage from "../../../assets/images/hero-image.svg";

const Hero = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search");
  };

  return (
    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-evenly items-center">
      <div>
        <h1 className="text-4xl font-bold w-96 text-blue-600 mb-6">
          Spot Store by VITspot Buy & Sell Items
        </h1>
        <p className="w-80 text-gray-400 mb-6">
          Buy & Sell items like books, electronics, cycles etc in VIT using Spot
          Shop
        </p>
        <div className="relative mb-6">
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
        </div>
      </div>
      <div>
        <img src={HeroImage} alt="hero logo" width="450px" className="mt-4" />
      </div>
    </div>
  );
};

export default Hero;
