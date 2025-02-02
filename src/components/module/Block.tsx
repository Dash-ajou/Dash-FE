import React from "react";

type BlockType = "button" | "toggle" | "detail";

interface BlockProps {
	type: BlockType;
	title: string;
	subtitle?: string;
	info?: string;
	action?: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({
	type,
	title,
	subtitle,
	info,
	action,
}) => {
	return (
		<div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 mb-4">
			<div>
				<div className="font-bold text-lg">{title}</div>
				{subtitle && <div className="text-sm text-black">{subtitle}</div>}
				{info && <div className="text-sm text-black">{info}</div>}
			</div>

			{/* 오른쪽 영역*/}
			<div>{action}</div>
		</div>
	);
};

export default Block;