import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = ({ productImages }) => {
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 py-2 px-4">
      <Carousel showThumbs={true}>
        {productImages.map((image) => (
          <div key={image.imgUrl._id}>
            <img src={image.imgUrl} alt="product carousel image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
