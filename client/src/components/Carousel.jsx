// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Link2Icon } from "lucide-react";

const Carousel = ({ images }) => {
    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
        focusOnSelect: false
    };
  return (
    <>
    <div className="imgslider object-contain w-full lg:w-[95%] mx-auto">
        <Slider {...settings} swipeToSlide={true} draggable={true} className="w-full mx-auto" dots={false} arrows={false}>
            {images && images.map((item) => (
                <div key={item} className="relative">
                    <div className="h-16 w-16 bg-white absolute z-50 rounded-3xl top-10 right-10 justify-center items-center"><Link2Icon className="text-slate-700 h-full w-full p-5" /></div>
                    <img
                        src={item}
                        alt='img'
                        className="h-72 sm:h-96  md:h-[580px] w-full object-cover rounded-[50px] p-4"
                    />
                </div>
            ))}
        </Slider>
    </div>
</>
  )
}

export default Carousel
