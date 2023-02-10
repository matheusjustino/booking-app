import Link from 'next/link';
import { BiSearchAlt } from 'react-icons/bi';
import { RxHamburgerMenu } from 'react-icons/rx';
import { ImUser } from 'react-icons/im';

// CONTEXTS
import { useAuth } from '@/contexts/auth.context';

const Navbar: React.FC = () => {
	const { user } = useAuth();

	return (
		<nav className="flex flex-col items-center justify-between w-full min-h-[50px] md:flex-row gap-4">
			<Link href="/" className="flex items-center gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8 -rotate-90"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
					/>
				</svg>
				<span className="font-bold text-xl">FakeAirbnb</span>
			</Link>

			<div className="flex items-center gap-3 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
				<div>Anywhere</div>

				<div className="h-6 border border-l border-gray-300"></div>

				<div>Any week</div>

				<div className="h-6 border border-l border-gray-300"></div>

				<div>Add Guests</div>

				<button className="bg-primary text-white p-2 rounded-full hover:bg-red-800">
					<BiSearchAlt size={18} />
				</button>
			</div>

			<Link
				href={`/${user ? 'account' : 'login'}`}
				className="flex items-center gap-3 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md hover:shadow-gray-300"
			>
				<RxHamburgerMenu size={20} className="hover:cursor-pointer" />

				<div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden hover:cursor-pointer">
					<ImUser size={20} />
				</div>

				{!!user && <div>{user.username}</div>}
			</Link>
		</nav>
	);
};

export { Navbar };
