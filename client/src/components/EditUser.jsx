import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from "../firebase"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { toast } from 'sonner';


export default function EditUser() {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

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
    
    if(fileError){
      toast("Image upload failed")
    }
    if(filePerc === 100){
      toast("Image uploaded successfully")
    }
  
  return (
    <div className='px-12 lg:px-24 py-4'>
      <h1 className='text-2xl font-semibold text-center py-2'>Edit Profile</h1>
      <form className='flex flex-col gap-4 lg:gap-8 mt-12'>
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile img" className='h-24 w-24 object-cover aspect-square rounded-full cursor-pointer self-center mb-6' />
        <input type="text" id='username' placeholder='username'
          className='rounded-lg border border-slate-400 px-3 py-2 shadow-xl'
        />
        <input type="email" id='email' placeholder='email'
          className='rounded-lg border border-slate-400 px-3 py-2 shadow-xl'
        />
        <input type="password" id='password' placeholder='password'
          className='rounded-lg border border-slate-400 px-3 py-2 shadow-xl'
        />
        <button className='bg-[#121212] text-white rounded-lg px-3 py-2 text-sm'>Update</button>
      </form>
    </div>
  )
}
