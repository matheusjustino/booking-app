import { NoContent } from '@/components/no-content';
import Image from 'next/image';
import Link from 'next/link';

// STYLES
import styles from './home.module.scss';

// HOOKS
import { useHome } from './useHome';

const HomePage: React.FC = () => {
	const { places } = useHome();

	return (
		<div className="flex flex-wrap items-center justify-center sm:justify-between mt-8 gap-x-4 gap-y-12">
			{places.length > 0 ? (
				places.map((place) => (
					<Link
						href={`/places/details/${place.id}`}
						key={place.id}
						className={`w-[95%] sm:w-[45%] lg:w-[28.33%]
							xl:w-[21.25%] h-[200px] my-4 cursor-pointer
							hover:-translate-y-2 ${styles.placeContainer}`}
					>
						<div className="rounded-2xl h-[180px] mb-2">
							{place.photos[0] && (
								// <Image
								// 	className={`rounded-2xl aspect-square ${styles.imagePreview}`}
								// 	src={`${process.env.NEXT_PUBLIC_BASE_URL}/places/images/${place.photos[0]}`}
								// 	layout="fill"
								// 	alt="Preview"
								// />
								<img
									className={`rounded-2xl aspect-square h-full w-full inset-0 bg-transparent ${styles.imagePreview}`}
									src={`${process.env.NEXT_PUBLIC_BASE_URL}/places/images/${place.photos[0]}`}
									alt="Preview"
								/>
							)}
						</div>
						<h2 className="text-sm truncate">{place.title}</h2>
						<h3 className="font-bold text-gray-500">
							{place.address}
						</h3>
						<div className="mt-1">
							<span className="font-bold">
								{place.price.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</span>{' '}
							per night
						</div>
					</Link>
				))
			) : (
				<NoContent
					text="There are currently no places to view."
					subtext="Come back later."
				/>
			)}
		</div>
	);
};

export default HomePage;
