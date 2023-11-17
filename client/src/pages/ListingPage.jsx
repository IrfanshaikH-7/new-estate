import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { useSelector  } from 'react-redux';
import Carousel from '../components/Carousel';
import { ArrowLeft, BathIcon, Bed, BedSingle, Car, CarIcon, CarTaxiFront, MapPinIcon, Sparkle, SplitSquareHorizontal } from 'lucide-react';
import Contact from '../components/Contact';

const ListingPage = () => {

    const [listingData, setListingData] = useState([]);
    const [contact, setContact] = useState(false);
    const { currentUser } = useSelector(state => state.user)
    const params = useParams()
    useEffect(() => {
        const fetching = async () => {
            const res = await fetch(`/api/listing/getListing/${params.listingId}`, { method: 'GET' })
            const data = await res.json()
            if (data.success === false) {
                toast.error("failed to get listing")
            }
            setListingData(data)

        }
        fetching();
    }, [])
    console.log(listingData)
 
    return (
        <>
            <div className='h-full pt-16 '>
                <Carousel images={listingData.images} />
                <section className='flex flex-col md:flex-row h-full w-[95%] mx-auto  relative'>
                    <div className='md:w-3/5 h-96 w-full px-4 md:pr-24'>
                        <div className='flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <h3 className='text-3xl font-semibold'>{listingData.name}</h3>
                            </div>
                            <div className='flex gap-1'><Sparkle className='h-8 w-8 text-yellow-400 fill-yellow-400' /><p className='font-semibold text-xl'>On offer</p></div>
                        </div>

                        <div className='flex gap-1 items-center py-1'>
                            <MapPinIcon className='text-slate-700  h-4 w-4 ' />
                            <p className='text-sm text-slate-700'>{listingData.address}</p>
                        </div>
                        <p className='text-lg bg-black text-white px-4 py-1 my-1 rounded-md font-semibold w-28 text-center'>{listingData.type}</p>

                        <p className='text-slate-800 mt-4 '><span className='font-semibold'>Decription :</span>{" "}{listingData.description}</p>
                        <div className='flex justify-between py-8'>
                            <div className='h-[60px] md:h-28  aspect-video rounded-3xl bg-black'></div>
                            <div className='h-[60px] md:h-28  aspect-video rounded-3xl bg-black'></div>
                            <div className='h-[60px] md:h-28  aspect-video rounded-3xl bg-black'></div>
                            <div className='h-[60px] md:h-28  aspect-video rounded-3xl bg-black'></div>
                        </div>

                    </div>
                    <div className='w-full h-96 md:w-2/5 p-4 '>
                        <div className='bg-slate-200 rounded-3xl h-full px-8 py-8'>
                            <h3 className='text-slate-700'>Brief info</h3>
                            <div className='flex justify-evenly bg-white rounded-3xl p-4 my-2'>


                                <div className='flex items-center gap-2 text-slate-800'>
                                    <BedSingle className='h-6 w-6 text-slate-800' />
                                    {listingData.bedrooms}
                                </div>
                                <div className='flex items-center gap-2 text-slate-800'>
                                    <BathIcon className='h-6 w-6 text-slate-800' />
                                    {listingData.bathrooms}
                                </div>
                                <div className='flex items-center gap-2 text-slate-800'>
                                    <CarTaxiFront className='h-6 w-6 text-slate-800' />
                                    {listingData.parking ? "Y" : "N"}
                                </div>
                                <div className='flex items-center gap-2 text-slate-800'>
                                    <SplitSquareHorizontal className='h-6 w-6 text-slate-800' />
                                    3730 ft
                                </div>


                            </div>
                            <div className='p-4 bg-white rounded-3xl flex justify-evenly mt-4'>
                                <div className='flex py-4 flex-col justify-center items-start'>
                                    <h4 className='  text-sm md:text-xl font-semibold py-1'>Price:</h4>
                                    <p className='font-semibold text-base'>${" "}{listingData.regularPrice}/ <span className='text-slate-800 text-sm'>month</span> </p>
                                </div>
                                <div className='flex py-4 flex-col justify-center items-start'>
                                    <h4 className=' text-sm md:text-xl font-semibold py-1'>Discounted Price:</h4>
                                    <p className='font-semibold text-base'>${" "}{listingData.discountedPrice}/ <span className='text-slate-800 text-sm'>month</span> </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {
              currentUser && currentUser._id === listingData.userRef &&
            <div className='h-full w-[95%] mx-auto flex gap-4 px-4 pt-4 pb-16'>
                <button type='button' 
                onClick={() => setContact((prev) => !prev)} 
                className='flex justify-center items-center text-white h-32 w-1/3 bg-[#121212] rounded-lg'
                >
                    Send your Query
                </button>
                {
                    contact ? (
                        <Contact listingData={listingData} />
                        
                    ): (
                        <div className='w-full flex gap-1 items-center '>
                            <ArrowLeft className='h-8 w-8 ml-12 font-semibold '/>
                            <p className='font-semibold text-2xl'>Connect with the seller</p>
                        </div>
                    )
                }

                
            </div>
            }
        </>
    )
}

export default ListingPage
