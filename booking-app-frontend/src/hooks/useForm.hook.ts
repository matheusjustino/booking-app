import { ChangeEvent, useReducer } from 'react';

interface HandleForm {
	(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void;
}

interface ResetForm {
	(): void;
}

interface InitForm {
	(state: Record<string, any>): void;
}

enum ACTION_TYPES {
	HANDLE_FORM = 'HANDLE_FORM',
	RESET_FORM = 'RESET_FORM',
}

interface Action<T> {
	type: ACTION_TYPES;
	initialState: T;
	name: string;
	value: string;
}

function formReducer<T>(state: T, action: Action<T>) {
	switch (action.type) {
		case ACTION_TYPES.HANDLE_FORM:
			return {
				...state,
				[action.name]: action.value,
			};
		case ACTION_TYPES.RESET_FORM:
			return {
				...action.initialState,
			};
		default:
			throw new Error('Unknown action');
	}
}

function useForm<T>(initialState: T): [T, HandleForm, ResetForm, InitForm] {
	const [form, dispatch] = useReducer(formReducer, initialState);

	const handleForm: HandleForm = (event) => {
		const { name, value } = event.target;
		dispatch({
			type: ACTION_TYPES.HANDLE_FORM,
			name,
			value,
			initialState,
		});
	};

	const resetForm = () => {
		dispatch({
			type: ACTION_TYPES.RESET_FORM,
			initialState,
			name: '',
			value: '',
		});
	};

	const initForm = (state: Record<string, any>) => {
		Object.entries(state).forEach(([key, value]) =>
			dispatch({
				type: ACTION_TYPES.HANDLE_FORM,
				name: key,
				value,
				initialState,
			}),
		);
	};

	return [form as T, handleForm, resetForm, initForm];
}

export { useForm };
