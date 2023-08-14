import {
  languageNames,
  returningContrastCheckColors,
  stringToCapitalCase
} from '../../helpers/helpers'
import { useTwitchEmote, useUrlGameFixed } from '../../hooks/hooksExporter'
import { CONSTANTS, TwitchProps } from '../../types/typesExporter'
import { IconLoading, IconPartner } from '../icons/iconExporter'

export function TwitchStreamer () {
  const { badges, channel, emotes, followers, streamer, games }: TwitchProps =
    JSON.parse(window.localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY))
  const { gameUrl } = useUrlGameFixed(games)
  const emotesAfterModification = useTwitchEmote({
    emotes: emotes,
    key: 'url_2x',
    formatType: 'animated'
  })

  return (
    <section className='max-w-md md:max-w-lg lg:max-w-3xl mx-auto contrast-125 opacity-80 hover:opacity-100  transition-all duration-300 ease-in-out mb-20'>
      <div className='p-8 rounded-lg bg-[#18181b] border border-[#1f1f23] flex flex-col justify-center'>
        <div className='flex flex-row justify-center gap-1 mb-6 align-middle place-items-center'>
          <h2 className='text-3xl w-fit'>{streamer.display_name}</h2>
          <span className='w-fit'>
            {streamer.broadcaster_type === 'partner' ? <IconPartner /> : ''}
          </span>
        </div>
        <div className='grid w-full grid-cols-1 place-items-center'>
          <picture className='block mx-auto mb-4 w-52 h-52'>
            <img
              className='object-center rounded-lg hover:translate-x-1 hover:-translate-y-1 duration-100 ease-linear border-l-4 border-b-4 border-transparent hover:border-[#97419B]'
              src={streamer.profile_image_url}
              alt='twitch profile image of the streamer'
            />
          </picture>
          <div className='flex flex-row flex-wrap justify-center w-full gap-2 mb-10'>
            {channel.tags.map((tag, ind) => (
              <div
                key={ind}
                role='tags_random_color'
                className='block p-1 font-bold duration-100 ease-linear border rounded-md min-w-fit hover:scale-95'
                style={{
                  backgroundColor: returningContrastCheckColors().bgColor,
                  color: returningContrastCheckColors().textColor
                }}
              >
                <span className='block text-sm'>{tag}</span>
              </div>
            ))}
          </div>
          {/* twitch live video */}
          {channel.is_live ? (
            <div className=' p-5 bg-[#1f1f23] rounded-lg'>
              <iframe
                src={`https://player.twitch.tv/?channel=${streamer.login_name}&parent=localhost`}
                width='400'
                height='300'
                title={`stream live twitch/${streamer.login_name}`}
                className='max-w-xs aspect-video md:max-w-md'
              ></iframe>
            </div>
          ) : null}
          <div className='flex flex-col gap-6 p-8'>
            {/* personal description */}
            <div id='personal_description px-5'>
              <h3 className='mb-4 text-2xl text-center text-white bold'>
                Personal Description
              </h3>
              <div className='flex flex-col gap-5 mb-5 justify-normal lg:text-center lg:gap-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Channel Description:
                </label>
                <p className='text-[#dedee3]'>
                  {streamer.description || 'Description not established'}
                </p>
              </div>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:flex-col lg:text-center lg:gap-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Broadcaster Type:
                </label>
                <p className='text-[#dedee3]'>
                  {stringToCapitalCase(streamer.broadcaster_type)}
                </p>
              </div>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:flex-col lg:gap-2 lg:text-center'>
                <label className='text-base font-bold min-w-fit'>
                  → Since:
                </label>
                <p className='text-[#dedee3]'>
                  {new Date(streamer.created_at).toLocaleDateString('en-US')}
                </p>
              </div>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:gap-2 lg:flex-col lg:text-center'>
                <label className='text-base font-bold min-w-fit'>
                  → Email:
                </label>
                <p className='text-[#dedee3]'>
                  {streamer.email || 'User has not defined 🤷‍♂️'}
                </p>
              </div>
            </div>
            {/* channel description */}
            <div id='channel_description px-5'>
              <h3 className='mb-4 text-2xl text-center text-white bold'>
                Channel Description
              </h3>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:gap-2 lg:flex-col lg:text-center'>
                <label className='text-base font-bold min-w-fit'>
                  → Main Language:
                </label>
                <p className='text-[#dedee3]'>
                  {languageNames(
                    stringToCapitalCase(channel.broadcaster_language)
                  )}
                </p>
              </div>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:gap-2 lg:flex-col lg:text-center'>
                <label className='text-base font-bold min-w-fit'>
                  → Favorite Game:
                </label>
                <p className='text-[#dedee3]'>{channel.game_name}</p>
              </div>
              <div className='flex flex-col gap-5 mb-5 justify-normal lg:text-center lg:gap-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Last Title Stream:
                </label>
                <p className='text-[#dedee3]'>{channel.title}</p>
              </div>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:flex-col lg:gap-2 lg:text-center'>
                <label className='text-base font-bold min-w-fit'>
                  → Followers:
                </label>
                <p className='text-[#dedee3]'>
                  {new Intl.NumberFormat()
                    .format(followers)
                    .replaceAll(',', '.')}{' '}
                </p>
              </div>
            </div>
            {/*Current Game description */}
            <div className='px-5 current_game_description'>
              <h3 className='mb-4 text-2xl text-center text-white bold'>
                Current Game Description
              </h3>
              <div className='flex flex-row gap-5 mb-5 justify-normal lg:flex-col lg:gap-2 lg:text-center'>
                <label className='text-base font-bold min-w-fit'>
                  → Game Name:
                </label>
                <p className='text-[#dedee3]'>
                  {stringToCapitalCase(games.name)}
                </p>
              </div>
              <div className='flex flex-col gap-5 mb-5 justify-normal lg:text-center lg:gap-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Game Picture:
                </label>
                <picture className='items-center mx-auto'>
                  <img
                    className='rounded-lg hover:translate-x-1 hover:-translate-y-1 duration-100 ease-linear border-l-4 border-b-4 border-transparent hover:border-[#97419B]'
                    src={gameUrl}
                    alt={`show a img of ${games.name} game`}
                  />
                </picture>
              </div>
            </div>
            {/* emotes description */}
            <div className='px-5 emotes_description'>
              <h3 className='mb-4 text-2xl text-center text-white bold'>
                Channel Emotes
              </h3>
              <div className='flex flex-col gap-5 mb-5 justify-normal lg:text-center lg:gap-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Subscription Emotes:
                </label>
                <div className='flex flex-row flex-wrap justify-center gap-1 p-5 bg-[#1f1f23] rounded-lg border border-[#e0d5b0]'>
                  {emotesAfterModification ? (
                    emotesAfterModification.map(uniqueEmote => (
                      <div key={uniqueEmote.id} className='relative group'>
                        <picture className=' min-w-fit min-h-fit'>
                          <img
                            src={uniqueEmote.images}
                            alt={uniqueEmote.name}
                            className='transition-all duration-150 ease-linear rounded-full hover:scale-125'
                          />
                        </picture>
                        <div className='absolute top-16 z-20 flex flex-col gap-2 mx-auto text-center transition-all duration-150 ease-linear bg-[#1f1f23] rounded-md opacity-0 min-w-fit group-hover:opacity-100'>
                          <p className='p-1 text-sm min-w-fit'>
                            {uniqueEmote.name}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className='mt-5'>
                      <div className='text-center'>
                        <IconLoading twClass='animate-spin text-[#e0d5b0] stroke-2 h-10 w-10' />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/* emotes description */}
            <div className='px-5 badges_description'>
              <h3 className='mb-4 text-2xl text-center text-white bold'>
                Channel Badges
              </h3>
              <div className='flex flex-col gap-5 mb-5 justify-normal lg:text-center lg:gap-2'>
                <label className='text-base font-bold min-w-fit'>
                  → Subscription Badges:
                </label>
                <div className='flex flex-row flex-wrap justify-center gap-1 p-5 bg-[#1f1f23] rounded-lg border border-[#e0d5b0]'>
                  {badges.data?.map(badge => (
                    <div key={badge.id} className='relative group'>
                      <picture className=' min-w-fit min-h-fit'>
                        <img
                          src={badge.image_url_2x}
                          alt={badge.description}
                          className='transition-all duration-150 ease-linear rounded-full hover:scale-125'
                        />
                      </picture>
                      <div className='absolute top-10 z-20 flex flex-col gap-2 mx-auto text-center transition-all duration-150 ease-linear bg-[#1f1f23] rounded-md opacity-0 min-w-fit group-hover:opacity-100'>
                        <p className='p-1 text-sm min-w-fit'>{badge.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
