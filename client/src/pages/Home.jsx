import React, { useEffect, useState } from 'react'

const Home = () => {
  const [offerState, setOfferState] = useState([])
  const [sellState, setSellState] = useState([])
  const [rentState, setRentState] = useState([])

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
      <main className='px-8'>
        <section className='flex flex-col  h-screen py-48 md:py-16 justify-center gap-12 relative'>
          <div className='flex'>
            <div className='space-y-2 flex-1'>
              <h1 className=' text-4xl md:text-7xl'>
            Find your next 
            <span className='text-neutral-700'> Perfect </span><br />
            place with ease
          </h1>
          <p className='text-neutral-700 text-sm px-8 py-1 text-center bg-neutral-100 rounded-3xl w-fit'>
            NewEstate will help you fid your  home fast, easy and comportable. <br /> Our exper support are always available
          </p>
            </div>
            <div className='flex-1 bg-blue-500'>
              
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
        <section className=''>
          Hello world
        </section>
        <section className=''>
          Hello world
        </section>
      </main>

    </>
  )
}

export default Home
