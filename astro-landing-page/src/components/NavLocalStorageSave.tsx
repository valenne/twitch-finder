import { useEffect, useState } from 'react';
import { imgs } from '../assets/images/imageExport';
import { getWindowSize } from '../hooks/useMediaQuery';

function Nav() {
	const [toggled, setToggled] = useState(false);
	const [windowSize, setWindowSize] = useState(getWindowSize());

	useEffect(() => {
		function handleWindowResize() {
			setWindowSize(getWindowSize());
		}

		window.addEventListener('resize', handleWindowResize);

		return () => {
			window.removeEventListener('resize', handleWindowResize);
		};
	}, []);

	console.log(windowSize.mediaQuery);

	return (
		<nav className='relative mx-8 mb-24'>
			<div className='flex flex-row justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32'>
				{/* separator */}
				<span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[2px] bg-black'></span>
				<div>
					<img
						className='rounded-full'
						src={imgs.avatarPhoto.img}
						alt={imgs.avatarPhoto.alt}
						width={70}
						height={70}
					/>
				</div>
				<div>
					<h1 className='text-lg font-bold'>
						<a href='/'>Val.</a>
					</h1>
				</div>
				{/* hamburguer */}
				{windowSize && (
					<div
						onClick={() => setToggled((prevToggled) => !prevToggled)}
						className='space-y-1 cursor-pointer'
						id=''>
						<span className='block h-0.5 w-8 bg-black'></span>
						<span className='block h-0.5 w-6 bg-black'></span>
						<span className='block h-0.5 w-4 bg-black'></span>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Nav;
