import React from "react";
import Hero from "./hero/Hero";
import ProductsHero from "./products/ProductsHero";
import ProductCategories from "./products/ProductCategories";
import Privacy from "./privacy/Privacy";
// import PopularProducts from "./products/PopularProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductsHero />
      <ProductCategories />
      <Privacy />
      {/* <PopularProducts /> */}
    </>
  );
};

export default Home;
