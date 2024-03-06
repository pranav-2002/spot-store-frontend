import React, { useEffect } from "react";
import ProductCard from "../product/ProductCard";
import Cookies from "js-cookie";
import { getUserProducts } from "../../api/requests/users/user";
import Loader from "../utils/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRecoilState } from "recoil";
import UserProductsAtom from "../../recoil/atoms/UserProductsAtom";

const UserProducts = () => {
  const [userProducts, setUserProducts] = useRecoilState(UserProductsAtom);

  const token = Cookies.get("token");

  const fetchUserProducts = async () => {
    try {
      const products = await getUserProducts(token);
      if (products.products.length === 0) {
        toast.warn("You haven't listed any products yet");
      }
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

export default UserProducts;
