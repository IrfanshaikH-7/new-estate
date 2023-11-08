import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MoveLeft, Trash2Icon, X } from 'lucide-react'
import EditUser from '../components/EditUser'
import { deleteUserFailure, deleteUserSuccess, deleteUserStart, signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'

const Profile = () => {
  const [editUserState, setEditUserState] = useState(false)
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditUserClick = () => {
    setEditUserState(true)

  }

  const handleDeleteClick = async() => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return
      }
      dispatch(deleteUserSuccess(data))
      toast('User has been deleted')
      
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignoutClick = async() => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json()
      if(data.success === false){
        dispatch(signoutUserFailure(data.message))
        return
      }

      dispatch(signoutUserSuccess(data));
      toast.success("user logged out successfully")

    } catch (error) {
      dispatch(signoutUserFailure(error.message));
      
    }
  }
  return (
    <>
      <main className='relative h-screen w-full p-2'>

        <div className='h-72 lg:h-96 w-full bg-[#121212] rounded-lg px-4 py-2'> <MoveLeft className='h-10 w-10 bg-white text-black p-2 rounded-full cursor-pointer' onClick={()=> navigate('/')}/> </div>
        <div className='py-2 w-full'><div onClick={handleDeleteClick} className='py-2 px-6 w-fit  hover:bg-red-600/20 ml-auto rounded-lg transition-all duration-300 flex justify-center items-center text-xs text-red-600 gap-0.5 cursor-pointer'>Delete account <Trash2Icon className=' h-5 w-5 text-red-600'/></div></div>
        <section className='flex flex-col justify-center items-center max-w-2xl mx-auto gap-0.5 -mt-24'>
          <img src={currentUser.avatar} alt="Profile" className='h-32 w-32 rounded-full border-white border-[6px] aspect-square object-cover  cursor-pointer' />
          
          <h4 className='text-black font-semibold text-xl'>{currentUser.username}</h4>
        </section>

        <section className='flex justify-center gap-4 py-6'>
          <div className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer' onClick={handleEditUserClick}>
            Edit user
          </div>
          <div onClick={() => navigate('/listing')} className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer'>
            Add listing
          </div>
          <div onClick={handleSignoutClick} className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer'>
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
