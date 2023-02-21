import { GetServerSideProps, GetServerSidePropsContext } from 'next';

// UTILS
import { canSSRAuth } from '@/utils/can-ssr-auth';

// HOOKS
import { useEditPlace } from './useEditPlace';

// STORE
import { wrapper } from '@/store/store';

// COMPONENTS
import { AccountPageLayout } from '@/pages/account/components/account-page-layout';
import { Perks } from '../components/perks';
import { UploadImages } from '../components/upload-images';

const EditNewPlacePage: React.FC = () => {
	const {
		editPlaceForm,
		handleForm,
		previewImages,
		currentPhotoRef,
		photoLink,
		setPhotoLink,
		addedPerks,
		handleAddRemovePerk,
		handleAddPhoto,
		handleRemovePhoto,
		handleSubmit,
	} = useEditPlace();

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
						value={editPlaceForm.title}
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
						value={editPlaceForm.address}
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
							disabled
							type="text"
							placeholder="Add using a image link"
							value={photoLink}
							onChange={(e) => setPhotoLink(e.target.value)}
						/>
						<button
							disabled
							type="button"
							className="bg-gray-200 p-4 rounded-2xl hover:bg-emerald-500 disabled:cursor-not-allowed"
						>
							Add&nbsp;photo
						</button>
					</div>

					<UploadImages
						previewImages={previewImages}
						currentPhotoRef={currentPhotoRef}
						handleAddPhoto={handleAddPhoto}
						handleRemovePhoto={handleRemovePhoto}
					/>
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
						value={editPlaceForm.description}
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
						<Perks
							selected={addedPerks}
							onChange={handleAddRemovePerk}
						/>
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
						value={editPlaceForm.extraInfo}
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
								value={editPlaceForm.checkIn}
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
								value={editPlaceForm.checkOut}
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
								value={editPlaceForm.maxGuests}
								onChange={handleForm}
							/>
						</div>
					</div>
				</div>

				<div>
					<label className="text-xl uppercase">Price</label>
					<p className="text-xs text-gray-400">Price per night.</p>
					<input
						type="number"
						name="price"
						id="price"
						placeholder="Rent price"
						value={editPlaceForm.price}
						onChange={handleForm}
					/>
				</div>

				<button type="submit" className="primary mt-4 hover:bg-red-900">
					Save
				</button>
			</form>
		</div>
	);
};

EditNewPlacePage.displayName = 'EditNewPlacePage';

const WithLayout: React.FC = (props) => (
	<AccountPageLayout>{<EditNewPlacePage {...props} />}</AccountPageLayout>
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
