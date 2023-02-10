import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// COMPONENTS
import { AccountPageLayout } from '../components/account-page-layout';

const BookingsPage: React.FC = () => {
	return <div>bookings</div>;
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
