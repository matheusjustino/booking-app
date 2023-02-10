import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// CONTEXTS
import { useAuth } from '@/contexts/auth.context';

// COMPONENTS
import { AccountPageLayout } from './components/account-page-layout';

const AccountPage: React.FC = () => {
	const { user, logout } = useAuth();

	return (
		<div className="text-center max-w-lg mx-auto mt-[5rem]">
			Logged in as {user?.username} ({user?.email})
			<br />
			<button className="primary max-w-sm mt-2" onClick={logout}>
				Logout
			</button>
		</div>
	);
};

const WithLayout: React.FC = (props) => (
	<AccountPageLayout>{<AccountPage {...props} />}</AccountPageLayout>
);

export default WithLayout;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
	async (ctx: GetServerSidePropsContext) => {
		return {
			props: {},
		};
	},
);
