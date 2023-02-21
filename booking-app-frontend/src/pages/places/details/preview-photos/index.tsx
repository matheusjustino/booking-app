import { HiPhotograph } from 'react-icons/hi';

// COMPONENTS
import { ImagePreview } from './components/image-preview';

interface PreviewPhotosProps {
	photos: string[];
	openGalery: () => void;
}

const PreviewPhotos: React.FC<PreviewPhotosProps> = ({
	photos,
	openGalery,
}) => {
	return (
		<div className="relative">
			<div
				className={`grid gap-2 ${
					photos.length > 1 ? 'grid-cols-[2fr_1fr]' : 'grid-cols-1'
				} h-[600px] rounded-2xl overflow-hidden`}
			>
				<div className="h-[inherit]">
					{photos[0] && (
						<ImagePreview photo={photos[0]} className="h-full" />
					)}
				</div>
				<div className="h-[inherit]">
					{photos[1] && (
						<ImagePreview photo={photos[1]} className="h-[300px]" />
					)}
					{photos[2] && (
						<ImagePreview photo={photos[2]} className="h-[300px]" />
					)}
				</div>
			</div>

			<button
				className="flex gap-2 justify-center items-center absolute bottom-2 right-2 py-2
					px-4 bg-white rounded-2xl shadow-md shadow-gray-500
					hover:bg-gray-300 hover:-translate-y-[2px] transition-transform ease-in-out duration-200"
				type="button"
				onClick={openGalery}
			>
				<HiPhotograph size={24} />
				Show more photos
			</button>
		</div>
	);
};

export { PreviewPhotos };
