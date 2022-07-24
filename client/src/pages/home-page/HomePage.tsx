import React from 'react'
import Navbar from '../../components/UI/navbar/Navbar';
import Button from '../../components/UI/button/Button';
import {useNavigate} from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate()

	return (
		<div className='h-screen'>
			<Navbar/>
			<div className='mx-auto max-w-6xl mt-20'>
				<div>
					<img src='images/safe_cloud.png' alt='safe logo' className='absolute w-1/4 top-32 right-64'/>
					<div className='mb-4'>
						<span className='text-neutral-300 text-l tracking-wide font-black'>PREMIUM CLOUD STORAGE FOR BUSINESS</span>
					</div>
					<div className='mb-16'>
						<span className='text-7xl font-black text-violet-600'>Make Storing<br/> Documents Even<br/> More Securely</span>
					</div>
					<div className='flex'>
						<Button
							className='btn-primary mr-6 px-4 text-white bg-violet-600 hover:bg-violet-500 rounded-md'
							onClick={() => navigate('/login')}>
							Get Started
						</Button>
						<Button
							className='btn-primary px-4 text-violet-600 border border-violet-600 rounded-md'
							onClick={() => navigate('/login')}>
							Download
						</Button>
					</div>
				</div>
				<div>

				</div>
			</div>
		</div>
	)
}

export default HomePage
