import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// COMPONENTS
import { AccountPageLayout } from '../components/account-page-layout';

const BookingsPage: React.FC = () => {
	return (
		<div className="flex items-center justify-center w-full mt-20">
			<h1 className="text-3xl">In progress...</h1>
		</div>
	);
};

const WithLayout: React.FC = (props) => (
	<AccountPageLayout>{<BookingsPage {...props} />}</AccountPageLayout>
);

export default WithLayout;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
	async (ctx: GetServerSidePropsContext) => {
		return {
			props: {},
		};
	},
);
