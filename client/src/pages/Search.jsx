import React, { useEffect, useRef, useState } from 'react'
import { LocateIcon, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem';

const SearchPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const [showMore, setShowMore] = useState(false)

  const [searchData, setSearchData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc'

  })

  console.log(searchData);
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
  const handleSubmit = (e) => {
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
    const typeFromUrl =  urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    

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
        if (data.length > 8) {
          setShowMore(true)
        }else {
          setShowMore(false)
        }
        setListings(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fecthListing();



  }, [location.search])

  const handleShowMoreClick = async () => {
    const numberOfListing = listings.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([ ...listings, ...data ]);
  }
  return (
    <main className='h-full w-full '>
      <div className='h-full w-full relative px-4 flex gap-4'>
        <section className=' h-fit lg:w-1/3 relative ' >
          <div className='mt-20 xl:px-8 w-1/3 px-2 rounded-lg hidden lg:flex fixed'>
            <form onClick={handleSubmit} className=' h-fit flex flex-col py-4 gap-2 justify-center w-full'>
              <div className='relative h-fit w-full '>
                <input
                  type="text"
                  id='searchTerm'
                  placeholder='Search...'
                  className='py-3 px-4 border border-[#121212] rounded-lg w-full '
                  value={searchData.searchTerm}
                  onChange={handleChange}
                />
                <button type='submit' className='absolute bg-[#121212] right-1 top-[5.5px] px-2 rounded-lg hover:bg-neutral-800'>
                  <Search className='text-white p-3 h-10 w-10 ' />
                </button>
              </div>
              <section className='flex gap-2 '>
                <div className='h-fit w-fit space-y-6 '>
                  <section className='flex flex-wrap gap-4'>

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
          </div>
        </section>

        <section className='lg:w-2/3 w-full self-end justify-self-end ml-auto py-20 px-4 '>
          <div className='grid md:grid-cols-2  gap-8'>
            {
              !loading && listings && (
                listings.map((listing, i) => (
                  <div key={listing._id}>
                 <ListingItem listing={listing} />

                  </div>

                ))
              )
            }
          </div>

          {
             showMore && (
              <div className='w-fit mx-auto py-8'>
                <button onClick={handleShowMoreClick} className='text-[#121212] font-semibold text-xl text-center'>Show more</button>
              </div>  
            )
          }
        </section>
      </div>

    </main>

  )
}

export default SearchPage
