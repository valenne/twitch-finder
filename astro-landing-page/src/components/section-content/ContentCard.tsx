import { useEffect, useState } from 'react'
import { getStreamerResources } from '../../hooks/useTwitchHooks'
import { TwitchProps } from '../../types/types.twitch'
import { CardStreamer } from '../section-streamer/CardStreamer'

type Props = {
  name: string
}

export function ContentCard ({ name }: Props): React.FunctionComponent {
  const [twitchData, setTwitchData] = useState<TwitchProps>()

  useEffect(() => {
    setTwitchData(null)
    // onReload delete information
    localStorage.removeItem('twitchInfo')

    if (!name) {
      return
    }

    Promise.all([getStreamerResources(name)]).then(data => {
      const twitch: TwitchProps = data[0]

      setTwitchData(twitch)
      // save information in the localStorage
      localStorage.setItem('twitchInfo', JSON.stringify(twitch))
    })
  }, [name])

  return (
    <>
      <CardStreamer twitch={twitchData} />
    </>
  )
}
