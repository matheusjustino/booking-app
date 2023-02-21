// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';

export interface PlacesStoreStateInterface {
	places: PlaceInterface[];
	userPlaces: PlaceInterface[];
	place: PlaceInterface | null;
}
