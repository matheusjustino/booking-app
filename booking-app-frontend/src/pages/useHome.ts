import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

// STORE
import { useAppDispatch } from '@/store/store';
import { selectPlaces, setPlaces } from '@/store/places/places.store';

// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';

const useHome = () => {
	const places = useSelector(selectPlaces);
	const dispatch = useAppDispatch();

	useLayoutEffect(() => {
		if (!places.length) {
			(async () => {
				const { data } = await axios.get<PlaceInterface[]>(
					`/api/places`,
				);
				dispatch(setPlaces(data));
			})();
		}
	}, [dispatch, places.length]);

	return {
		places,
	};
};

export { useHome };
