import '@/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

// STORE
import { wrapper } from 'store/store';

// CONTEXTS
import { ToastProvider } from '@/contexts/toast.context';
import { AuthProvider } from '@/contexts/auth.context';

// COMPONENT
import { Layout } from '@/components/layout';

const App = ({ Component, ...rest }: AppProps) => {
	const [isSSR, setIsSSR] = useState(true);
	const {
		store,
		props: { pageProps },
	} = wrapper.useWrappedStore(rest);

	useEffect(() => {
		setIsSSR(false);
	}, []);

	if (isSSR) return null;

	return (
		<ToastProvider>
			<Provider store={store}>
				<AuthProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</AuthProvider>
			</Provider>
		</ToastProvider>
	);
};

export default wrapper.withRedux(App);
