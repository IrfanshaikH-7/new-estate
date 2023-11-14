// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { Link2Icon, Move3D, MoveVertical } from "lucide-react";

const Carousel = ({ images }) => {
    !images ? "" :
    console.log(images)
    
    // const handleNext= ()=> {
    //     setCurrentIndex((prev) => 
    //         prev + 1 === images.length ? 0 : prev + 1
    //     );
    // }

    // const handlePrev = ()=> {
    //     setCurrentIndex((prev)=> 
    //         prev -1 < 0 ? images.length -1 : prev - 1
    //     );
    // }
    // const handleDotClick = (index) => {
    //     setCurrentIndex(index);
    // }
      
    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };
  return (
    // <div className="carousel p-4">
    //     <img
    //       key={currentIndex}
    //       src={images ? images[currentIndex]: ''}
    //       className="aspect-video rounded-3xl"
    //     />

    //     <div className="slide_direction">

    //     <div className="left" onClick={handlePrev}>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         height="20"
    //         viewBox="0 96 960 960"
    //         width="20"
    //       >
    //         <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
    //       </svg>
    //     </div>
    //     <div className="right" onClick={handleNext}>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         height="20"
    //         viewBox="0 96 960 960"
    //         width="20"
    //       >
    //         <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
    //       </svg>
    //     </div>
    //   </div>
    //   <div className="indicator">
    //     {images && images?.map((_, index) => (
    //       <div
    //         key={index}
    //         className={`dot ${currentIndex === index ? "active" : ""}`}
    //         onClick={() => handleDotClick(index)}
    //       ></div>
    //     ))}
    //   </div>
    // </div>
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
