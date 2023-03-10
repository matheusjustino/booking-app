import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi';

// IMAGES
import imageNotFound from '@/../public/images/image-not-found.png';

// STYLES
import styles from './styles.module.scss';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// STORE
import { wrapper } from '@/store/store';

// HOOKS
import { useUserPlaces } from './useUserPlaces';

// COMPONENTS
import { AccountPageLayout } from '../components/account-page-layout';

const PlacesPage: React.FC = () => {
	const { places } = useUserPlaces();

	return (
		<div>
			<div className="text-center">
				<Link
					className="inline-flex gap-1 items-center bg-primary text-white py-2 px-6 rounded-full"
					href="/account/places/new"
				>
					<HiPlus size={20} /> Add new place
				</Link>
			</div>

			<div className="mt-4">
				{places.map((place) => (
					<Link
						href={`/account/places/edit/${place.id}`}
						key={place.id}
						className="flex flex-col sm:flex-row gap-4 bg-gray-100 p-4
						rounded-2xl my-2 hover:bg-gray-300 cursor-pointer"
					>
						<div
							className={`w-[inherit] h-[12rem] overflow-hidden`}
						>
							{place.photos.length > 0 ? (
								<Image
									className={`rounded-2xl ${styles.imagePreview}`}
									key={place.id + place.photos[0]}
									objectFit="cover"
									layout="fill"
									src={`${process.env.NEXT_PUBLIC_BASE_URL}/places/images/${place.photos[0]}`}
									alt="Preview"
									quality={60}
								/>
							) : (
								<Image
									className={`rounded-2xl ${styles.imagePreview}`}
									key={place.id + place.photos[0]}
									objectFit="cover"
									layout="fill"
									src={imageNotFound}
									alt="Preview"
									quality={60}
								/>
							)}
						</div>
						<div>
							<h2 className="text-xl capitalize">
								{place.title}
							</h2>
							<p className="text-sm mt-2">{place.description}</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

const WithLayout: React.FC = (props: any) => (
	<AccountPageLayout>{<PlacesPage {...props} />}</AccountPageLayout>
);

export default WithLayout;

export const getServerSideProps: GetServerSideProps =
	wrapper.getServerSideProps((store) =>
		canSSRAuth(async (ctx: GetServerSidePropsContext) => {
			return {
				props: {},
			};
		}),
	);
