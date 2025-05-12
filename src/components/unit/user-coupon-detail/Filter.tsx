import React from "react";
import Icon from "../../common/icons/Icon.tsx";

type Props = {
    onFilterClick?: () => void;
};

const Filter: React.FC<Props> = ({ onFilterClick }) => {
    return (
        <button
            className="flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-sm text-black
                py-2 px-4 w-fit shrink-0 grow-0 gap-3"
            onClick={onFilterClick}
        >
            <Icon name="filtericon_line" size={16} />
            사용상태
            <Icon name="arrowicon_line_down" size={12} />
        </button>
    );
};

export default Filter;
