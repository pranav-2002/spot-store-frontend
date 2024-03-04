import React, { useEffect, useState } from "react";
import ProductCard from "../product/ProductCard";
import Cookies from "js-cookie";
import { getUserProducts } from "../../api/requests/users/user";
import Loader from "../utils/Loader";

const UserProducts = () => {
  const [userProducts, setUserProducts] = useState([]);

  const token = Cookies.get("token");

  const fetchUserProducts = async () => {
    try {
      const products = await getUserProducts(token);
      setUserProducts(products.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProducts();
  }, []);

  return (
    <div className="bg-slate-100 py-10">
      {userProducts.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold text-blue-600 text-center">
            Your Products
          </h1>

          <div className="productPageWrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mx-auto max-w-xs sm:max-w-2xl md:max-w-2xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-5xl mt-8">
            {userProducts.map((product) => (
              <ProductCard
                id={product._id}
                name={product.title}
                price={product.price}
                imageUrl={product.primaryImage.imgUrl}
                sold={product.sold}
                ownerMode
                key={product._id}
              />
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default UserProducts;
