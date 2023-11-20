import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'// -> To get redux state data
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Layout, Search, X } from 'lucide-react'

// mobile import
import { useRef } from 'react'

// #121212  #e2e2e2 #f8f8f8 #ffffff
const Header = () => {
  const { currentUser } = useSelector(state => state.user) // Getting state data of user
  const [searchTerm, setSearchTerm] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`)
  }
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermURL = urlParams.get('searchTerm');
    if (!!searchTermURL) {
      setSearchTerm(searchTermURL)
      setIsMobile(false)
    }


  }, [location.search])



  // Mobile funtions
  const [checkboxState, setCheckboxState] = useState(false)
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])

  const [searchData, setSearchData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc'

  })

  const handleChange = (e) => {
    if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sell') {
      setSearchData({ ...searchData, type: e.target.id })
    }

    if (e.target.id === 'searchTerm') {
      setSearchData({ ...searchData, searchTerm: e.target.value })
    }
    if (e.target.id === 'parking' || e.target.id === "furnished" || e.target.id === 'offer') {
      setSearchData({ ...searchData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSearchData({ ...searchData, sort, order })
    }

  }
  const handleSubmitMobile = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchData.searchTerm)
    urlParams.set('type', searchData.type)
    urlParams.set('parking', searchData.parking)
    urlParams.set('furnished', searchData.furnished)
    urlParams.set('offer', searchData.offer)
    urlParams.set('order', searchData.order)
    urlParams.set('sort', searchData.sort)

    const searchQuery = urlParams.toString();

    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermURL = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking')
    const furnishedFromUrl = urlParams.get('furnished')
    const offerFromUrl = urlParams.get('offer')
    const sortFromUrl = urlParams.get('sort')
    const orderFromUrl = urlParams.get('order')

    if (
      searchTermURL ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSearchData({
        searchTerm: searchTermURL || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc'
      })
    }
    const fecthListing = async () => {
      setLoading(true)
      try {
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        setListings(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fecthListing();



  }, [location.search])

  return (
    <>
      <header className={pathname === '/profile' ? 'hidden' : ` h-16 w-full bg-[#fff] flex justify-between rounded-b-xl items-center px-4 md:px-12 shadow-md fixed top-0 z-50`}>
        <div className='flex gap-4'>
          <Layout className='h-8 w-8 lg:hidden ' onClick={() => setIsMobile(true)} />
          <Link to='/'><h1 className='text-2xl text-zinc-600'>New<span className='text-[#121212] font-semibold'>Estate</span></h1></Link>
        </div>

        <form onSubmit={handleSubmit} className=' h-fit w-fit relative hidden lg:flex'>

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder='Search...'
            className='w-96 p-2 rounded-lg  border border-neutral-500'
          />
          <button type='submit' className='absolute bg-[#121212] right-1 top-[5.5px] px-2 rounded-lg hover:bg-neutral-800'>
            <Search className='text-white p-2 h-8 w-8 ' />
          </button>
        </form>
        <div className=' gap-4 flex justify-between items-center'>
          <ul className='flex gap-2'>
            <Link to='/'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>Home</li></Link>
            <Link to='/about'><li className='text-[#121212] hover:text-zinc-500 transition-all duration-300'>About</li></Link>
          </ul>
          {
            currentUser ? (
              <Link to='/profile'><img src={currentUser.avatar} alt="profile" className='rounded-full h-8 w-8 border-l-2 aspect-square object-cover' /></Link>
            ) : (
              <Link to='/sign-in' className='text-[#121212] hover:text-zinc-500 transition-all duration-300'> SignIn</Link>
            )
          }
        </div>



      </header>
      {
        isMobile && (
          <div className='w-96 z-50 h-full fixed translate-x-0 bg-white p-4 top-0'>
            <X className='h-4 w-4 ml-auto text-black p-0.5 border rounded-lg' onClick={() => setIsMobile(false)} />

            <section className='mt-12'>
              <form onClick={handleSubmitMobile} className=' space-y-8 h-fit flex flex-col py-4 gap-2 justify-center w-[400px]'>
                <div className='relative h-fit w-fit '>
                  <input
                    type="text"
                    id='searchTerm'
                    placeholder='Search...'
                    className='py-3 px-4 border border-[#121212] rounded-lg w-72'
                    value={searchData.searchTerm}
                    onChange={handleChange}
                  />
                  <button type='submit' className='absolute bg-[#121212] right-1 top-[5.5px] px-2 rounded-lg hover:bg-neutral-800'>
                    <Search className='text-white p-3 h-10 w-10 ' />
                  </button>
                </div>
                <section className='flex gap-2 '>
                  <div className='h-fit w-fit space-y-6 '>
                    <section className='flex  gap-4'>

                      <div className='flex items-center gap-2 h-fit'>
                        <input type="checkbox" id='all'
                          className='w-6 h-6 rounded-lg'
                          checked={searchData.type === 'all'}
                          onChange={handleChange}
                        />
                        <span>type</span>
                      </div>

                      <div className='flex items-center gap-2 h-fit'>
                        <input type="checkbox" id='rent'
                          className='w-6 h-6 rounded-lg'
                          checked={searchData.type === 'rent'}
                          onChange={handleChange}
                        />
                        <span>rent</span>
                      </div>

                      <div className='flex items-center gap-2 h-fit'>
                        <input type="checkbox" id='sell'
                          className='w-6 h-6 rounded-lg'
                          checked={searchData.type === 'sell'}
                          onChange={handleChange}
                        />
                        <span>sell</span>
                      </div>

                      <div className='flex items-center gap-2 h-fit'>
                        <input type="checkbox" id='offer'
                          className='w-6 h-6 rounded-lg'
                          checked={searchData.offer === true}
                          onChange={handleChange}
                        />
                        <span>offer</span>
                      </div>
                    </section>
                    <section className='flex flex-wrap gap-4'>

                      <div className='flex items-center gap-2 h-fit'>
                        <input type="checkbox" id='furnished'
                          className='w-6 h-6 rounded-lg'
                          checked={searchData.furnished === true}
                          onChange={handleChange}
                        />
                        <span>furnished</span>
                      </div>

                      <div className='flex items-center gap-2 h-fit'>
                        <input type="checkbox" id='parking'
                          className='w-6 h-6 rounded-lg'
                          checked={searchData.parking === true}
                          onChange={handleChange}
                        />
                        <span>parking</span>
                      </div>


                    </section>
                    <div className='h-full w-full flex justify-start items-center'>
                      <select id="sort_order"
                        className='bg-white border border-neutral-700 rounded-lg p-3 '
                        onChange={handleChange}
                        defaultValue={'create_at_desc'}
                      >
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                      </select>
                    </div>
                  </div>

                </section>



              </form>
            </section>
          </div>

        )
      }
    </>
  )
}

export default Header
