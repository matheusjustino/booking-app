import { ChangeEvent } from 'react';
import { BsWifi } from 'react-icons/bs';
import { AiOutlineCar } from 'react-icons/ai';
import { CiMonitor } from 'react-icons/ci';
import { FaDog } from 'react-icons/fa';
import { GiEntryDoor, GiPocketRadio } from 'react-icons/gi';

interface PerksProps {
	selected: string[];
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Perks: React.FC<PerksProps> = ({ selected, onChange }) => {
	const perks = [
		{
			name: 'wifi',
			Icon: BsWifi,
		},
		{
			name: 'free parking spot',
			Icon: AiOutlineCar,
		},
		{
			name: 'tv',
			Icon: CiMonitor,
		},
		{
			name: 'radio',
			Icon: GiPocketRadio,
		},
		{
			name: 'pets',
			Icon: FaDog,
		},
		{
			name: 'entrance',
			Icon: GiEntryDoor,
		},
	];
	return (
		<>
			{perks.map(({ name, Icon }) => (
				<label
					key={name}
					className={`border p-4 flex rounded-2xl gap-2 items-center cursor-pointer ${
						selected.includes(name) && 'border-emerald-500'
					}`}
				>
					<input
						type="checkbox"
						checked={selected.includes(name)}
						name={name}
						onChange={onChange}
					/>
					<Icon size={20} />
					<span>{name.toUpperCase()}</span>
				</label>
			))}
		</>
	);
};

export { Perks };
