import { FormEvent } from 'react';
import Link from 'next/link';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// HOOKS
import { useForm } from '@/hooks/useForm.hook';

// UTILS
import { canSSRGuest } from '@/utils/can-ssr-guest';

// INTERFACES
import { RegisterInterface } from '@/interfaces/register.interface';

const RegisterPage: React.FC = () => {
	const [registerForm, handleForm] = useForm<RegisterInterface>({
		username: '',
		email: '',
		password: '',
	});

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<div className="flex flex-col mt-4 gap-4 grow items-center justify-around">
			<div className="w-full mb-64">
				<h1 className="text-4xl text-center mb-4">Register</h1>

				<form
					onSubmit={handleSubmit}
					className="flex flex-col w-full max-w-lg mx-auto gap-4 p-4"
				>
					<div className="flex flex-col">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Username"
							value={registerForm.username}
							onChange={handleForm}
						/>
					</div>

					<div className="flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="your@email.com"
							value={registerForm.email}
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
							value={registerForm.password}
							onChange={handleForm}
						/>
					</div>

					<button type="submit" className="primary hover:bg-red-900">
						Register
					</button>
					<Link
						href="/login"
						className="text-sm text-center hover:cursor-pointer hover:underline text-gray-500"
					>
						{'Already have an account? Click here'}
					</Link>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;

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
