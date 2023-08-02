import { useEffect, useState } from 'react'
import {
  getStreamerChannel,
  getStreamerPerson,
  getStreamerResources
} from '../../hooks/useTwitchHooks'
import { PersonDescriptionProps, StreamerChannelProps } from '../../types/types'
import { TwitchProps } from '../../types/types.twitch'
import { CardStreamer } from '../section-streamer/CardStreamer'

type Props = {
  name: string
}

export function ContentCard ({ name }: Props): React.FunctionComponent {
  const [streamer, setStreamer] = useState<PersonDescriptionProps>()
  const [channel, setChannel] = useState<StreamerChannelProps>()
  const [twitchData, setTwitchData] = useState<TwitchProps>()

  useEffect(() => {
    setStreamer(null)
    // onReload delete information
    localStorage.removeItem('twitchInfo')

    if (!name) {
      return
    }

    Promise.all([
      getStreamerChannel(name),
      getStreamerPerson(name),
      getStreamerResources(name)
    ]).then(data => {
      const [channelData] = data[0].data.filter(
        (channel: StreamerChannelProps) => channel.broadcaster_login === name
      )
      const [personData] = data[1].data.filter(
        (person: PersonDescriptionProps) => person.login === name
      )

      const twitch: TwitchProps = data[2]

      setTwitchData(twitch)

      localStorage.setItem('twitchInfo', JSON.stringify(twitch))
    })
  }, [name])

  return (
    <div className='flex place-items-center mx-auto'>
      {twitchData ? (
        <div className='max-w-md bg-[#1f1f23] text-[#e0d5b0] py-4 px-8 rounded-lg my-20 mx-auto cursor-pointer group shadow-[5px_5px_0px_0px_#BF92EF] hover:shadow-[5px_5px_0px_0px_#97419B] transition-all duration-300 ease-in-out'>
          <div className='relative flex justify-center md:justify-end -mt-16'>
            <img
              className={`after:relative w-20 h-20 object-cover rounded-full aspect-square border-4 ${
                twitchData.channel.is_live
                  ? 'border-[#8fcb9b]'
                  : 'border-[#aeaaa8]'
              }   transition-all duration-300 ease-in-out`}
              src={twitchData.channel.thumbnail_url}
            />
            {/* pulse */}
            <span className='relative flex h-3 w-3'>
              <span
                className={`${
                  twitchData.channel.is_live
                    ? 'animate-ping bg-[#5B9279] opacity-75 absolute inline-flex h-full w-full rounded-full right-3'
                    : ''
                }`}
              ></span>
              <span
                className={`${
                  twitchData.channel.is_live
                    ? 'bg-[#8FCB9B] right-3'
                    : 'bg-[#aeaaa8] right-3'
                } relative inline-flex rounded-full h-3 w-3`}
              ></span>
            </span>
          </div>
          <div className='mt-6'>
            <div>
              <h2 className='text-[#BF92EF] text-3xl font-bold'>
                {twitchData.channel.display_name}
              </h2>
              <span className='block mt-2 text-[#aeaaa8]'>
                {twitchData.streamer.broadcaster_type}
              </span>
            </div>

            <p className='my-2 text-[#e0d5b0]'>
              {twitchData.streamer.description}
            </p>
          </div>

          <CardStreamer twitch={twitchData} />

          {/* <div className='flex justify-end mt-4'>
            <div className='w-full flex flex-row justify-between align-middle gap-2'>
              <p className='text-sm text-[#aeaaa8] border-b-2 border-transparent'>
                Since:{' '}
                {new Date(streamer.created_at)
                  .toLocaleDateString()
                  .replaceAll('/', '-')}
              </p>
              <p className='text-[#BF92EF] text-sm font-bold border-b-2 border-transparent hover:border-b-2 hover:border-[#97419B] transition-all duration-300 ease-in-out'>
                <a href={`${streamer.id}`} className='text-sm font-medium'>
                  twitch/{streamer.login}
                </a>
              </p>
            </div>
          </div> */}
        </div>
      ) : (
        <div className='mt-5'>
          <p className='text-center text-2xl'>Loading...</p>
        </div>
      )}
    </div>
  )
}
