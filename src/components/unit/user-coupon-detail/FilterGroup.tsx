import React from "react"
import Filter from "./Filter.tsx"
import CircleButton from "../../common/button/CircleButton.tsx"

type Props = {
    onDownloadClick?: () => void
    onFilterClick?: () => void
}

const FilterGroup: React.FC<Props> = ({ onDownloadClick, onFilterClick }) => {
    return (
        <div className="flex gap-4">
            <Filter onFilterClick={onFilterClick} />
            {/*<CircleButton*/}
            {/*    size="small"*/}
            {/*    fill="gray"*/}
            {/*    icon="searchicon_line_black"*/}
            {/*    //mode="search"*/}
            {/*/>*/}
            <p className=" text-gray-400 font-extralight">|</p>
            <CircleButton
                size="small"
                fill="gray"
                icon="downloadicon_line"
                onClick={onDownloadClick}
            />
        </div>
    )
}

export default FilterGroup
