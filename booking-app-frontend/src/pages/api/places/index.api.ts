import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';
import { ParsedUrlQuery } from 'querystring';
import { AxiosRequestConfig } from 'axios';

// SERVICES
import { api } from '@/services/api';

// STORE
import { store } from '@/store/store';
import {
	setPlace,
	setPlaces,
	setUserPlaces,
} from '@/store/places/places.store';

// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';

// config para enviar formData no lugar de json
// export const config = {
// 	api: {
// 		bodyParser: false,
// 	},
// };

interface RouteQuery extends ParsedUrlQuery {
	id: string;
}

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

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		store.dispatch(setUserPlaces([]));
		store.dispatch(setPlaces([]));
		return res.status(201).end();
	} catch (error: any) {
		console.error({ error });
		return res.status(500).json(error.message);
	}
};

const handleGetAll = async (req: NextApiRequest, res: NextApiResponse) => {
	const { placesStore } = store.getState();

	if (placesStore.places.length) {
		return res.status(200).json(placesStore.places);
	}

	const config = setupRequestConfig(req, res);
	try {
		const { data } = await api.get<PlaceInterface[]>(`/places`, config);
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

		await store.dispatch(setPlaces(response));
		return res.status(200).json(response);
	} catch (error: any) {
		console.error(error);
		return res.status(500).json(error.message);
	}
};

const handleGetById = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		placesStore: { place },
	} = store.getState();
	const { id } = req.query as RouteQuery;

	if (place && id === place.id) {
		return res.status(200).json(place);
	}

	const config = setupRequestConfig(req, res);
	try {
		const { data } = await api.get<PlaceInterface>(`/places/${id}`, config);

		await store.dispatch(setPlace(data));
		return res.status(200).json(data);
	} catch (error: any) {
		console.error(error);
		return res.status(500).json(error.message);
	}
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		placesStore: { userPlaces },
	} = store.getState();
	const { id } = req.query as RouteQuery;
	const body = req.body as PlaceInterface;

	try {
		await Promise.all([
			store.dispatch(setPlace(body)),
			store.dispatch(
				setUserPlaces(userPlaces.map((p) => (p.id !== id ? p : body))),
			),
		]);
		return res.status(200).json(body);
	} catch (error: any) {
		console.error({ error });
		return res.status(500).json(error.message);
	}
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		return handlePost(req, res);
	}
	if (req.method === 'GET') {
		if (req.query['id']) {
			return handleGetById(req, res);
		}

		return handleGetAll(req, res);
	}
	if (req.method === 'PUT') {
		return handlePut(req, res);
	}

	return res.status(405).json('Method not allowed');
};

export default handler;
