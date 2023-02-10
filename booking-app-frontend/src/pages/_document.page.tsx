import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	render() {
		return (
			<Html title="Booking App">
				<Head title="Booking App">
					<meta
						name="description"
						content="A simple project started to work with Typescript, React, NextJS and Tailwindcss"
					/>

					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin=""
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
