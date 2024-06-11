"use client";

import Image from "next/image";

const Carousel = () => {
  const carouselImages = {
    imag1: "/banner-1.jpg",
    imag2: "/banner-2.jpg",
    imag3: "/banner-3.jpg",
    imag4: "/banner-4.jpg",
    imag5: "/banner-5.jpg",
  };

  return (
    <div>
      <div className="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Image
              src={carouselImages.imag1}
              alt="banner1"
              width={1920}
              height={1080}
            />
          </div>
          <div>
            <Image
              src={carouselImages.imag2}
              alt="banner2"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
