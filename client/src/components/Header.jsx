import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'// -> To get redux state data

// #121212  #e2e2e2 #f8f8f8 #ffffff
const Header = () => {
  const { currentUser } = useSelector(state => state.user) // Getting state data of user
  const location = useLocation();
  const { pathname } = location;
  return (
    <header className={ pathname === '/profile' ? 'hidden' : ` h-16 w-full bg-[#fff] flex justify-between rounded-b-xl items-center px-12 shadow-md fixed top-0 z-50`}>
        <Link to='/'><h1 className='text-2xl text-zinc-600'>New<span className='text-[#121212] font-semibold'>Estate</span></h1></Link>
        <div className=' gap-4 flex justify-between items-center'>
          <ul className='flex gap-2'>
            <Link to='/'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>Home</li></Link>
            <Link to='/about'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>About</li></Link>
        </ul>
          {
            currentUser ? (
             <Link to='/profile'><img src={currentUser.avatar} alt="profile" className='rounded-full h-8 w-8 border-l-2 aspect-square object-cover'/></Link> 
            ) : (
              <Link to='/sign-in' className='text-[#121212] hover:text-zinc-500 transition-all duration-300'> SignIn</Link>
            )
          }
        </div>
        

    </header>
  )
}

export default Header
