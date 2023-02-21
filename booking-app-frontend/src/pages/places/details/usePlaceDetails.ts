import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';

// STORE
import { useAppDispatch } from '@/store/store';
import { selectPlace, setPlace } from '@/store/places/places.store';

// CONTEXTS
import { useToast } from '@/contexts/toast.context';

// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';

interface RouteQuery extends ParsedUrlQuery {
	id: string;
}

const usePlaceDetails = () => {
	const { id } = useRouter().query as RouteQuery;
	const { notify } = useToast();

	const dispatch = useAppDispatch();
	const selectedPlace = useSelector(selectPlace);

	const [loading, setLoading] = useState(false);
	const [showAllPhotos, setShowAllPhotos] = useState(false);

	useEffect(() => {
		if (!selectedPlace || selectedPlace.id !== id) {
			(async () => {
				const config = {
					params: {
						id,
					},
				};
				const { data } = await axios.get<PlaceInterface>(
					`/api/places`,
					config,
				);
				await dispatch(setPlace(data));
			})();
		}
	}, [dispatch, selectedPlace, id]);

	return {
		place: selectedPlace,
		showAllPhotos,
		setShowAllPhotos,
	};
};

export { usePlaceDetails };
