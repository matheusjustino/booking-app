import '@/styles/global.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';

// CONTEXTS
import { ToastProvider } from '@/contexts/toast.context';
import { AuthProvider } from '@/contexts/auth.context';

// COMPONENT
import { Layout } from '@/components/layout';

export default function App({ Component, pageProps }: AppProps) {
	const [isSSR, setIsSSR] = useState(true);

	useEffect(() => {
		setIsSSR(false);
	}, []);

	if (isSSR) return null;

	return (
		<ToastProvider>
			<AuthProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AuthProvider>
		</ToastProvider>
	);
}
