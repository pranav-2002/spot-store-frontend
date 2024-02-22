import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, imageUrl }) => {
  return (
    <div className="mr-6 flex-none w-72">
      <Card className="h-full">
        <img
          src={imageUrl}
          alt="Product Image"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <a href="#">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{price}
            </span>
            <Link to={`/product/${id}`}>
              <Button size={"xs"} color="blue">
                View more
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
