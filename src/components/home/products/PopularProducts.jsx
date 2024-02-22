import React from "react";
import ProductCard from "../../product/ProductCard";

const PopularProducts = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Trending Products
        </h1>
        <p className="text-gray-400 mb-6">
          Some of the most popular products you might be interested in :&#x0029;
        </p>
      </div>
      <div className="productCardWrapper flex flex-row overflow-x-auto overflow-y-hidden scrollbar-none m-12">
        <ProductCard
          id="1"
          name="Mac Book Pro 16 inches 128Tb 1"
          price="50000"
          imageUrl="https://images.hindustantimes.com/tech/img/2021/09/14/1600x900/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg"
        />
        <ProductCard
          id="2"
          name="Branded new cycle for sale in VIT"
          price="8000"
          imageUrl="https://apollo.olx.in/v1/files/7obd0fwvtyf01-IN/image;s=780x0;q=60"
        />
        <ProductCard
          id="3"
          name="Brand New Watch with water resistance"
          price="4576"
          imageUrl="https://apollo.olx.in/v1/files/rpeng8x7thmx-IN/image;s=780x0;q=60"
        />
        <ProductCard
          id="4"
          name="Mac Book Pro 16 inches 128Tb 1"
          price="50000"
          imageUrl="https://images.hindustantimes.com/tech/img/2021/09/14/1600x900/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg"
        />
        <ProductCard
          id="5"
          name="Branded new cycle for sale in VIT"
          price="8000"
          imageUrl="https://apollo.olx.in/v1/files/7obd0fwvtyf01-IN/image;s=780x0;q=60"
        />
        <ProductCard
          id="6"
          name="Brand New Watch with water resistance"
          price="5023"
          imageUrl="https://apollo.olx.in/v1/files/rpeng8x7thmx-IN/image;s=780x0;q=60"
        />
      </div>
    </div>
  );
};

export default PopularProducts;
