import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

// funcao para paginas sem autenticacao
export function canSSRGuest<P>(fn: GetServerSideProps<{ [key: string]: any }>) {
	return async (context: GetServerSidePropsContext): Promise<any> => {
		const cookies = parseCookies(context);

		if (cookies['@auth.token']) {
			return {
				redirect: {
					destination: '/',
					permanent: false,
				},
			};
		}

		return await fn(context);
	};
}
