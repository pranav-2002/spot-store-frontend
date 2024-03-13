import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Loader from "./components/utils/Loader";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import PageNotFound from "./components/home/PageNotFound/PageNotFound";
import ScrollToTop from "./components/utils/ScrollToTop";

const Header = lazy(() => import("./components/navbar/Header"));
const Home = lazy(() => import("./components/home/Home"));
const Login = lazy(() => import("./components/login/Login"));
const SignUp = lazy(() => import("./components/signup/SignUp"));
const ProductDetails = lazy(() =>
  import("./components/product/ProductDetails")
);
const AllProducts = lazy(() => import("./components/product/AllProducts"));
const CategoriesPage = lazy(() =>
  import("./components/categories/CategoriesPage")
);
const UserProfile = lazy(() => import("./components/user/UserProfile"));
const UserProducts = lazy(() => import("./components/user/UserProducts"));
const ProductEdit = lazy(() => import("./components/user/ProductEdit"));
const CreateProduct = lazy(() => import("./components/user/CreateProduct"));
const ContactSupport = lazy(() =>
  import("./components/support/ContactSupport")
);
const BottomFooter = lazy(() => import("./components/footer/BottomFooter"));

function App() {
  return (
    <>
      <div className="app">
        <Suspense fallback={<Loader />}>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route
              path="/category/:categoryName"
              element={<CategoriesPage />}
            />
            <Route path="/support" element={<ContactSupport />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/products" element={<UserProducts />} />
              <Route
                path="/product/edit/:productId"
                element={<ProductEdit />}
              />
              <Route path="/user/product/create" element={<CreateProduct />} />
            </Route>
            <Route path="/404" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <BottomFooter />
        </Suspense>
      </div>
    </>
  );
}

export default App;
