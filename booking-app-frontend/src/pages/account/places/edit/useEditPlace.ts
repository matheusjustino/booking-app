import {
	ChangeEvent,
	FormEvent,
	useRef,
	useState,
	useEffect,
	useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { ParsedUrlQuery } from 'querystring';
import axios, { AxiosRequestConfig } from 'axios';

// HOOKS
import { useForm } from '@/hooks/useForm.hook';

// SERVICES
import { api } from '@/services/api';

// CONTEXTS
import { useToast } from '@/contexts/toast.context';

// INTERFACES
import { PlaceInterface } from '@/interfaces/place.interface';

// STORE
import {
	selectPlace,
	selectUserPlaces,
	setPlace,
	setUserPlaces,
} from '@/store/places/places.store';
import { useAppDispatch } from '@/store/store';

interface RouteQuery extends ParsedUrlQuery {
	id: string;
}

interface EditPlaceFormInterface {
	title: string;
	address: string;
	description: string;
	extraInfo: string;
	checkIn: string;
	checkOut: string;
	maxGuests: number;
	price: number;
}

const useEditPlace = () => {
	const router = useRouter();
	const { id } = router.query as RouteQuery;
	const { notify } = useToast();

	const dispatch = useAppDispatch();
	const selectedPlace = useSelector(selectPlace);
	const places = useSelector(selectUserPlaces);

	const [loading, setLoading] = useState(false);
	const [editPlaceForm, handleForm, resetForm, initForm] =
		useForm<EditPlaceFormInterface>({
			title: selectedPlace?.title ?? '',
			address: selectedPlace?.address ?? '',
			description: selectedPlace?.description ?? '',
			extraInfo: '',
			checkIn: selectedPlace?.checkIn ?? '',
			checkOut: selectedPlace?.checkOut ?? '',
			maxGuests: selectedPlace?.maxGuests ?? 0,
			price: selectedPlace?.price ?? 25,
		});
	const currentPhotoRef = useRef<HTMLInputElement | null>(null);
	const [currentPhotos, setCurrentPhotos] = useState<string[]>([]);
	const [addedPhotos, setAddedPhotos] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);
	const [photoLink, setPhotoLink] = useState('');
	const [addedPerks, setAddedPerks] = useState<string[]>([]);

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
				setCurrentPhotos(data.photos.length ? data.photos : []);
				setPreviewImages(data.photos.length ? data.photos : []);
				setAddedPerks(data.perks.length ? data.perks : []);
			})();
		}
	}, [dispatch, selectedPlace, id]);

	// preencher o form sempre que o valor selectedPlace do redux mudar
	useMemo(() => {
		if (selectedPlace) {
			const {
				title,
				address,
				description,
				checkIn,
				checkOut,
				maxGuests,
				price,
			} = selectedPlace;
			initForm({
				title,
				address,
				description,
				extraInfo: '',
				checkIn,
				checkOut,
				maxGuests,
				price,
			});
		}
	}, [selectedPlace]);

	// useEffect(() => {
	// 	setCurrentPhotos(selectedPlace?.photos);
	// 	setPreviewImages(selectedPlace?.photos);
	// 	if (selectedPlace) {
	// 		setCurrentPhotos(selectedPlace.photos);
	// 		(async () => {
	// 			const imagesBase64 = await Promise.all(
	// 				selectedPlace.photos.map((photo) => {
	// 					const config: AxiosRequestConfig = {
	// 						responseType: 'arraybuffer',
	// 						headers: {
	// 							Accept: 'image/*',
	// 						},
	// 					};
	// 					return api
	// 						.get(`/places/images/${photo}`, config)
	// 						.then<string>(({ headers, data: imageData }) => {
	// 							const imageBase64 = btoa(
	// 								new Uint8Array(imageData).reduce(
	// 									(data, byte) =>
	// 										data + String.fromCharCode(byte),
	// 									'',
	// 								),
	// 							);
	// 							return `data:${headers['content-type']};base64,${imageBase64}`;
	// 						});
	// 				}),
	// 			);
	// 			// setPreviewImages(imagesBase64);
	// 			setPreviewImages(selectedPlace.photos);
	// 		})();
	// 	}
	// }, [selectedPlace]);

	// function convertBase64ToBlob(base64: string, extension: string): Blob {
	// 	const sliceSize = 1024;
	// 	const byteChars = atob(base64);
	// 	const byteArrays = [];

	// 	for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
	// 		const slice = byteChars.slice(offset, offset + sliceSize);
	// 		const byteNumbers = new Array(slice.length);

	// 		for (let i = 0; i < slice.length; i++) {
	// 			byteNumbers[i] = slice.charCodeAt(i);
	// 		}

	// 		const byteArray = new Uint8Array(byteNumbers);
	// 		byteArrays.push(byteArray);
	// 	}

	// 	return new Blob(byteArrays, { type: extension });
	// }

	const handleAddRemovePerk = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.checked) {
			setAddedPerks((old) => [...old, e.target.name]);
		} else {
			setAddedPerks((old) =>
				old.filter((perk) => perk !== e.target.name),
			);
		}
	};

	const handleAddPhoto = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const files = e.target.files;
		if (files) {
			const file = files[0];
			if (currentPhotoRef.current?.value) {
				currentPhotoRef.current.value = '';
			}
			setAddedPhotos((old) => old.concat(file));
			previewImage(file);
		}
	};

	const previewImage = (file: File) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && e.target.result) {
				setPreviewImages((old) =>
					old.concat(e.target?.result as string),
				);
			}
		};
		reader.readAsDataURL(file);
	};

	const handleRemovePhoto = (imageIndex: number) => {
		setCurrentPhotos((old) => {
			if (imageIndex + 1 < old.length) {
				return old.filter((_, index) => index !== imageIndex);
			}
			return old;
		});
		setAddedPhotos((old) => old.filter((_, index) => index !== imageIndex));
		setPreviewImages((old) =>
			old.filter((_, index) => index !== imageIndex),
		);
		if (currentPhotoRef.current?.value) {
			currentPhotoRef.current.value = '';
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData();
		Object.entries(editPlaceForm).forEach(([key, value]) => {
			if (value !== null) {
				formData.append(key, value);
			}
		});
		currentPhotos.forEach((photo) => formData.append('photos', photo));
		addedPhotos.forEach((photo) => formData.append('images', photo));
		addedPerks.forEach((perk) => formData.append('perks', perk));

		try {
			setLoading(true);

			const config: AxiosRequestConfig = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};

			const { data: updatedPlace } = await api.put<PlaceInterface>(
				`/places/${id}`,
				formData,
				config,
			);

			// update client side redux
			await Promise.all([
				dispatch(setPlace(updatedPlace)),
				dispatch(
					setUserPlaces(
						places.map((p) => (p.id !== id ? p : updatedPlace)),
					),
				),
			]);

			const serverConfig: AxiosRequestConfig = {
				params: {
					id,
				},
				data: updatedPlace,
			};

			// update server side redux
			await axios.put<PlaceInterface>(
				`/api/places`,
				updatedPlace,
				serverConfig,
			);

			notify('Place updated', {
				type: 'success',
			});

			router.replace(router.asPath);
		} catch (error: any) {
			console.error(error);
			const errMsg = error?.response?.data?.error || error.message || '';
			notify(errMsg, { type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return {
		loading,
		editPlaceForm,
		handleForm,
		previewImages,
		currentPhotoRef,
		photoLink,
		addedPerks,
		addedPhotos,
		setAddedPerks,
		setPhotoLink,
		handleAddRemovePerk,
		handleAddPhoto,
		handleRemovePhoto,
		handleSubmit,
	};
};

export { useEditPlace };
