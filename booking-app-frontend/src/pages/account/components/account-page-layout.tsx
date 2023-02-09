import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/contexts/auth.context';
import Link from 'next/link';

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
		},
		{
			text: 'My bookings',
			href: '/account/bookings',
		},
		{
			text: 'My accommodations',
			href: '/account/places',
		},
	];

	return (
		<div>
			<nav className="w-full flex justify-center my-8 gap-2">
				{navLinks.map(({ text, href }) => (
					<Link
						key={href}
						className={`p-2 px-6 rounded-full ${
							pathname === href ? `bg-primary text-white` : ''
						}`}
						href={href}
					>
						{text}
					</Link>
				))}
			</nav>
			<div>{children}</div>
		</div>
	);
};

export { AccountPageLayout };
