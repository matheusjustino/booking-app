import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies, destroyCookie } from 'nookies';

// SERVICES
import { AuthTokenError } from 'services/errors/auth-token.error';

// funcao para paginas com autenticacao
export function canSSRAuth<P>(fn: GetServerSideProps<{ [key: string]: any }>) {
	return async (context: GetServerSidePropsContext): Promise<any> => {
		const cookies = parseCookies(context);
		const token = cookies['@auth.token'];

		if (!token) {
			return {
				redirect: {
					destination: '/login',
					permanent: false,
				},
			};
		}

		try {
			return await fn(context);
		} catch (error) {
			if (error instanceof AuthTokenError) {
				destroyCookie(context, '@auth.token');

				return {
					redirect: {
						destination: '/',
						permanent: false,
					},
				};
			}
		}
	};
}
