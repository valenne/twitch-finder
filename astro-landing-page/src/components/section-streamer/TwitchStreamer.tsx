import {
  returningContrastCheckColors,
  stringToCapitalCase
} from '../../helpers/helpers'
import { TwitchProps } from '../../types/types.twitch'
import { IconPartner } from '../icons/IconPartner'

export function TwitchStreamer () {
  const { badges, channel, emotes, followers, streamer }: TwitchProps =
    JSON.parse(window.localStorage.getItem('twitchInfo'))

  return (
    <section className='mx-16 md:mx-32 contrast-125 opacity-80 hover:opacity-100 hover:shadow-[5px_10px_30px_-5px_rgba(239,170,205,0.1)] transition-all duration-300 ease-in-out'>
      <div className='p-4 rounded-lg bg-[#18181b] border border-[#1f1f23] '>
        <div className='flex flex-row justify-center gap-1 mb-6 align-middle place-items-center'>
          <h2 className='text-3xl'>{streamer.display_name}</h2>
          <span className='w-fit'>
            {streamer.broadcaster_type === 'partner' ? <IconPartner /> : ''}
          </span>
        </div>
        <div className='grid w-full grid-cols-1 md:grid-cols-2 place-items-center'>
          <picture className='block w-52 h-52 mb-4 border border-[#e0d5b0] rounded-md'>
            <img
              className='object-center mx-auto rounded-md'
              src={streamer.profile_image_url}
              alt='twitch profile image of the streamer'
            />
          </picture>
          <div className='flex flex-row flex-wrap justify-center w-full gap-2'>
            {channel.tags.map((tag, ind) => (
              <div
                key={ind}
                role='tags_random_color'
                className='block p-1 border rounded-md min-w-fit font-bold'
                style={{
                  backgroundColor: returningContrastCheckColors().bgColor,
                  color: returningContrastCheckColors().textColor
                }}
              >
                <span className='block text-sm'>{tag}</span>
              </div>
            ))}
          </div>
          <div className='flex flex-col gap-6 p-8'>
            {/* personal description */}
            <div id='personal_description'>
              <h3 className='mb-4 text-2xl text-center bold text-white'>
                Personal Description
              </h3>
              <div className='flex flex-col gap-2 justify-normal mb-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Channel Description:
                </label>
                <p className='text-[#dedee3]'>
                  {streamer.description || 'Description not established'}
                </p>
              </div>
              <div className='flex flex-row gap-5 justify-normal'>
                <label className='text-base font-bold min-w-fit'>
                  → Broadcaster Type:
                </label>
                <p className='text-[#dedee3]'>
                  {stringToCapitalCase(streamer.broadcaster_type)}
                </p>
              </div>
              <div className='flex flex-row gap-5 justify-normal'>
                <label className='text-base font-bold min-w-fit'>
                  → Since:
                </label>
                <p className='text-[#dedee3]'>
                  {new Date(streamer.created_at).toLocaleDateString('en-US')}
                </p>
              </div>
              <div className='flex flex-row gap-5 justify-normal'>
                <label className='text-base font-bold min-w-fit'>
                  → Email:
                </label>
                <p className='text-[#dedee3]'>
                  {streamer.email || 'User has not defined 🤷‍♂️'}
                </p>
              </div>
            </div>
            {/* channel description */}
            <div id='channel_description'>
              <h3 className='mb-4 text-2xl text-center bold text-white'>
                Channel Description
              </h3>
              <div className='flex flex-row gap-5 justify-normal'>
                <label className='text-base font-bold min-w-fit'>
                  → Main Language:
                </label>
                <p className='text-[#dedee3]'>
                  {stringToCapitalCase(channel.broadcaster_language)}
                </p>
              </div>
              <div className='flex flex-row gap-5 justify-normal'>
                <label className='text-base font-bold min-w-fit'>
                  → Favorite Game:
                </label>
                <p className='text-[#dedee3]'>{channel.game_name}</p>
              </div>
              <div className='flex flex-col gap-2 justify-normal mb-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Last Title Stream:
                </label>
                <p className='text-[#dedee3]'>{channel.title}</p>
              </div>
              <div className='flex flex-row gap-5 justify-normal'>
                <label className='text-base font-bold min-w-fit'>
                  → Email:
                </label>
                <p className='text-[#dedee3]'>
                  {streamer.email || 'User has not defined 🤷‍♂️'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
