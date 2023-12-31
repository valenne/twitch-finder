import { relativeTime, roundedFollowers } from '../../helper/helpers.js'
import { TwitchProps } from '../../types/types-exporter.js'
import { IconLoading } from '../icons/icon-exporter.js'

type CardProps = {
  twitch: TwitchProps
}
export function CardStreamer ({ twitch }: CardProps) {
  return (
    <div className='flex mx-auto place-items-center'>
      {twitch ? (
        <a
          className='max-w-md bg-[#1f1f23] text-[#e0d5b0] py-4 px-8 rounded-lg my-20 mx-auto cursor-pointer opacity-80 hover:opacity-100 group shadow-[5px_5px_0px_0px_#BF92EF] hover:shadow-[5px_5px_0px_0px_#97419B] transition-all duration-300 ease-in-out'
          href={`streamer?name=${twitch.streamer?.display_name}`}
        >
          <div className='flex justify-center -mt-16 md:justify-end'>
            <img
              className={`after:relative w-20 h-20 object-cover rounded-full aspect-square border-4 ${
                twitch.channel?.is_live
                  ? 'border-[#8fcb9b]'
                  : 'border-[#aeaaa8]'
              }   transition-all duration-300 ease-in-out`}
              src={twitch.streamer?.profile_image_url}
            />
            {/* pulse */}
            <span className='relative flex w-3 h-3'>
              <span
                className={`${
                  twitch.channel?.is_live
                    ? 'animate-ping bg-[#5B9279] opacity-75 absolute inline-flex h-full w-full rounded-full right-3'
                    : ''
                }`}
              ></span>
              <span
                className={`${
                  twitch.channel?.is_live
                    ? 'bg-[#8FCB9B] right-3'
                    : 'bg-[#aeaaa8] right-3'
                } relative inline-flex rounded-full h-3 w-3`}
              ></span>
            </span>
          </div>
          <div className='mt-6'>
            <div>
              <div className='relative flex flex-row justify-between place-items-center'>
                <h2 className='text-[#BF92EF] text-3xl font-bold'>
                  {twitch.streamer?.display_name}
                </h2>

                <div className='relative group/followers'>
                  <span className='block text-[#aeaaa8]'>
                    Followers: {roundedFollowers(twitch.followers)}
                  </span>
                  <span className='absolute mx-auto -top-10 translate-x-1/2 p-2 rounded-lg opacity-0 group-hover/followers:opacity-100 duration-200 bg-[#0e0e10] text-[#e0d5b0]'>
                    {twitch.followers}
                  </span>
                </div>
              </div>

              <span className='block mt-2 text-[#aeaaa8]'>
                {twitch.streamer?.broadcaster_type}
              </span>
            </div>

            <p className='my-2 text-[#e0d5b0]'>{twitch.channel?.title}</p>
            <p className={` text-[#e0d5b0] flex flex-row gap-1`}>
              {' '}
              Live:
              <span
                className={`font-bold ${
                  twitch.channel?.is_live
                    ? ' animate-pulse animate-infinite animate-ease-linear text-[#8FCB9B] w-fit h-fit'
                    : 'font-normal text-[#aeaaa8]'
                }`}
              >
                {twitch.channel?.started_at
                  ? ` ${relativeTime(twitch.channel?.started_at, 'en')}`
                  : ' Offline'}
              </span>
              <span>
                on
                <span
                  className={`font-bold ${
                    twitch.channel?.is_live
                      ? ' animate-pulse animate-infinite animate-ease-linear text-[#8FCB9B] w-fit h-fit'
                      : 'font-normal text-[#aeaaa8]'
                  }`}
                >
                  {` ${twitch.channel?.game_name} `}
                </span>
                category
              </span>
            </p>
          </div>

          <div className='flex justify-end mt-4'>
            <div className='flex flex-row justify-between w-full gap-2 align-middle'>
              <p className='text-sm text-[#aeaaa8] border-b-2 border-transparent'>
                Since:{' '}
                {new Date(twitch.streamer?.created_at)
                  .toLocaleDateString()
                  .replaceAll('/', '-')}
              </p>
              <p className='text-[#BF92EF] text-sm font-bold border-b-2 border-transparent hover:border-b-2 hover:border-[#97419B] transition-all duration-300 ease-in-out'>
                <a
                  href={`streamer?name=${twitch.streamer?.display_name}`}
                  className='text-sm font-medium'
                >
                  twitch/{twitch.streamer?.login_name}
                </a>
              </p>
            </div>
          </div>
        </a>
      ) : (
        <div className=''>
          <div className='text-center'>
            <IconLoading twClass='animate-spin text-[#e0d5b0] stroke-2 h-10 w-10' />
          </div>
        </div>
      )}
    </div>
  )
}
