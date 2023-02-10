import { useState, FormEvent } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { GoCloudUpload } from 'react-icons/go';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// HOOKS
import { useForm } from '@/hooks/useForm.hook';

// COMPONENTS
import { AccountPageLayout } from '@/pages/account/components/account-page-layout';
import { Perks } from './components/perks';

interface NewPlaceFormInterface {
	title: string;
	address: string;
	description: string;
	extraInfo: string;
	checkIn: string;
	checkOut: string;
	maxGuests: number;
}

const AddNewPlacePage: React.FC = () => {
	const [newPlaceForm, handleForm] = useForm<NewPlaceFormInterface>({
		title: '',
		address: '',
		description: '',
		extraInfo: '',
		checkIn: '',
		checkOut: '',
		maxGuests: 1,
	});
	const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
	const [photoLink, setPhotoLink] = useState('');
	const [addedPerks, setAddedPerks] = useState<string[]>([]);

	const addPhotoByLink = () => {
		console.log('addPhotoByLink');
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		alert(JSON.stringify(newPlaceForm));
	};

	return (
		<div>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div>
					<label className="text-xl uppercase" htmlFor="title">
						Title
					</label>
					<p className="text-xs text-gray-400">
						Title for your place. Should be short and catchy as in
						advertisement.
					</p>
					<input
						type="text"
						name="title"
						id="title"
						placeholder="title, example: My sweet home"
						value={newPlaceForm.title}
						onChange={handleForm}
					/>
				</div>

				<div>
					<label className="text-xl uppercase" htmlFor="address">
						Address
					</label>
					<p className="text-xs text-gray-400">
						Address to this place.
					</p>
					<input
						type="text"
						name="address"
						id="address"
						placeholder="address"
						value={newPlaceForm.address}
						onChange={handleForm}
					/>
				</div>

				<div>
					<label className="text-xl uppercase" htmlFor="photos">
						Photos
					</label>
					<p className="text-xs text-gray-400">More = better.</p>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Add using a image link"
							value={photoLink}
							onChange={(e) => setPhotoLink(e.target.value)}
						/>
						<button
							type="button"
							className="bg-gray-200 p-4 rounded-2xl hover:bg-emerald-500"
						>
							Add&nbsp;photo
						</button>
					</div>
					<div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
						<button
							type="button"
							className="border bg-transparent rounded-2xl
						p-8 text-2xl text-gray-600
						hover:bg-emerald-500
						hover:border-emerald-600
						flex items-center justify-center gap-2"
						>
							<GoCloudUpload size={24} /> Upload
						</button>
					</div>
				</div>

				<div>
					<label className="text-xl uppercase" htmlFor="description">
						Description
					</label>
					<p className="text-xs text-gray-400">
						Description of the place.
					</p>
					<textarea
						name="description"
						id="description"
						value={newPlaceForm.description}
						onChange={handleForm}
					/>
				</div>

				<div>
					<label className="text-xl uppercase" htmlFor="perks">
						Perks
					</label>
					<p className="text-xs text-gray-400">
						Select all the perks of your place.
					</p>
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2">
						<Perks selected={addedPerks} onChange={setAddedPerks} />
					</div>
				</div>

				<div>
					<label className="text-xl uppercase" htmlFor="extraInfo">
						Extra info
					</label>
					<p className="text-xs text-gray-400">House rules, etc.</p>
					<textarea
						name="extraInfo"
						id="extraInfo"
						value={newPlaceForm.extraInfo}
						onChange={handleForm}
					/>
				</div>

				<div>
					<label className="text-xl uppercase">
						Check in&out times, max guests
					</label>
					<p className="text-xs text-gray-400">
						Add check in and out times. Remember to have some time
						windows for cleaning the room between guests.
					</p>
					<div className="grid sm:grid-cols-3 mt-1 gap-2">
						<div>
							<label className="-mb-1">Check in time</label>
							<input
								type="text"
								name="checkIn"
								id="checkIn"
								placeholder="14:00"
								value={newPlaceForm.checkIn}
								onChange={handleForm}
							/>
						</div>
						<div>
							<label className="-mb-1">Check out</label>
							<input
								type="text"
								name="checkOut"
								id="checkOut"
								placeholder="15:00"
								value={newPlaceForm.checkOut}
								onChange={handleForm}
							/>
						</div>
						<div>
							<label className="-mb-1">
								Max number of guests
							</label>
							<input
								type="number"
								name="maxGuests"
								id="maxGuests"
								value={newPlaceForm.maxGuests}
								onChange={handleForm}
							/>
						</div>
					</div>
				</div>

				<button type="submit" className="primary mt-4 hover:bg-red-900">
					Save
				</button>
			</form>
		</div>
	);
};

const WithLayout: React.FC = (props) => (
	<AccountPageLayout>{<AddNewPlacePage {...props} />}</AccountPageLayout>
);

export default WithLayout;

export const getServerSideProps: GetServerSideProps = canSSRAuth(
	async (ctx: GetServerSidePropsContext) => {
		return {
			props: {},
		};
	},
);
