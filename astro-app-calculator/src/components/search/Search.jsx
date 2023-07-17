function Search () {
  const handleChange = e => {
    e.preventDefault()
    console.log(e.target.value)
  }

  return (
    <div className='flex flex-row justify-center items-center mx-auto border border-white rounded-lg'>
      <input
        onChange={e => handleChange(e)}
        className='h-fit w-fit p-2 rounded-l-lg bg-black'
      />
      <button className='px-4 py-2 rounded-r-lg bg-sky-200 text-black hover:bg-[#35285be2] hover:text-white ease-in-out duration-150'>
        TEST
      </button>
    </div>
  )
}

export default Search
