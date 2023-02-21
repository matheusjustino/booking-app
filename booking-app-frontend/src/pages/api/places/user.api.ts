import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import { AxiosRequestConfig } from 'axios';

// SERVICES
import { api } from '@/services/api';

// STORE
import { store } from '@/store/store';
import { setUserPlaces } from '@/store/places/places.store';

// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';

const setupRequestConfig = (
	req: NextApiRequest,
	res: NextApiResponse,
	headers?: Record<string, any>,
) => {
	const cookies = parseCookies({ req });
	const config: AxiosRequestConfig = {
		headers: {
			...headers,
			Authorization: cookies['@auth.token']
				? `Bearer ${cookies['@auth.token']}`
				: '',
		},
	};
	return config;
};

const handleGetByUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const { placesStore } = store.getState();

	if (placesStore.userPlaces.length) {
		return res.status(200).json(placesStore.userPlaces);
	}

	const config = setupRequestConfig(req, res);
	try {
		const { data } = await api.get<PlaceInterface[]>(
			`/places/user`,
			config,
		);
		const response: PlaceInterface[] = data.map(
			({
				id,
				title,
				address,
				description,
				extraInfo,
				perks,
				photos,
				checkIn,
				checkOut,
				maxGuests,
				price,
			}) => {
				return {
					id,
					title,
					address,
					description,
					extraInfo,
					perks,
					photos,
					checkIn,
					checkOut,
					maxGuests,
					price,
				};
			},
		);

		await store.dispatch(setUserPlaces(response));
		return res.status(200).json(response);
	} catch (error: any) {
		console.error(error);
		return res.status(500).json(error.message);
	}
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		return handleGetByUser(req, res);
	}
	return res.status(405).json('Method not allowed');
};

export default handler;
