import { Dispatch, SetStateAction } from 'react';
import { BsWifi } from 'react-icons/bs';
import { AiOutlineCar } from 'react-icons/ai';
import { CiMonitor } from 'react-icons/ci';
import { FaDog } from 'react-icons/fa';
import { GiEntryDoor, GiPocketRadio } from 'react-icons/gi';

interface PerksProps {
	selected: string[];
	onChange: Dispatch<SetStateAction<string[]>>;
}

const Perks: React.FC<PerksProps> = ({ selected, onChange }) => {
	return (
		<>
			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input type="checkbox" />
				<BsWifi size={20} />
				<span>Wifi</span>
			</label>

			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input type="checkbox" />
				<AiOutlineCar size={20} />
				<span>Free parking spot</span>
			</label>

			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input type="checkbox" />
				<CiMonitor size={20} />
				<span>TV</span>
			</label>

			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input type="checkbox" />
				<GiPocketRadio size={20} />
				<span>Radio</span>
			</label>

			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input type="checkbox" />
				<FaDog size={20} />
				<span>Pets</span>
			</label>

			<label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
				<input type="checkbox" />
				<GiEntryDoor size={20} />
				<span>Entrance</span>
			</label>
		</>
	);
};

export { Perks };
