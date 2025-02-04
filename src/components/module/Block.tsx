import React, { useState } from "react";
import Toggle from "../common/Toggle";
import Status from "../common/Status";
import IconRegistry from "../common/icons/IconRegistry";

type BlockType = "button" | "toggle" | "detail";

interface BlockProps {
	type: BlockType;
	title: string;
	subtitle?: string;
	info?: string;
	action?: React.ReactNode;
	statusType?: "approved" | "rejected" | "pending";
}

const Block: React.FC<BlockProps> = ({
	type,
	title,
	subtitle,
	info,
	action,
	statusType,
}) => {
	const [isToggleon, setIsToggleOn] = useState(false);
	const handleDetailClick = () => {
		if (type === "detail") {
			alert("페이지 이동 예정");
		}
	};

	return (
		<div
			className="flex w-full justify-between items-center bg-white shadow-custom-basic rounded-2xl px-7 py-6 mb-4"
			onClick={handleDetailClick} // 전체에 클릭 이벤트 추가
			style={type === "detail" ? { cursor: "pointer" } : {}}
		>
			<div>
				<div className="font-bold text-lg text-black mb-1">{title}</div>
				{subtitle && <div className="text-sm text-black text-opacity-60 mb-1">{subtitle}</div>}
				{info && <div className="text-sm text-black text-opacity-60">{info}</div>}
			</div>

			<div>
				{type === "button" ? (
					action
				) : type === "toggle" ? (
					<div className="flex flex-col items-center">
						<div className="mb-6">
							<Status
								statusType={isToggleon ? "active" : "paused"}
								color={isToggleon ? "blue" : "gray"}
							/>
						</div>
						<Toggle isOn={isToggleon} onToggle={(state) => setIsToggleOn(state)} />
					</div>
				) : type === "detail" ? (
					<div className="flex items-center">
						<Status
							statusType={statusType || "pending"}
							color={
								statusType === "approved"
									? "blue"
									: statusType === "rejected"
									? "red"
									: "gray"
							}
						/>
						<div className="flex items-center justify-center w-8 h-8 rounded-full">
							{IconRegistry.arrowicon_line_right}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
};


export default Block;
