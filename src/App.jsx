import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/navbar/Header";
import Hero from "./components/home/hero/Hero";
import ProductsHero from "./components/home/products/ProductsHero";
import ProductCategories from "./components/home/products/ProductCategories";
import PopularProducts from "./components/home/products/PopularProducts";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <ProductsHero />
                <ProductCategories />
                <PopularProducts />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
