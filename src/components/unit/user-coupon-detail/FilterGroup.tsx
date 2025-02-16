import React from "react";
import Filter from "./Filter.tsx";
import CircleButton from "../../common/button/CircleButton.tsx";

const FilterGroup: React.FC = () => {
    return (
        <div className="flex gap-4">
            <Filter/>
            <CircleButton
                size="small"
                fill="gray"
                icon="searchicon_line_black"
                //mode="search"
            />
            <p className=" text-gray-400 font-extralight">|</p>
            <CircleButton
                size="small"
                fill="gray"
                icon="downloadicon_line"
            />
        </div>
    );
};

export default FilterGroup;
