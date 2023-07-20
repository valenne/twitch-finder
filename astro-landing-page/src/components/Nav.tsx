import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { avatarUrl } from '../assets/images/images';
import { getWindowSize } from '../hooks/useMediaQuery';

// motion config animated links

const motionConfig = {
	navMotion: {
		visible: {
			opacity: 1,
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.15
			},
			hidden: {
				opacity: 0
			}
		}
	},
	itemMotion: {
		visible: { opacity: 1, x: 0 },
		hidden: { opacity: 0, x: -100 }
	}
};

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
	}, [windowSize]);

	return (
		<nav className='relative mx-8 mb-24'>
			<div className='flex flex-row h-full justify-between items-center pt-12 pb-6 font-medium md:mx-16 lg:mx-32'>
				{/* separator line */}
				<span className='absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] h-[2px] bg-black'></span>
				<div>
					<img
						className='rounded-full object-cover aspect-square border border-black '
						src={avatarUrl}
						width={70}
						height={70}
					/>
				</div>

				{/* cuando alcanza los 1280px de width, aparece la navegacion basado en flex flex-row */}
				{windowSize.mediaQuery && (
					<div className='flex items-center justify-between font-bold min-w-fit my-auto'>
						<div className='flex flex-row gap-4'>
							<div className='h-10 grid place-content-center'>
								<a
									className='text-lg font-bold hover:text-[#423040] transition-all duration-300 ease-in-out group'
									href='/'>
									<span className='group-hover:text-[#c6614d] group-hover:text-xl transition-all duration-200 ease-in-out'>
										H
									</span>
									ome
								</a>
							</div>
							<div className='h-10 grid place-content-center'>
								<a
									className='text-lg font-bold hover:text-[#423040] transition-all duration-300 ease-in-out group'
									href='/services'>
									<span className='group-hover:text-[#c6614d] group-hover:text-xl transition-all duration-200 ease-in-out'>
										S
									</span>
									ervices
								</a>
							</div>
							<div className='h-10 grid place-content-center'>
								<a
									className='text-lg font-bold hover:text-[#423040] transition-all duration-300 ease-in-out group'
									href='/contact'>
									<span className='group-hover:text-[#c6614d] group-hover:text-xl transition-all duration-200 ease-in-out'>
										C
									</span>
									ontact
								</a>
							</div>
						</div>
					</div>
				)}

				<div>
					<h1 className='text-2xl font-bold group'>
						<a href='/'>
							<span className='group-hover:text-[#c7614d] duration-200 ease-in-out delay-0'>V</span>
							<span className='group-hover:text-[#fca683] duration-200 ease-in-out delay-75'>
								a
							</span>
							<span className='group-hover:text-[#757a73] duration-200 ease-in-out delay-100'>
								l.
							</span>
						</a>
					</h1>
				</div>

				{/* hamburguer */}
				{!windowSize?.mediaQuery && (
					<div
						onClick={() => setToggled((prevToggled) => !prevToggled)}
						className='space-y-1.5 cursor-pointer z-50'>
						<motion.span
							animate={{ rotateZ: toggled ? 45 : 0, y: toggled ? 8 : 0 }}
							className='block h-0.5 w-8 bg-black'></motion.span>
						<motion.span
							animate={{ width: toggled ? 0 : 24 }}
							className='block h-0.5 w-6 bg-black'></motion.span>
						<motion.span
							animate={{
								rotateZ: toggled ? -45 : 0,
								y: toggled ? -8 : 0,
								width: toggled ? 32 : 16
							}}
							className='block h-0.5 w-4 bg-black'></motion.span>
					</div>
				)}

				{/* toggled menu onClick hamburguer */}
				{toggled && !windowSize.mediaQuery && (
					<motion.div
						animate={{ opacity: 1, x: 0 }}
						initial={{ opacity: 0, x: 25 }}
						className='fixed flex bg-white bottom-0 left-0 w-full h-screen items-center justify-center font-bold z-10'>
						<motion.div
							className={`flex flex-col gap-12`}
							variants={motionConfig.navMotion}
							animate='visible'
							initial='hidden'>
							<motion.div variants={motionConfig.itemMotion}>
								<a href='/'>Home</a>
							</motion.div>
							<motion.div variants={motionConfig.itemMotion}>
								<a href='/services'>Services</a>
							</motion.div>
							<motion.div variants={motionConfig.itemMotion}>
								<a href='/contact'>Contact</a>
							</motion.div>
						</motion.div>
					</motion.div>
				)}
			</div>
		</nav>
	);
}

export default Nav;
