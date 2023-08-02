import { useState } from 'react'
import { ContentCard } from './ContentCard'

export function ContentSection () {
  const [streamer, setStreamer] = useState<string>('')

  const handleSubmit = e => {
    e.preventDefault()
    const dataFromForm = new FormData(e.target)
    const { search } = Object.fromEntries(dataFromForm)
    setStreamer(search as string)
  }

  return (
    <section className='flex place-content-center mx-12 my-12'>
      <div className='h-full'>
        <h2 className='text-4xl mb-10 text-center'>
          Find your{' '}
          <span className='inline-block font-bold text-[#BF92EF]'>
            Streamer
          </span>
        </h2>
        <div className='flex flex-col justify-center'>
          <form onSubmit={e => handleSubmit(e)}>
            <div className='flex flex-col gap-2 place-items-center'>
              <label htmlFor='search'>Search 🔎</label>
              <input
                id='search'
                className='w-fit px-3 py-2 text-[#0e0e10] font-bold text-base rounded outline-[#97419B]'
                type='text'
                name='search'
                placeholder='Find your stremear'
              />
            </div>
            <div className='my-5 mx-auto grid place-content-center'>
              <button
                className='block bg-[#97419B] text-white text-base font-bold py-2 px-3 shadow-[3px_3px_0px_0px_#97419B] hover:scale-95 hover:shadow-[3px_3px_0px_0px_#BF92EF] rounded transition-all duration-150 ease-in-out'
                type='submit'
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className='flex place-content-center'>
          {streamer ? <ContentCard name={streamer} /> : ''}
        </div>
      </div>
    </section>
  )
}
