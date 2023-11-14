import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import Carousel from '../components/Carousel';
import { BathIcon, Bed, BedSingle, Car, CarIcon, CarTaxiFront, MapPinIcon, Sparkle, SplitSquareHorizontal } from 'lucide-react';

const ListingPage = () => {

    const [listingData, setListingData] = useState([]);
    console.log('listing dta')

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
    console.log(listingData.images);
    return (
        <div className='h-screen pt-16'>
            <Carousel images={listingData.images} />
            <section className='flex h-96 w-[95%] mx-auto  relative'>
                <div className='w-3/5 px-4 pr-24'>
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
                <div className='h-28 aspect-video rounded-3xl bg-black'></div>
                <div className='h-28 aspect-video rounded-3xl bg-black'></div>
                <div className='h-28 aspect-video rounded-3xl bg-black'></div>
                <div className='h-28 aspect-video rounded-3xl bg-black'></div>
            </div>

                </div>
                <div className='w-2/5 p-4'>
                    <div className='bg-slate-200 rounded-3xl h-full px-8 py-8'>
                        <h3 className='text-slate-700'>Brief info</h3>
                        <div className='flex justify-evenly bg-white rounded-3xl p-4 my-2'>
                            
                           
                            <div className='flex items-center gap-2 text-slate-800'>
                            <BedSingle className='h-6 w-6 text-slate-800'/>
                            {listingData.bedrooms}
                            </div>
                            <div className='flex items-center gap-2 text-slate-800'>
                            <BathIcon className='h-6 w-6 text-slate-800'/>
                            {listingData.bathrooms}
                            </div>
                            <div className='flex items-center gap-2 text-slate-800'>
                            <CarTaxiFront className='h-6 w-6 text-slate-800'/>
                            {listingData.parking ? "Y" : "N"}
                            </div>
                            <div className='flex items-center gap-2 text-slate-800'>
                            <SplitSquareHorizontal className='h-6 w-6 text-slate-800'/>
                            3730 ft
                            </div>
                            

                        </div>
                        <div className='p-4 bg-white rounded-3xl flex justify-evenly mt-4'>
                                <div className='flex py-4 flex-col justify-center items-start'>
                                    <h4 className=' text-xl font-semibold py-1'>Price:</h4>
                                    <p className='font-semibold text-xl'>${" "}{listingData.regularPrice}/ <span className='text-slate-800 text-sm'>month</span> </p>
                                </div>
                                <div className='flex py-4 flex-col justify-center items-start'>
                                    <h4 className='text-xl font-semibold py-1'>Discounted Price:</h4>
                                    <p className='font-semibold text-xl'>${" "}{listingData.discountedPrice}/ <span className='text-slate-800 text-sm'>month</span> </p>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ListingPage
