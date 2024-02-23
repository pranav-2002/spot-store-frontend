import React from "react";
import ProductCard from "../product/ProductCard";

const UserProducts = () => {
  return (
    <div className="bg-slate-100 py-10">
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        Your Products
      </h1>
      <div className="productPageWrapper grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 mx-auto max-w-xs sm:max-w-2xl md:max-w-2xl lg:max-w-5xl xl:max-w-5xl 2xl:max-w-5xl mt-8">
        <ProductCard
          id="1"
          name="Mac Book Pro 16 inches 128Tb 1"
          price="50000"
          imageUrl="https://images.hindustantimes.com/tech/img/2021/09/14/1600x900/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg"
          ownerMode
        />
        <ProductCard
          id="2"
          name="Branded new cycle for sale in VIT"
          price="8000"
          imageUrl="https://apollo.olx.in/v1/files/7obd0fwvtyf01-IN/image;s=780x0;q=60"
          ownerMode
        />
        <ProductCard
          id="3"
          name="Brand New Watch with water resistance"
          price="4576"
          imageUrl="https://apollo.olx.in/v1/files/rpeng8x7thmx-IN/image;s=780x0;q=60"
          ownerMode
        />
        <ProductCard
          id="4"
          name="Mac Book Pro 16 inches 128Tb 1"
          price="50000"
          imageUrl="https://images.hindustantimes.com/tech/img/2021/09/14/1600x900/WhatsApp_Image_2021-09-14_at_5.13.31_PM_1631623490905_1631623503195.jpeg"
          ownerMode
        />
        <ProductCard
          id="5"
          name="Branded new cycle for sale in VIT"
          price="8000"
          imageUrl="https://apollo.olx.in/v1/files/7obd0fwvtyf01-IN/image;s=780x0;q=60"
          ownerMode
        />
        <ProductCard
          id="6"
          name="Brand New Watch with water resistance"
          price="5023"
          imageUrl="https://apollo.olx.in/v1/files/rpeng8x7thmx-IN/image;s=780x0;q=60"
          ownerMode
        />
      </div>
    </div>
  );
};

export default UserProducts;
