import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

// HOOKS
import { useForm } from '@/hooks/useForm.hook';

// SERVICES
import { api } from '@/services/api';

// STORE
import { useAppDispatch } from '@/store/store';
import { setPlaces, setUserPlaces } from '@/store/places/places.store';

// CONTEXTS
import { useToast } from '@/contexts/toast.context';

interface NewPlaceFormInterface {
	title: string;
	address: string;
	description: string;
	extraInfo: string;
	checkIn: string;
	checkOut: string;
	maxGuests: number;
	price: number;
}

const useNewPlace = () => {
	const [loading, setLoading] = useState(false);
	const { notify } = useToast();
	const dispatch = useAppDispatch();

	const [newPlaceForm, handleForm, resetForm] =
		useForm<NewPlaceFormInterface>({
			title: 'title',
			address: 'address',
			description: 'description',
			extraInfo: 'extra info',
			checkIn: '',
			checkOut: '',
			maxGuests: 1,
			price: 25,
		});
	const currentPhotoRef = useRef<HTMLInputElement | null>(null);
	const [addedPhotos, setAddedPhotos] = useState<File[]>([]);
	const [previewImages, setPreviewImages] = useState<string[]>([]);
	const [photoLink, setPhotoLink] = useState('');
	const [addedPerks, setAddedPerks] = useState<string[]>([]);

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
		Object.entries(newPlaceForm).forEach(([key, value]) =>
			formData.append(key, value),
		);
		addedPhotos.forEach((photo) => formData.append('images', photo));
		addedPerks.forEach((perk) => formData.append('perks', perk));

		try {
			setLoading(true);

			const config: AxiosRequestConfig = {
				headers: {
					'content-type': 'multipart/form-data',
				},
			};
			await api.post<void>('/places', formData, config);

			// update client side redux
			await dispatch(setUserPlaces([]));

			// update server side redux
			await axios.post<void>(`/api/places`);

			notify('Place created', {
				type: 'success',
			});
			resetForm();
			setAddedPerks([]);
			setAddedPhotos([]);
			setPreviewImages([]);
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
		newPlaceForm,
		handleForm,
		previewImages,
		currentPhotoRef,
		photoLink,
		setPhotoLink,
		addedPerks,
		setAddedPerks,
		handleAddRemovePerk,
		handleAddPhoto,
		handleRemovePhoto,
		handleSubmit,
	};
};

export { useNewPlace };
