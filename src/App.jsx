import "./App.css";
import Header from "./components/navbar/Header";
import Hero from "./components/home/hero/Hero";
import ProductsHero from "./components/home/products/ProductsHero";
import ProductCategories from "./components/home/products/ProductCategories";
import PopularProducts from "./components/home/products/PopularProducts";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Hero />
        <ProductsHero />
        <ProductCategories />
        <PopularProducts />
      </div>
    </>
  );
}

export default App;
