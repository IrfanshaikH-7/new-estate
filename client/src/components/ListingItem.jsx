import { MapPin } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ListingItem = ({listing, key}) => {
  return (
    <div key={listing._id} className='border rounded-3xl flex-col justify-between overflow-hidden h-full  w-full  '>
                    <Link to={`/listing/${listing._id}`} className=''>
                      <img src={listing.images[0]} alt="listing-cover"
                        className='w-full aspect-video'
                      />
                      <div className='px-2 mt-2  space-y-1'>
                        <p className='font-semibold truncate' >{listing.name}</p>
                        <div className='flex '>
                          <MapPin className='h-4 w-4 fill-black text-white' />
                          <span className='text-xs truncate text-neutral-700 '>{listing.address}</span>
                        </div>
                        <p className='py-2 text-sm text-neutral-800 '><span className='line-clamp-2 '>
                             {listing.description} 
                        </span></p>
                        <div className='flex md:flex-col lg:flex-row gap-2 h-full items-center justify-center p-1 pb-4 '>
                          <div className='flex justify-center items-center flex-col w-24 lg:w-24 md:w-full  space-y-1'>
                            <p className='p-1.5 rounded-lg w-24 lg:w-24 md:w-full md:text-xs lg:text-base text-center bg-neutral-100 text-neutral-800'>{listing.bedrooms}{" "}beds</p>
                            <p className='p-1.5 rounded-lg w-24 lg:w-24 md:w-full md:text-xs lg:text-base text-center bg-neutral-100 text-neutral-800'>{listing.bathrooms}{" "}baths</p>
                          </div>
                          <div className='h-full w-full flex items-center justify-center bg-neutral-100   py-7 rounded-lg'>
                            <p className=''><span className='text-sm line-through text-red-500'>${listing.regularPrice.toLocaleString("en-US")}</span>/${listing.discountedPrice.toLocaleString("en-US")}</p>

                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
  )
}

export default ListingItem
