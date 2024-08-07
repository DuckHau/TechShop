import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    }
  }, [keyword])

  const searchHandler = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.trim())
  }

  return (
    <form
      method='post'
      id='search_form-one'
      onSubmit={searchHandler}
      style={{ width: '25rem' }}
    >
      <div className='flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end'>
        <div className='w-full max-w-lg lg:max-w-xs'>
          <label htmlFor='search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <MagnifyingGlassIcon
                className='h-5 w-5 text-gray-400'
                aria-hidden='true'
              />
            </div>
            <input
              id='search'
              name='search'
              className='block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm'
              type='search'
              placeholder='Tìm kiếm sản phẩm của bạn...'
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default Search
