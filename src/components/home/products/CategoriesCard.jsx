import React from "react";
import { Card } from "flowbite-react";

const CategoriesCard = ({ title, description, imageUrl }) => {
  return (
    <div className="max-w-xs mb-8 mt-4 cursor-pointer transform transition duration-500 hover:scale-105">
      <Card className="h-full">
        <img
          src={imageUrl}
          alt="Image describing the category of the products"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h5 className="text-2xl font-bold text-blue-600 tracking-tight">
            {title}
          </h5>
          <p className="font-normal text-gray-700">{description}</p>
        </div>
      </Card>
    </div>
  );
};

export default CategoriesCard;
