import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCarousel from "./ProductCarousel";
import { Button } from "flowbite-react";
import { getProductData } from "../../api/requests/products/products";
import Loader from "../utils/Loader";
import { getUserById } from "../../api/requests/users/user";

const ProductDetails = () => {
  window.scrollTo(0, 0);

  const [productData, setProductData] = useState({});
  const [ownerName, setOwnerName] = useState("");

  const params = useParams();

  const fetchProductData = async () => {
    try {
      const results = await getProductData(params.productId);
      setProductData(results.product);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserData = async () => {
    try {
      if (productData.owner_id) {
        const user = await getUserById(productData.owner_id);
        setOwnerName(user.user.firstName + " " + user.user.lastName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [productData.owner_id]);

  function formatDate(dateString) {
    // Create a Date object from the MongoDB date string
    const mongoDate = new Date(dateString);

    // Extract day, month, and year components
    const day = mongoDate.getDate().toString().padStart(2, "0");
    const month = (mongoDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1
    const year = mongoDate.getFullYear().toString();

    // Concatenate components in "dd/mm/yyyy" format
    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }

  return (
    <section className="bg-slate-50 pb-6">
      {Object.keys(productData).length && ownerName.length > 0 ? (
        <div>
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-10">
            <h1 className="mb-2 text-xl font-bold leading-none text-blue-600 md:text-2xl dark:text-white">
              {productData.title}
            </h1>
            <p className="mb-4 text-xl font-bold leading-none text-blue-600 md:text-2xl dark:text-white">
              ₹{productData.price}
            </p>
            <dl>
              <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Details
              </dt>
              <dd className="mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-400">
                {productData.description}
              </dd>
            </dl>
          </div>

          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-evenly">
            <ProductCarousel productImages={productData.images} />
            <div className="ml-10 lg:ml-0 xl:ml-0 2xl:ml-0">
              <dt className="mb-2 font-semibold leading-none text-blue-600 dark:text-white">
                Status
              </dt>
              <dd className="mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-400">
                {productData.sold ? "Sold" : "Available"}
              </dd>
              <dt className="mb-2 font-semibold leading-none text-blue-600 dark:text-white">
                Category
              </dt>
              <dd className="mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-400">
                {productData.category}
              </dd>
              <dt className="mb-2 font-semibold leading-none text-blue-600 dark:text-white">
                Sold by
              </dt>
              <dd className="mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-400">
                {ownerName}
              </dd>
              <dt className="mb-2 font-semibold leading-none text-blue-600 dark:text-white">
                Location
              </dt>
              <dd className="mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-400">
                {productData.location}
              </dd>
              <dt className="mb-2 font-semibold leading-none text-blue-600 dark:text-white">
                Posted on
              </dt>
              <dd className="mb-4 font-light text-gray-600 sm:mb-5 dark:text-gray-400">
                {formatDate(productData.createdAt)}
              </dd>
              <div className="mb-6 text-red-500 cursor-pointer">
                <dt className="mb-2 font-semibold leading-none text-blue-600 dark:text-white">
                  Add to Favorites
                </dt>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              </div>
              <div>
                <Button
                  className="w-80 md:w-fit lg:w-fit xl:w-fit"
                  gradientDuoTone="purpleToBlue"
                  size={"sm"}
                >
                  Get Seller Contact
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default ProductDetails;
