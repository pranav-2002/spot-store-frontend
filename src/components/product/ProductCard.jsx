import React, { useState } from "react";
import { Button, Card, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  deleteAProduct,
  markProductAsSold,
} from "../../api/requests/products/products";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ id, name, price, imageUrl, sold, ownerMode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const token = Cookies.get("token");

  const deleteProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await deleteAProduct(id, token);
      toast.success("Product Deleted. Please refresh the page");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const markAsSold = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await markProductAsSold({ productId: id }, token);
      toast.success("Marked As Sold. Please refresh the page");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(error);
    }
  };

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
            <Button
              size={"xs"}
              color="success"
              onClick={markAsSold}
              disabled={sold}
            >
              {isLoading ? (
                <>
                  <Spinner
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                  <span className="pl-3">Please wait...</span>
                </>
              ) : (
                <> Mark as sold</>
              )}
            </Button>
            <Button size={"xs"} color="failure" onClick={deleteProduct}>
              {isLoading ? (
                <>
                  <Spinner
                    aria-label="Alternate spinner button example"
                    size="sm"
                  />
                  <span className="pl-3">Please wait...</span>
                </>
              ) : (
                <>Delete Product</>
              )}
            </Button>
          </>
        )}
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
  );
};

export default ProductCard;
