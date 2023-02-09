import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// COMPONENTS
import { AccountPageLayout } from '../components/account-page-layout';

const PlacesPage: React.FC = () => {
	return <div>places</div>;
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
