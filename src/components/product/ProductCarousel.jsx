import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCarousel = () => {
  return (
    <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 py-2 px-4">
      <Carousel showThumbs={true}>
        <div>
          <img src="https://apollo.olx.in/v1/files/kgsyfn2miq3l1-IN/image;s=780x0;q=60" />
        </div>
        <div>
          <img src="https://apollo.olx.in/v1/files/nay15it933tb1-IN/image;s=780x0;q=60" />
        </div>
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
