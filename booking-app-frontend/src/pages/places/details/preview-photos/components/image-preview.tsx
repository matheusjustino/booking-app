import { HTMLAttributes } from 'react';

interface ImagePreviewProps extends HTMLAttributes<HTMLElement> {
	photo: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ photo, className }) => {
	return (
		<img
			className={`aspect-square object-cover w-full ${className}`}
			src={`${process.env.NEXT_PUBLIC_BASE_URL}/places/images/${photo}`}
			alt="Preview"
		/>
	);
};

export { ImagePreview };
