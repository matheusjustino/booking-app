interface NoContentProps {
	text?: string;
	subtext?: string;
}

const NoContent: React.FC<NoContentProps> = ({ text, subtext }) => {
	const message = text ?? 'Nothing to view.';
	const submessage = subtext ?? 'Come back later.';
	return (
		<div className="w-full h-[100vh] flex flex-col items-center justify-center text-4xl gap-2 text-gray-700">
			<span>{message}</span>
			<span>{submessage}</span>
		</div>
	);
};

export { NoContent };
