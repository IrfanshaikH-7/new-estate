import React, { useRef, useState } from 'react'
import { Loader2, Loader2Icon, MoveLeft, Trash2Icon, TrashIcon } from 'lucide-react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useSelector } from "react-redux"

import { app } from '../firebase'
import { toast } from 'sonner'

const CreateLising = () => {
    const [files, setfiles] = useState([])
    const [error, setError] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [FormUploading, setFormUploading] = useState(false)
    console.log(files);
    const [data, setData] = useState({
        images: [],
        name: '',
        address: '',
        description: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountedPrice: 25,
        offer: false,
        parking: false,
        furnished: false

    });
    const Iref = useRef(null)
    const { currentUser } = useSelector( (state) => state.user)
    console.log(data);


    const handleImageUpload = (e) => {
        setUploading(true)
        if (files.length > 0 && files.length < 7) {
            setError(false)
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
                Promise.all(promises).then((urls) => {
                    setData({ ...data, images: data.images.concat(urls) });
                    setError(false)
                    setUploading(false)
                    setfiles([])
                    toast.success("Images uploaded successfully")
                }).catch((error) => {
                    setError('You can only send 6 images per lising')

                })
            }
        } else if (files.length === 0) {
            toast.warning("You must select a minimum of one image");
            setUploading(false)

        } else {
            toast.warning("You can only send 6 images per lising");
            setUploading(false)
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
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

    const handleRemoveImage = (idx) => {
        setData({
            ...data,
            images: data.images.filter((_, index) => idx !== index),

        })
        setfiles([])
    }


    const handleChange = (e) => {
        if (e.target.id === 'sell' || 'rent') {
            setData({
                ...data,
                type: e.target.id

            })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setData({
                ...data,
                [e.target.id]: !data[e.target.id]
            })

        }
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setData({
                ...data,
                [e.target.id]: e.target.value
            })
        }

    }

    const handleFormSubmit = async(e)=> {
        e.preventDefault();
        try {
            setFormUploading(true);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    useRef: currentUser._id,
                }),
            })
            const resData = res.json();
            setFormUploading(false);
            if(resData.success === false){
                toast(resData.message)
                setFormUploading(false);
            }
            setFormUploading(false);
        } catch (error) {
            toast.error('Something went wrong', error.message)
            setFormUploading(false);
            setError(error.message)
        }
    }
        return (

            <main className='h-full w-full '>
                <section className='lg:h-screen h-full flex w-full bg-gradient-to-b  from-slate-300 from-90% to-90% to-white justify-end items-end'>
                    <div className='h-screen hidden lg:flex w-3/12 rounded-br-3xl bg-slate-300'></div>
                    <div className='bg-white h-5/6 w-full  rounded-tl-3xl py-6 px-4 mt-24 lg:mt-0'>
                        <h1 className=' -ml-4 text-xl font-semibold pl-20 pr-4 py-2 bg-[#121212] w-fit text-white rounded-r-lg z-10 absolute'>Add your listing</h1>
                        <form onSubmit={handleFormSubmit} className=' h-full flex p-1 flex-col lg:flex-row relative  py-12'>
                            <section className='flex flex-col gap-2 flex-1 p-12 md:justify-center lg:justify-start mx-auto w-full sm:max-w-lg lg:max-w-md xl:max-w-lg  '>
                                <input type="text" id='name' placeholder="Name" maxLength='62' minLength='8' required
                                    className='border py-1 px-4 rounded-lg text-base w-full'
                                    onChange={handleChange}
                                    value={data.name}
                                />
                                <input type="text" id='address' placeholder="Address" maxLength='62' minLength='8' required
                                    className='border py-1 px-4 rounded-lg text-base w-full'
                                    onChange={handleChange}
                                    value={data.address}
                                />
                                <textarea rows={6} type="text" id='description' placeholder="Description" maxLength='62' minLength='8' required
                                    className='border py-1 px-4 rounded-lg text-base w-full appearance-none resize-none'
                                    onChange={handleChange}
                                    value={data.description}
                                />
                                <div className='flex px-1 gap-4 flex-wrap'>
                                    <div className='flex gap-1 items-center'>
                                        <input type="checkbox" id='sell' maxLength='62' minLength='8' 
                                            className='h-4 w-4 border py-1 b px-4 rounded-lg text-base'
                                            onChange={handleChange}
                                            checked={data.type === 'sell'}
                                        />
                                        <span className=''>Sell</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <input type="checkbox" id='rent' maxLength='62' minLength='8' 
                                            className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                            onChange={handleChange}
                                            checked={data.type === 'rent'}
                                        />
                                        <span>Rent</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <input type="checkbox" id='parking' maxLength='62' minLength='8' 
                                            className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                            onChange={handleChange}
                                            checked={data.parking === true}
                                        />
                                        <span>Parking spot</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <input type="checkbox" id='furnished' maxLength='62' minLength='8' 
                                            className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                            onChange={handleChange}
                                            checked={data.furnished === true}
                                        />
                                        <span>Furnished</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <input type="checkbox" id='offer' maxLength='62' minLength='8' 
                                            className='h-4 w-4 border py-1 px-4 rounded-lg text-base'
                                            onChange={handleChange}
                                            checked={data.offer === true}
                                        />
                                        <span>Offer</span>
                                    </div>

                                </div>
                                <div className=' flex gap-2'>
                                    <div className='space-x-1'>
                                        <input type="number" id='bedrooms' min='1' max='10' required
                                            className='border p-1 text-center rounded-lg text-base [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none w-12'
                                            onChange={handleChange}
                                            value={data.bedrooms}
                                        />
                                        <span>beds</span>
                                    </div>

                                    <div className='space-x-1'>
                                        <input type="number" id='bathrooms' min='1' max='10' required
                                            className='border p-1 text-center rounded-lg text-base [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none w-12'
                                            onChange={handleChange}
                                            value={data.bathrooms}
                                        />
                                        <span>baths</span>
                                    </div>
                                </div>

                                <div className='flex flex-col gap-4 w-full mt-4 sm:max-w-lg lg:max-w-md xl:max-w-lg'>
                                    <div className='space-x-2 flex'>
                                        <input type="number" id='regularPrice' min='20' max='999999' required
                                            className='border p-2 rounded-lg text-base w-28 text-center
                                    [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none
                                    '
                                            onChange={handleChange}
                                            value={data.regularPrice}
                                        />
                                        <div>
                                            <p className=''>Regular price</p>
                                            <span className='text-xs text-slate-500'>per/month</span>
                                        </div>

                                    </div>

                                    <div className='space-x-2 flex'>
                                        <input type="number" id='discountedPrice' min='5' max='99999' required
                                            className='border p-2 rounded-lg text-base w-28 text-center
                                    [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none
                                    '
                                            onChange={handleChange}
                                            value={data.discountedPrice}
                                        />
                                        <div>
                                            <p className=''>Discounted price</p>
                                            <span className='text-xs text-slate-500'>per/month</span>
                                        </div>

                                    </div>
                                </div>

                            </section>
                            <section className='flex-1  py-10 px-2'>
                                <div className='flex gap-2 p-2'>
                                    <input ref={Iref} type="file" id='images' accept='image/*' multiple
                                        hidden
                                        onChange={(e) => setfiles(e.target.files)}
                                    />
                                    <div onClick={() => Iref.current.click()} className='h-20 w-32 border-2 rounded-lg flex justify-center items-center cursor-pointer'>Add images</div>
                                    <button type='button' onClick={handleImageUpload} className='bg-black text-white px-3 py-px rounded-lg w-24  flex items-center justify-center'>{uploading ? <Loader2 className='animate-spin h-4 w-5 text-white' /> : files.length <= 0 ? "  Upload" : data.images.length <= 0 ? `${files.length} files Upload` : "upload"}</button>
                                </div>
                                <div className='h-auto w-full  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 flex-wrap gap-2 md:justify-start justify-center  p-2'>
                                    {
                                        data.images.map((url, idx) => (
                                            <div key={url} className='relative border-2 border-slate-300 h-min p-2 rounded-lg flex justify-center items-center peer aspect-video'>
                                                <img src={url} alt="img" className='  aspect-video object-cover rounded-lg' />
                                                <Trash2Icon className=' w-12 p-1 text-red-600 bg-red-300/75 font-semibold rounded-l-lg absolute top-4 right-2 cursor-pointer'
                                                    onClick={() => handleRemoveImage(idx)}
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </section>
                            <button className=' flex justify-center items-center gap-1 text-xl font-semibold absolute z-10 bottom-12 right-0 -mr-4 pr-40 pl-4 py-2 rounded-l-lg bg-[#121212] text-white'>
                                {FormUploading ? <Loader2Icon className='h-4 w-4 animate-spin'/> : "Create Listing" }
                            </button>
                            <p>{error}</p>
                        </form>
                    </div>
                </section>
                <footer className='h-96 w-full'>

                </footer>
            </main>
        )
    }

    export default CreateLising