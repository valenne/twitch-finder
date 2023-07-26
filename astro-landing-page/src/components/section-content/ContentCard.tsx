import { useEffect, useState } from 'react';
import { getTwitchAuthorization } from '../../data/fetchingData';

type Props = {
	name: string;
};

export function ContentCard({ name }: Props): JSX.Element {
	const [streamerData, setStremearData] = useState({});

	// const promiseTest = useTwitchId(name);

	useEffect(() => {
		getTwitchAuthorization().then((response) => console.log(response));
	}, [name]);

	return <div>{name}</div>;
}
