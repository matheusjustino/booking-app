import { AiOutlineClose } from 'react-icons/ai';

interface AllPhotosProps {
	placeTitle: string;
	photos: string[];
	close: () => void;
}

const AllPhotos: React.FC<AllPhotosProps> = ({ placeTitle, photos, close }) => {
	return (
		<div className="absolute bg-black min-h-screen inset-0">
			<div className="p-8 grid gap-4 bg-black">
				<div className="h-[50px]">
					<h2 className="md:text-3xl text-white">
						Photos of {placeTitle}
					</h2>
					<button
						className="fixed flex gap-2 items-center
						justify-center rounded-2xl shadow mx:py-2 py-1 md:px-4 px-2
						shadow-white bg-white hover:bg-gray-300
						top-8 right-12"
						type="button"
						onClick={close}
					>
						<AiOutlineClose size={20} />
						Close photos
					</button>
				</div>
				{photos.length > 0 &&
					photos.map((photo) => (
						<img
							className="w-full"
							key={photo}
							src={`${process.env.NEXT_PUBLIC_BASE_URL}/places/images/${photo}`}
							alt={photo}
						/>
					))}
			</div>
		</div>
	);
};

export { AllPhotos };
