import { createContext, useContext, useCallback } from 'react';
import { toast, ToastOptions, ToastContainer } from 'react-toastify';

interface ToastProviderData {
	notify: (message: string, options?: ToastOptions) => void;
}

interface ToastProviderProps {
	children: React.ReactNode;
}

const ToastContext = createContext<ToastProviderData>({} as ToastProviderData);

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
	const notify = useCallback((message: string, options?: ToastOptions) => {
		toast(message, {
			type: 'success',
			toastId: '1',
			...options,
		});
	}, []);

	const toastProviderData: ToastProviderData = {
		notify,
	};

	return (
		<ToastContext.Provider value={toastProviderData}>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				hideProgressBar={false}
				closeOnClick={true}
				pauseOnFocusLoss={false}
			/>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => useContext(ToastContext);
