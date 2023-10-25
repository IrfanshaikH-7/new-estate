import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=' h-16 w-full bg-slate-300 flex justify-between rounded-b-xl items-center px-12 shadow-md'>
        <Link to='/'><h1 className='text-2xl text-white'>Real<span className='text-lime-300 font-semibold'>Estate</span></h1></Link>
        <ul className='flex gap-2'>
            <Link to='/'><li className='text-white hover:text-lime-300 transition-all duration-300'>Home</li></Link>
            <Link to='/about'><li className='text-white hover:text-lime-300 transition-all duration-300'>About</li></Link>
            <Link to='/sign-in'><li className='text-white hover:text-lime-300 transition-all duration-300'>SignIn</li></Link>

        </ul>
    </header>
  )
}

export default Header
