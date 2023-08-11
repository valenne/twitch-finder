import { twMerge } from 'tailwind-merge'

type TwitchFinderProps = {
  twClass: string
}

export function TittleAnimation ({ twClass }: TwitchFinderProps) {
  return (
    <>
      <a href='/'>
        <div className='flex flex-row gap-1'>
          <div>
            <span className='text-[#dedee3] group-hover:text-[#BF92EF] duration-200 ease-in-out delay-0'>
              T
            </span>
            <span className='text-[#dedee3] group-hover:text-[#BF92EF] duration-200 ease-in-out delay-[20ms]'>
              w
            </span>
            <span className='text-[#dedee3] group-hover:text-[#BF92EF] duration-200 ease-in-out delay-[40ms]'>
              i
            </span>
            <span className='text-[#dedee3] group-hover:text-[#BF92EF] duration-200 ease-in-out delay-[60ms]'>
              t
            </span>
            <span className='text-[#dedee3] group-hover:text-[#BF92EF] duration-200 ease-in-out delay-[80ms]'>
              c
            </span>
            <span className='text-[#dedee3] group-hover:text-[#BF92EF] duration-200 ease-in-out delay-100'>
              h
            </span>
          </div>
          <span className={twMerge(' text-[#dedee3] ]', twClass)}>Finder</span>
        </div>
      </a>
    </>
  )
}
