import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'sonner';


const Contact = ({listingData}) => {

    const [ landlord, setLandLord ] = useState(null);
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        const fetchLanlord =  async() => {
            try {
                const res = await fetch(`/api/user/${listingData.userRef}`);
                const data = await res.json();
                // if(data.success === false){
                //     toast.error("failed to get user data")
                // }
                setLandLord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLanlord()
    },[listingData.userRef])

    return (
        <>
        {
            landlord && (
                <div className='w-full relative'>
                    <p  className="absolute text-xs -mt-2 bg-white px-2   mb-4">
                        Contact {' '}
                        <span className='font-semibold '>{landlord.username}</span>
                        {' '}
                        for
                        {' '}
                        <span className='font-semibold '>{listingData.name}</span>
                    </p>
            <textarea
            name='message' id='message'
            value={message}
            onChange={e=>setMessage(e.target.value)}
                className='border border-[#121212] rounded-lg h-32 w-full appearance-none resize-none p-4 placeholder-slate-600'
                rows={6}
                placeholder='Enter your query'
            >
            </textarea>
            <Link 
            to={`mailto:${landlord.email}?subject=Regarding ${listingData.name}&body=${message}`}
            className='px-10 py-px bg-[#121212] text-white absolute -bottom-2 -right-1 rounded-lg border-4 ring-0 focus:ring-0 focus:ring-offset-0 outline-0 focus:outline-0 focus:outline-offset-0 border-white hover:bg-neutral-800'
            >
                Proceed
            </Link>
        </div>
            )
        }
        </>
        // <div className='w-full '>
        //     <textarea
        //         className='border border-[#121212] rounded-lg h-32 w-full appearance-none resize-none p-4 placeholder-slate-600'
        //         rows={6}
        //         placeholder='Enter your query'
        //     >

        //     </textarea>
        // </div>
    )
}

export default Contact
