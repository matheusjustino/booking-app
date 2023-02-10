import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';

import { HiPlus } from 'react-icons/hi';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// COMPONENTS
import { AccountPageLayout } from '../components/account-page-layout';

const PlacesPage: React.FC = () => {
	return (
		<div>
			<div className="text-center">
				<Link
					className="inline-flex gap-1 items-center bg-primary text-white py-2 px-6 rounded-full"
					href="/account/places/new"
				>
					<HiPlus size={20} /> Add new place
				</Link>
			</div>
		</div>
	);
};

const WithLayout: React.FC = (props) => (
	<AccountPageLayout>{<PlacesPage {...props} />}</AccountPageLayout>
);

export default WithLayout;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
	async (ctx: GetServerSidePropsContext) => {
		return {
			props: {},
		};
	},
);
