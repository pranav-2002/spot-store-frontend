import React from "react";
import Hero from "./hero/Hero";
import ProductsHero from "./products/ProductsHero";
import ProductCategories from "./products/ProductCategories";
import PopularProducts from "./products/PopularProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductsHero />
      <ProductCategories />
      <PopularProducts />
    </>
  );
};

export default Home;
