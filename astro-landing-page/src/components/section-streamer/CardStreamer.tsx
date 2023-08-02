import { TwitchProps } from '../../types/types.twitch.js'

type CardProps = {
  twitch: TwitchProps
}
export function CardStreamer ({ twitch }: CardProps) {
  return (
    <div className='flex justify-end mt-4'>
      <div className='w-full flex flex-row justify-between align-middle gap-2'>
        <p className='text-sm text-[#aeaaa8] border-b-2 border-transparent'>
          Since:{' '}
          {new Date(twitch.streamer.created_at)
            .toLocaleDateString()
            .replaceAll('/', '-')}
        </p>
        <p className='text-[#BF92EF] text-sm font-bold border-b-2 border-transparent hover:border-b-2 hover:border-[#97419B] transition-all duration-300 ease-in-out'>
          <a
            href={`streamer?name=${twitch.channel.display_name}`}
            className='text-sm font-medium'
          >
            twitch/{twitch.channel.broadcaster_login}
          </a>
        </p>
      </div>
    </div>
  )
}
