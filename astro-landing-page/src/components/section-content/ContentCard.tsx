import { useEffect, useState } from 'react';
import { getStreamer } from '../../hooks/useTwitchHooks';
import { StreamerProps } from '../../types/types';

type Props = {
	name: string;
};

export function ContentCard({ name }: Props): React.FunctionComponent {
	const [streamer, setStreamer] = useState<StreamerProps>();

	useEffect(() => {
		if (!name) {
			return;
		}
		getStreamer(name).then((res) => {
			const persons = res.data;

			const [checkingPerson] = persons.filter(
				(person: StreamerProps) => person.broadcaster_login === name
			);

			setStreamer(checkingPerson);
		});
	}, [name]);

	return (
		<div className='flex place-items-center mx-auto'>
			{streamer ? (
				<div className='max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 mx-auto'>
					<div className='flex justify-center md:justify-end -mt-16'>
						<img
							className='w-20 h-20 object-cover rounded-full border-2 border-indigo-500'
							src={streamer.thumbnail_url}
						/>
					</div>
					<div>
						<h2 className='text-gray-800 text-3xl font-semibold'>Design Tools</h2>
						<p className='mt-2 text-gray-600'>{streamer.title}</p>
					</div>
					<div className='flex justify-end mt-4'>
						<a
							href='#'
							className='text-xl font-medium text-indigo-500'>
							{streamer.display_name}
						</a>
					</div>
				</div>
			) : (
				<p className='text-center'>Esperando...</p>
			)}
		</div>
	);
}
