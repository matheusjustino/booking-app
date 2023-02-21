// COMPONENTS
import { Navbar } from '../navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen py-4 px-8">
			<Navbar />
			{children}
		</div>
	);
};

export { Layout };
