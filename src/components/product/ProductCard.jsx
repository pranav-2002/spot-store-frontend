import React from "react";
import { Button, Card } from "flowbite-react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, imageUrl, ownerMode }) => {
  return (
    <div className="mr-6 flex-none w-72">
      <Card className="h-full">
        <img
          src={imageUrl}
          alt="Product Image"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ₹{price}
            </span>
            <Button as={Link} to={`/product/${id}`} size={"xs"} color="blue">
              View more
            </Button>
          </div>
        </div>
        {ownerMode && (
          <>
            <Button
              size={"xs"}
              color="light"
              as={Link}
              to={`/product/edit/${id}`}
            >
              Edit Details
            </Button>
            <Button size={"xs"} color="success">
              Mark as sold
            </Button>
            <Button size={"xs"} color="failure">
              Delete Product
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default ProductCard;
