export interface UpdatePlaceInterface {
	title: string;
	address: string;
	description: string;
	extraInfo: string;
	checkIn: string;
	checkOut: string;
	maxGuests: number;
	price: number;
	photos: string[];
	images: File[];
	perks: string[];
}
