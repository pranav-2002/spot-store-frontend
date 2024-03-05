import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../product/ProductCard";
import { getProductsByCategory } from "../../api/requests/products/products";
import Skeleton from "../utils/Skeleton";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const params = useParams();

  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const categoryName =
    params.categoryName.charAt(0).toUpperCase() + params.categoryName.slice(1);

  const fetchProductsByCategory = async () => {
    try {
      const products = await getProductsByCategory(params.categoryName);
      setProductsData(products.products);
      setSearchResults(products.products);
    } catch (error) {
      console.log(error);
      if (error.response.data.message === "Bad Request") {
        navigate("/404");
      }
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [params.categoryName]);

  // Search Filter
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredProducts = productsData.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(filteredProducts);
  };

  return (
    <div>
      <section className="bg-slate-100 pb-10">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-10 lg:px-12">
          <div className="inline-flex justify-between items-center py-1 px-1 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 0 0-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634Zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 0 1-.189-.866c0-.298.059-.605.189-.866Zm2.023 6.828a.75.75 0 1 0-1.06-1.06 3.75 3.75 0 0 1-5.304 0 .75.75 0 0 0-1.06 1.06 5.25 5.25 0 0 0 7.424 0Z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-sm font-bold mx-4 my-1">{categoryName}</span>
          </div>
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-blue-900 md:text-3xl lg:text-4xl">
            {categoryName} Central: Explore the World of {categoryName}
          </h1>
          <p className="mb-8 sm:mb-8 md:mb-4 lg:mb-0 xl:mb-0 text-lg font-normal text-blue-800 lg:text-xl sm:px-16 xl:px-48">
            Your ultimate destination for all{" "}
            <span className="font-bold">{categoryName}</span> in VIT. Search for
            your products below.
          </p>
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
      </section>

      <div className="productPageWrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mx-auto max-w-xs sm:max-w-2xl md:max-w-2xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-5xl mt-8">
        {productsData.length > 0 && searchResults.length > 0 ? (
          searchResults.map((product) => (
            <ProductCard
              id={product._id}
              name={product.title}
              price={product.price}
              imageUrl={product.primaryImage.imgUrl}
              key={product._id}
            />
          ))
        ) : productsData.length > 0 && searchResults.length === 0 ? (
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            No Products Found
          </h1>
        ) : (
          // Render skeletons if no products are found
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
