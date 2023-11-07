import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { X } from 'lucide-react'
import EditUser from '../components/EditUser'

const Profile = () => {
  const [editUserState, setEditUserState] = useState(false)
  const { currentUser } = useSelector((state) => state.user)

  const handleEditUserClick = () => {
    setEditUserState(true)

  }
  return (
    <>
      <main className='relative h-screen w-full p-2'>

        <div className='h-72 lg:h-96 w-full bg-[#121212] rounded-lg'></div>
        <section className='flex flex-col justify-center items-center max-w-2xl mx-auto gap-0.5'>
          <img src={currentUser.avatar} alt="Profile" className='h-28 w-28 rounded-full border-white border-[6px] aspect-square object-cover -mt-14 cursor-pointer' />
          <h4 className='text-black font-semibold text-xl'>{currentUser.username}</h4>
        </section>

        <section className='flex justify-center gap-4 py-6'>
          <div className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer' onClick={handleEditUserClick}>
            Edit user
          </div>
          <div className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer'>
            Delete A/c
          </div>
          <div className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer'>
            Sign out
          </div>
        </section>

        {
          editUserState &&
          <div className='h-screen w-full px-12 flex justify-center items-center border  bg-transparent backdrop-blur-md absolute m-auto left-0 right-0 top-0 bottom-0'>

            <div className='h-3/4 w-full max-w-3xl border bg-white shadow-2xl rounded-lg relative'>
              <X className='text-slate-700 absolute right-0 m-2 cursor-pointer' onClick={() => setEditUserState(false)} />
              <EditUser />
            </div>
          </div>
        }
      </main>

    </>
  )
}

export default Profile
{/* <main className='relative h-screen w-full p-2 bg-red-700'>
        <div className='h-72 lg:h-96 w-full bg-[#121212] rounded-lg'></div>
        <form className='flex flex-col justify-center items-center max-w-2xl mx-auto gap-4'>
          <img src={currentUser.avatar} alt="Profile" className='h-28 w-28 rounded-full border-white border-[6px] aspect-square object-cover -mt-14 cursor-pointer'/>
          <div className='bg-[#121212] rounded-lg px-3 py-1 text-white' onClick={handleEditUserClick}>Edit user</div>
        </form>

        {
          editUserState &&
          <div className='h-72 w-72 bg-orange-600 absolute'>

          </div>
        }
      </main> */}
