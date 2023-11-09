import React, { useState } from 'react'
import { MoveLeft } from 'lucide-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { app } from '../firebase'

const CreateLising = () => {
    const [files, setfiles] = useState([])
    const [data, setData] = useState({
        images: [],

    });
    console.log(data);


    const handleImageUpload = (e) => {
        if (files.length > 0 && files.length < 7) {
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
                Promise.all(promises).then((urls) => {
                    setData({ ...data, images: data.images.concat(urls) })
                })
            }
        }
    }
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                
                (snapshot) => {
                    const progress = 
                    (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
                    console.log(progress);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    });
                }
            )

        })
    }
    return (
        <main className='h-full w-full '>


            <section className='lg:h-screen h-full flex w-full bg-gradient-to-b  from-slate-300 from-90% to-90% to-white justify-end items-end'>
                <div className='h-screen hidden lg:flex w-3/12 rounded-br-3xl bg-slate-300'></div>
                <div className='bg-white h-5/6 w-full  rounded-tl-3xl py-6 px-4 mt-24 lg:mt-0'>
                    <h1 className=' -ml-4 text-xl font-semibold pl-20 pr-4 py-2 bg-[#121212] w-fit text-white rounded-r-lg z-10 absolute'>Add your listing</h1>
                    <form className=' h-full flex p-1 flex-col lg:flex-row relative  py-12'>
                        <section className='flex flex-col gap-2 flex-1 p-12 md:justify-center lg:justify-start mx-auto w-full sm:max-w-lg lg:max-w-md xl:max-w-lg  '>
                            <input type="text" id='name' placeholder="Name" maxLength='62' minLength='8' required
                                className='border py-1 px-4 rounded-lg text-base w-full'
                            />
                            <input type="text" id='address' placeholder="Address" maxLength='62' minLength='8' required
                                className='border py-1 px-4 rounded-lg text-base w-full'
                            />
                            <div className='flex px-1 gap-4 flex-wrap'>
                                <div className='flex gap-1 items-center'>
                                    <input type="checkbox" id='sell' maxLength='62' minLength='8' required
                                        className='h-4 w-4 border py-1 b px-4 rounded-lg text-base'
                                    />
                                    <span className=''>Sell</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type="checkbox" id='rent' maxLength='62' minLength='8' required
                                        className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                    />
                                    <span>Rent</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type="checkbox" id='parking' maxLength='62' minLength='8' required
                                        className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                    />
                                    <span>Parking spot</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type="checkbox" id='furnished' maxLength='62' minLength='8' required
                                        className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                    />
                                    <span>Furnished</span>
                                </div>
                                <div className='flex gap-1 items-center'>
                                    <input type="checkbox" id='offer' maxLength='62' minLength='8' required
                                        className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                    />
                                    <span>Offer</span>
                                </div>

                            </div>
                            <div className=' flex gap-2'>
                                <div className='space-x-1'>
                                    <input type="number" id='bedrooms' min='1' max='10' required
                                        className='border p-1 text-center rounded-lg text-base [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none w-12'
                                    />
                                    <span>beds</span>
                                </div>

                                <div className='space-x-1'>
                                    <input type="number" id='bathrooms' min='1' max='10' required
                                        className='border p-1 text-center rounded-lg text-base [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none w-12'
                                    />
                                    <span>baths</span>
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 w-full mt-4 sm:max-w-lg lg:max-w-md xl:max-w-lg'>
                                <div className='space-x-2 flex'>
                                    <input type="number" id='regularPrice' min='1' max='999' required
                                        className='border p-2 rounded-lg text-base w-28 text-center
                                    [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none
                                    '
                                    />
                                    <div>
                                        <p className=''>Discounted price</p>
                                        <span className='text-xs text-slate-500'>per/month</span>
                                    </div>

                                </div>

                                <div className='space-x-2 flex'>
                                    <input type="number" id='discountedPrice' min='1' max='999' required
                                        className='border p-2 rounded-lg text-base w-28 text-center
                                    [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none
                                    '
                                    />
                                    <div>
                                        <p className=''>Discounted price</p>
                                        <span className='text-xs text-slate-500'>per/month</span>
                                    </div>

                                </div>
                            </div>

                        </section>
                        <section className='flex-1  py-12 px-24'>
                            <div className='flex justify-between p-2'>
                                <input type="file" id='images' accept='image/*' multiple
                                    className=''
                                    onChange={(e) => setfiles(e.target.files)}
                                />
                                <button type='button' onClick={handleImageUpload} className='bg-black text-white px-3 py-px rounded-lg'>Upload</button>
                            </div>
                        </section>
                        <button className=' flex justify-center items-center gap-1 text-xl font-semibold absolute z-10 bottom-12 right-0 -mr-4 pr-40 pl-4 py-2 rounded-l-lg bg-[#121212] text-white'>
                            Create Listing
                        </button>
                    </form>
                </div>
            </section>
            <footer className='h-96 w-full'>

            </footer>
        </main>
    )
}

export default CreateLising