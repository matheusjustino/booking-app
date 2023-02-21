import { ChangeEvent, MutableRefObject } from 'react';
import Image from 'next/image';
import { GoCloudUpload } from 'react-icons/go';
import { BiTrash } from 'react-icons/bi';

// STYLES
import styles from '../edit/styles.module.scss';

// UTILS
import { checkIfIsBase64 } from '@/utils/check-if-base64';

interface UploadImagesProps {
	previewImages: string[];
	currentPhotoRef: MutableRefObject<HTMLInputElement | null>;
	handleAddPhoto: (e: ChangeEvent<HTMLInputElement>) => void;
	handleRemovePhoto: (imageIndex: number) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({
	previewImages,
	currentPhotoRef,
	handleAddPhoto,
	handleRemovePhoto,
}) => {
	return (
		<div className="mt-2 mb-1 justify-items-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
			<label
				className="border bg-transparent rounded-2xl
						px-4 py-5 text-2xl text-gray-600
						hover:bg-emerald-500 hover:border-emerald-600
						flex flex-col md:flex-row items-center justify-center gap-2
						cursor-pointer min-w-[-webkit-fill-available]"
			>
				<input
					type="file"
					className="hidden"
					ref={currentPhotoRef}
					onChange={handleAddPhoto}
				/>
				<GoCloudUpload size={24} /> Upload
			</label>

			{previewImages.length > 0 &&
				previewImages.map((photo: string, index: number) => (
					<div
						key={index}
						className={`hover:cursor-pointer
									z-10 rounded-2xl ${styles.imagePreviewContainer}`}
					>
						<div
							onClick={() => handleRemovePhoto(index)}
							className={`${styles.trashIcon} hidden hover:bg-slate-300 rounded-2xl opacity-50`}
						>
							<BiTrash size={32} color="red" />
						</div>
						<Image
							className={`rounded-2xl ${styles.imagePreview}`}
							objectFit="contain"
							layout="fill"
							src={
								checkIfIsBase64(photo)
									? photo
									: `${process.env.NEXT_PUBLIC_BASE_URL}/places/images/${photo}`
							}
							alt="Preview"
							quality={60}
						/>
					</div>
				))}
		</div>
	);
};

export { UploadImages };
