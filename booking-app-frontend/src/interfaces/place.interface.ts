export interface PlaceInterface {
	id: string;
	title: string;
	address: string;
	description: string;
	perks: string[];
	photos: string[];
	extraInfo: string;
	checkIn: string | null;
	checkOut: string | null;
	maxGuests: number;
	price: number;
}
