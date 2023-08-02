import { PersonDescriptionProps, StreamerChannelProps } from '../../types/types'
import { TwitchProps } from '../../types/types.twitch'

type TwitchData = {
  channelData: StreamerChannelProps
  personData: PersonDescriptionProps
}

export function TwitchStreamer () {
  const { badges, channel, emotes, followers, streamer }: TwitchProps =
    JSON.parse(window.localStorage.getItem('twitchInfo'))

  return (
    <section className='mx-16 md:mx-32'>
      <div className='grid grid-cols-1 md:grid-cols-2 place-items-center'>
        <div>
          <h1>NAME</h1>
        </div>
        <picture>
          <img
            src={channel.thumbnail_url}
            alt='twitch profile image of the streamer'
            className='min-w-fit rounded-md'
          />
        </picture>
        <div>
          <p>Hola</p>
        </div>
      </div>
    </section>
  )
}
