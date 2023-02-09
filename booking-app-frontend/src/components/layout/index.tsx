// COMPONENTS
import { Navbar } from '../navbar';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen p-4">
			<Navbar />
			{children}
		</div>
	);
};

export { Layout };
