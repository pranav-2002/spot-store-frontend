import React from "react";
import ProductHeroImage from "../../../assets/images/product-hero.jpg";
import { Button } from "flowbite-react";

const ProductsHero = () => {
  return (
    <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row-reverse xl:flex-row-reverse items-center justify-evenly">
      <div>
        <h1 className="text-3xl font-bold w-96 text-blue-600 mb-6">
          Selling On Campus Made Easy By Spot Store
        </h1>
        <p className="w-80 text-gray-400 mb-6">
          Not using the products that you bought anymore? List your products on
          Spot Store and sell them easily
        </p>
        <Button
          className="w-full lg:w-fit xl:w-fit"
          gradientDuoTone="purpleToBlue"
        >
          Sell your product
        </Button>
      </div>
      <div>
        <img
          src={ProductHeroImage}
          alt="hero logo"
          width="425px"
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default ProductsHero;
