import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Edit, LucideTrash2, MoveLeft, Trash2Icon, X } from 'lucide-react'
import EditUser from '../components/EditUser'
import { deleteUserFailure, deleteUserSuccess, deleteUserStart, signoutUserFailure, signoutUserStart, signoutUserSuccess } from '../redux/user/userSlice'
import { toast } from 'sonner'

const Profile = () => {

  const [editUserState, setEditUserState] = useState(false)
  const [listingState, setListingState] = useState([])
  console.log(listingState);
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditUserClick = () => {
    setEditUserState(true)
  }

  const handleDeleteClick = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return
      }
      dispatch(deleteUserSuccess(data))
      toast('User has been deleted')

    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignoutClick = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json()
      if (data.success === false) {
        dispatch(signoutUserFailure(data.message))
        return
      }

      dispatch(signoutUserSuccess(data));
      toast.success("user logged out successfully")

    } catch (error) {
      dispatch(signoutUserFailure(error.message));

    }
  }

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json();
      if (data.success === false) {
        return;
      }
      console.log(data);
      setListingState(data);
    }

    getListings();

  }, []);

  const handleDeleteListingClick = async (listingId) => {
    console.log(listingId)
    const res = await fetch(`/api/listing/delete/${listingId}`, { method: 'DELETE' });
    const data = await res.json()
    if (data.success === false) {
      toast.error("failed to delete listing.")
    }

    setListingState((prev) => prev.filter((listing) => listing._id !== listingId));
    toast.success("Listing has been deleted")
  }

  return (
    <>
      <main className='relative h-screen w-full p-2'>

        <div className='h-72 lg:h-96 w-full bg-[#121212] rounded-lg px-4 py-2'> <MoveLeft className='h-10 w-10 bg-white text-black p-2 rounded-full cursor-pointer' onClick={() => navigate('/')} /> </div>
        <div className='py-2 w-full'><div onClick={handleDeleteClick} className='py-2 px-6 w-fit  hover:bg-red-600/20 ml-auto rounded-lg transition-all duration-300 flex justify-center items-center text-xs text-red-600 gap-0.5 cursor-pointer'>Delete account <Trash2Icon className=' h-5 w-5 text-red-600' /></div></div>
        <section className='flex flex-col justify-center items-center max-w-2xl mx-auto gap-0.5 -mt-24'>
          <img src={currentUser.avatar} alt="Profile" className='h-32 w-32 rounded-full border-white border-[6px] aspect-square object-cover  cursor-pointer' />

          <h4 className='text-black font-semibold text-xl'>{currentUser.username}</h4>
        </section>

        <section className='flex justify-center gap-4 py-6'>
          <div className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer' onClick={handleEditUserClick}>
            Edit user
          </div>
          <div onClick={() => navigate('/create-listing')} className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer'>
            Add listing
          </div>
          <div onClick={handleSignoutClick} className='bg-[#121212] text-white text-sm px-4 py-2 w-28 text-center  rounded-lg cursor-pointer'>
            Sign out
          </div>
        </section>
        <h2 className='w-full p-2 bg-[#121212] text-center font-semibold text-2xl text-white mt-28 rounded-lg'> Your  listings</h2>

        <section className='h-auto w-auto px-8 py-12 max-w-fit xl:max-w-6xl mx-auto grid grid-cols-2  lg:grid-cols-3 gap-2 '>
          {
            listingState.length > 0 && (

              listingState.map((listing) => (
                <div key={listing._id} className='relative h-fit border-2 w-fit aspect flex flex-col items-center justify-center group rounded-lg overflow-hidden'>
                  <Link to={`/listing/${listing?._id}`} className='h-full w-full'>
                    <img src={listing.images[0]} alt="listing-img" className='aspect-video h-28 sm:h-36 lg:h-40  xl:h-48 object-cover  rounded-t-lg' />
                  </Link>
                  <div className='h-full w-full space-y-1 py-1'>
                    <Link to={`/listing/${listing?._id}`}>
                      <p className='text-slate-800 text-base'>{listing.name}</p>
                    </Link>
                    <p className='text-base'><span className='line-through text-slate-800 text-sm'>${listing.regularPrice} /</span>{' '}${listing.discountedPrice}</p>
                  </div>
                  <div className='absolute hidden group-hover:flex justify-between items-center top-0 right-0 gap-3 px-4 py-2 bg-[#212121] opa rounded-lg m-1'>
                    <LucideTrash2 className='h-4 w-4 text-white opacity-80 hover:opacity-100 cursor-pointer'
                      onClick={() => handleDeleteListingClick(listing._id)}
                    />
                    <Edit className='h-4 w-4 text-white opacity-80 hover:opacity-100 cursor-pointer'
                      onClick={() => navigate(`/update-listing/${listing._id}`)}
                    />
                  </div>
                </div>
              ))
            )
          }
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
