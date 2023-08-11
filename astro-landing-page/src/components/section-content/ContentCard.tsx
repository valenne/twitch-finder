import { useEffect, useState } from 'react'
import { getStreamerResources } from '../../hooks/hooksExporter'
import { CONSTANTS, TwitchProps } from '../../types/typesExporter'
import { CardStreamer } from '../section-streamer/CardStreamer'

type Props = {
  name: string
}

export function ContentCard ({ name }: Props): React.FunctionComponent {
  const [twitchData, setTwitchData] = useState<TwitchProps>()

  useEffect(() => {
    setTwitchData(null)
    // onReload delete information
    localStorage.removeItem('')

    if (!name) {
      return
    }

    Promise.all([getStreamerResources(name)]).then(data => {
      const twitch: TwitchProps = data[0]

      setTwitchData(twitch)
      // save information in the localStorage
      localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, JSON.stringify(twitch))
    })
  }, [name])

  return (
    <>
      <CardStreamer twitch={twitchData} />
    </>
  )
}
