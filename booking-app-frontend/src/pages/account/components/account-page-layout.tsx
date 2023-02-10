import { Fragment, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { MdOutlinePersonOutline, MdOutlineHomeWork } from 'react-icons/md';
import { AiOutlineUnorderedList } from 'react-icons/ai';

// CONTEXTS
import { useAuth } from '@/contexts/auth.context';

interface NavLink {
	text: string;
	href: string;
	Icon: IconType;
}

interface AccountPageLayoutProps {
	children: React.ReactNode;
}

const AccountPageLayout: React.FC<AccountPageLayoutProps> = ({ children }) => {
	const { user, ready, logout } = useAuth();
	const { pathname } = useRouter();

	useLayoutEffect(() => {
		if (ready && !user) {
			logout();
		}
	}, [user, ready, logout]);

	const navLinks = [
		{
			text: 'My profile',
			href: '/account',
			Icon: MdOutlinePersonOutline,
		},
		{
			text: 'My bookings',
			href: '/account/bookings',
			Icon: AiOutlineUnorderedList,
		},
		{
			text: 'My accommodations',
			href: '/account/places',
			Icon: MdOutlineHomeWork,
		},
	] as NavLink[];

	return (
		<Fragment>
			<nav className="w-full flex flex-col sm:flex-row justify-center my-8 gap-2">
				{navLinks.map(({ text, href, Icon }) => (
					<Link
						key={href}
						className={`p-2 px-6 rounded-full flex items-center gap-2 ${
							pathname === href
								? `bg-primary text-white`
								: 'bg-gray-200'
						}`}
						href={href}
					>
						<Icon size={20} /> {text}
					</Link>
				))}
			</nav>

			{children}
		</Fragment>
	);
};

export { AccountPageLayout };
