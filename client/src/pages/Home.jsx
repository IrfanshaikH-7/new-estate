import React, { useEffect, useState } from 'react'
import { Link2Icon } from "lucide-react";


import Carousel from '../components/Carousel'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ListingItem from '../components/ListingItem';
import { Link } from 'react-router-dom';

const Home = () => {
  const [offerState, setOfferState] = useState([])
  const [sellState, setSellState] = useState([])
  const [rentState, setRentState] = useState([])

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

  console.log(offerState, "offerState");
  console.log(sellState, "SellState");
  console.log(rentState, "rentState");
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setOfferState(data)
        fetchRentListing()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchRentListing = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=3');
        const data = await res.json();
        setRentState(data)
        fetchSellListing()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSellListing = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sell&limit=3');
        const data = await res.json();
        setSellState(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListing();
  }, [])

  return (
    < >
      <main className='px-8 pb-24'>
        <section className='flex flex-col  h-screen py-48 md:py-16 justify-center md:gap-12  gap-40 relative'>
          <div className='flex'>
            <div className='space-y-2 w-full lg:w-1/2'>
              <h1 className=' text-4xl md:text-7xl'>
                Find your next
                <span className='text-neutral-700'> Perfect </span><br />
                place with ease
              </h1>
              <p className='text-neutral-700 text-sm px-8 py-1 text-center bg-neutral-100 rounded-3xl w-fit'>
                NewEstate will help you fid your  home fast, easy and  <br className='md:hidden flex' />  comportable. <br className='hidden md:flex' /> Our exper support are always available
              </p>
            </div>
            <div className='right-0 lg:top-[39%] top-[38%]  bottom-1/2 w-full text-end pt-8  lg:w-1/2 absolute z-30 '>
              <p className='text-3xl lg:text-7xl font-semibold'>
                Your Perfect real - <br />
                <span className='text-3xl'> Estate is Here</span>
              </p>
            </div>

          </div>

          <div className='h-60 flex w-3/5  object-cover relative rounded-3xl z-40'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-hYZEUi_ZIvEhawUoMV5S0HcZEk9CaBzLw&usqp=CAU" alt="img"
              className='h-60 w-full  object-cover -z-10 rounded-3xl'
            />
            <div className='h-60 w-56 bg-gradient-to-br from-white to-neutral-200 border  z-10 absolute -bottom-24 -right-24 rounded-3xl px-8 py-6'>

              <div className='h-8 w-8 rounded-full bg-black' />
              <p className='text-2xl text-start py-4'>
                Everytime  / <br />
                <span className='text-xl'>Discount</span>
              </p>
              <p className="text-neutral-700 ">Get regular discounts and offers</p>
            </div>
          </div>

        </section>
        <section className='h-full py-12 w-full'>
          <Slider {...settings} swipeToSlide={true} draggable={true} className="w-full mx-auto" dots={false} arrows={false}>
            {offerState && offerState.map((item) => (
              <div key={item._id} className="relative">
                <div className="h-16 w-16 bg-white absolute z-50 rounded-3xl top-10 right-10 justify-center items-center"><Link2Icon className="text-slate-700 h-full w-full p-5" /></div>
                <img
                  src={item.images[0]}
                  alt='img'
                  className="h-72 sm:h-96  md:h-[580px] w-full object-cover rounded-[50px] p-4"
                />
              </div>
            ))}
          </Slider>
        </section>
        <section className=' h-full w-full space-y-6'>

          {/* recent/offer listing */}
          <div className='h-full w-full  space-y-1'>
             <div className='flex justify-between items-center p-2 border border-neutral-400 rounded-lg'>
                <h1 className='text-3xl font-semibold py-2'>Recent offer </h1>
                <Link to='/search?type=rent' className='text-base p-2 bg-[#121212] text-white rounded-lg hover:bg-white hover:text-black'>explore more</Link>
              </div> 
            <div className='h-full flex md:flex-row flex-col gap-6 px-8'>
              {
                rentState && (
                  rentState.map((rentlisting) => (

                    <ListingItem listing={rentlisting} key={rentlisting._d} />
                  ))
                )
              }
            </div>
          </div>

          {/* Rent listings */}
          <div  className='h-full w-full  space-y-1 px-8'>
             <div className='flex justify-between items-center p-2 border border-neutral-400 rounded-lg'>
                <h1 className='text-3xl font-semibold py-2'>For rents</h1>
                <Link to='/search?type=rent' className='text-base p-2 bg-[#121212] text-white rounded-lg hover:bg-white hover:text-black'>explore more</Link>
              </div> 
            <div className='h-full flex md:flex-row flex-col gap-6'>
              {
                rentState && (
                  rentState.map((rentlisting) => (

                    <ListingItem listing={rentlisting} key={rentlisting._d} />
                  ))
                )
              }
            </div>
          </div>

          {/* sell listings */}

          <div className='h-full w-full space-y-1 '>
             <div className='flex justify-between items-center p-2 border border-neutral-400 rounded-lg'>
                <h1 className='text-4xl font-semibold py-2'>For sale</h1>
                <Link to='/search?type=sell' className='text-base p-2 bg-[#121212] text-white rounded-lg hover:bg-white hover:text-black'>explore more</Link>
              </div> 
            <div className='h-full flex md:flex-row flex-col gap-6'>
              {
                sellState && (
                  sellState.map((sellisting) => (

                    <ListingItem listing={sellisting} key={sellisting._d} />
                  ))
                )
              }
            </div>
          </div>

          
        </section>
      </main>

    </>
  )
}

export default Home
