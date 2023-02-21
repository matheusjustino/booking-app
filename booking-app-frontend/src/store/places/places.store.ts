import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

// STORE
import { AppState } from '../store';

// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';
import { PlacesStoreStateInterface } from './places-store.interface';

const INITIAL_STATE: PlacesStoreStateInterface = {
	places: [],
	userPlaces: [],
	place: null,
};

export const placeStoreName = Object.freeze('placesStore');

export const placesSlice = createSlice({
	name: placeStoreName,
	initialState: INITIAL_STATE,
	reducers: {
		setPlaces(state, action: PayloadAction<PlaceInterface[]>) {
			state.places = action.payload;
		},
		setUserPlaces(state, action: PayloadAction<PlaceInterface[]>) {
			state.userPlaces = action.payload;
		},
		setPlace(state, action: PayloadAction<PlaceInterface | null>) {
			state.place = action.payload;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action: PayloadAction<any>) => {
			return {
				...state,
				...action.payload[placeStoreName],
			};
		},
	},
});

export const { setPlaces, setUserPlaces, setPlace } = placesSlice.actions;

export const selectPlaces = (state: AppState) => state.placesStore.places;
export const selectUserPlaces = (state: AppState) =>
	state.placesStore.userPlaces;
export const selectPlace = (state: AppState) => state.placesStore.place;

export default placesSlice.reducer;
