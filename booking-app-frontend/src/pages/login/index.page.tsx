import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// HOOKS
import { useForm } from '@/hooks/useForm.hook';

// UTILS
import { canSSRGuest } from '@/utils/can-ssr-guest';

// CONTEXTS
import { useToast } from '@/contexts/toast.context';
import { useAuth } from '@/contexts/auth.context';

// INTERFACES
import { DoLoginInterface } from '@/interfaces/do-login.interface';
import { Loader } from '@/components/loader/loader';

export default function Home() {
	const { notify } = useToast();
	const { doLogin } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const [loginForm, handleForm] = useForm<DoLoginInterface>({
		email: 'teste@teste.com',
		password: '123',
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			await doLogin(loginForm);
			notify('Login successfully');
		} catch (error: any) {
			console.error(error);
			const errMsg = error?.response?.data?.error || error.message || '';
			notify(errMsg, { type: 'error' });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col mt-4 gap-4 grow items-center justify-around">
			<div className="w-full mb-64">
				<h1 className="text-4xl text-center mb-4">Login</h1>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full max-w-lg mx-auto gap-4 p-4"
				>
					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="your@email.com"
							value={loginForm.email}
							onChange={handleForm}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="password"
							value={loginForm.password}
							onChange={handleForm}
						/>
					</div>

					<button
						type="submit"
						className="flex justify-center items-center primary hover:bg-red-900"
					>
						{!isLoading ? 'Login' : <Loader />}
					</button>
					<Link
						href="/register"
						className="text-sm text-center hover:cursor-pointer hover:underline text-gray-500"
					>
						{"Don't have account yet? Click here"}
					</Link>
				</form>
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps = canSSRGuest(
	async (ctx: GetServerSidePropsContext) => {
		// ctx.res.setHeader(
		// 	'Cache-Control',
		// 	'public, s-maxage=600, stale-while-revalidate=659',
		// );
		return {
			props: {},
		};
	},
);
