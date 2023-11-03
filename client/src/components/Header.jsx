import { Link } from 'react-router-dom'

// #121212  #e2e2e2 #f8f8f8 #ffffff
const Header = () => {
  return (
    <header className=' h-16 w-full bg-[#fff] flex justify-between rounded-b-xl items-center px-12 shadow-md'>
        <Link to='/'><h1 className='text-2xl text-zinc-600'>Real<span className='text-[#121212] font-semibold'>Estate</span></h1></Link>
        <ul className='flex gap-2'>
            <Link to='/'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>Home</li></Link>
            <Link to='/about'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>About</li></Link>
            <Link to='/sign-in'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>SignIn</li></Link>

        </ul>
    </header>
  )
}

export default Header
