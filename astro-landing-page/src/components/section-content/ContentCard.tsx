import { useTwitchApiData } from '../../hooks/useTwitchApiData'
import { CardStreamer } from '../section-streamer/CardStreamer'

type Props = {
  name: string
}

export function ContentCard ({ name }: Props) {
  const { twitchData } = useTwitchApiData({ name })

  return (
    <>
      <CardStreamer twitch={twitchData} />
    </>
  )
}
