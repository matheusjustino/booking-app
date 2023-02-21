import { GrMapLocation } from 'react-icons/gr';

// HOOKS
import { usePlaceDetails } from './usePlaceDetails';

// COMPONENTS
import { NoContent } from '@/components/no-content';
import { AllPhotos } from './all-photos';
import { PreviewPhotos } from './preview-photos';

const PlaceDetailsPage: React.FC = () => {
	const { place, showAllPhotos, setShowAllPhotos } = usePlaceDetails();

	if (!place) {
		return <NoContent text="No place founded." />;
	}

	if (showAllPhotos) {
		return (
			<AllPhotos
				placeTitle={place.title}
				photos={place.photos}
				close={() => setShowAllPhotos(false)}
			/>
		);
	}

	return (
		<div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
			<h1 className="text-3xl">{place.title}</h1>
			<a
				target="_blank"
				href={`https://maps.google.com/?q=${place.address}`}
				rel="noreferrer"
				className="flex gap-1 items-center my-3 font-semibold underline"
			>
				<GrMapLocation size={18} />
				{place.address}
			</a>

			<PreviewPhotos
				photos={place.photos}
				openGalery={() => setShowAllPhotos(true)}
			/>

			{/** description and book div */}
			<div className="flex flex-col md:flex-row gap-4 my-4 mt-8">
				<div className="flex-1">
					<div className="mb-2">
						<h2 className="font-semibold text-2xl">Description</h2>
						{place.description}
					</div>
					Check-in: {place.checkIn}
					<br />
					Check-out: {place.checkOut}
					<br />
					Max number of guests: {place.maxGuests}
				</div>

				{/** book div */}
				<div className="flex-1">
					<div className="bg-white p-4 rounded-2xl">
						<div className="text-2xl text-center">
							Price:{' '}
							{place.price.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}{' '}
							/ night
						</div>

						<div className="border rounded-2xl mt-4">
							<div className="flex flex-col md:flex-row gap-4">
								<div className="flex flex-1 gap-2 py-3 px-4">
									<label>Check in:</label>
									<input
										className="cursor-pointer"
										type="date"
										name="checkIn"
										id="checkIn"
									/>
								</div>

								<div className="flex flex-1 gap-2 py-3 px-4 border-t md:border-l">
									<label>Check out:</label>
									<input
										className="cursor-pointer"
										type="date"
										name="checkOut"
										id="checkOut"
									/>
								</div>
							</div>

							<div className="py-3 p-4 border-t">
								<label htmlFor="maxGuests">
									Number of guests:
								</label>
								<input
									type="number"
									name="maxGuests"
									id="maxGuests"
									defaultValue={1}
									min={1}
									max={place.maxGuests}
								/>
							</div>
						</div>

						<button className="primary mt-4 hover:bg-red-700">
							Book this place
						</button>
					</div>
				</div>
			</div>

			{/** extra info div */}
			<div className="mt-8 py-2 text-sm text-gray-700 leading-4 bg-white -mx-8 -mb-8">
				<div className="p-8">
					<h2 className="font-semibold text-2xl mb-2">
						Extra information
					</h2>
					{place.extraInfo}
				</div>
			</div>
		</div>
	);
};

export default PlaceDetailsPage;
