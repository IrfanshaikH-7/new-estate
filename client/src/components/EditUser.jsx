import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { updateUserSuccess, updateUserFailure, updateUserStart } from '../redux/user/userSlice';
import { Loader2 } from 'lucide-react';


export default function EditUser() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( formData ),
      });

      const data = await res.json();

      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data))
      toast.success("User uploaded successfully")

    } catch (error) {
      dispatch(updateUserFailure(error.message) )
    }
  }



  if (fileError) {
    toast.warning("Image upload failed")
  }
  if (filePerc === 100) {
    toast.success("Image uploaded successfully")
  }
  if(error){
    toast(error)
  }
  

  return (
    <div className='px-12 lg:px-24 py-4'>
      <h1 className='text-2xl font-semibold text-center py-2'>Edit Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 lg:gap-8 mt-12'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile img" className='h-24 w-24 object-cover aspect-square rounded-full cursor-pointer self-center mb-6' />
        <input type="text" id='username' placeholder='username'
          className='rounded-lg border border-slate-400 px-3 py-2 shadow-xl'
          defaultValue={currentUser.username}
          onChange={handleOnchange}
        />
        <input type="email" id='email' placeholder='email'
          className='rounded-lg border border-slate-400 px-3 py-2 shadow-xl'
          defaultValue={currentUser.email}
          onChange={handleOnchange}
        />
        <input type="password" id='password' placeholder='password'
          className='rounded-lg border border-slate-400 px-3 py-2 shadow-xl'
          onChange={handleOnchange}
        />
        <button disabled={loading} type='submit' className='bg-[#121212] text-white rounded-lg p-3 text-sm flex justify-center items-center'>{loading ? < Loader2 className='h-5 w-5 animate-spin text-center' /> : "Update"}</button>
      </form>
    </div>
  )
}
