import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getMonth, getYear} from "date-fns";
import Icon from "../../common/icons/Icon.tsx";

type DateSelectorProps = {
    initialDate: Date;
    onDateChange?: (selectedDate: Date) => void;
}

const today = new Date();
const minSelectableDate = new Date();
minSelectableDate.setMonth(today.getMonth() - 1);

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const DateSelector: React.FC<DateSelectorProps> = ({
                                                       initialDate,
                                                       onDateChange,
                                                   }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

    const handleDateChange = (date: Date | null) => {
        if (date) {
            setSelectedDate(date);
            onDateChange?.(date);
        }
    };

    return (
        <div className="flex justify-center">
            <DatePicker
                formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
                inline
                minDate={minSelectableDate}
                maxDate={today}
                dayClassName={(date) => {
                    if (date < minSelectableDate || date > today) {
                        return "text-gray-400 cursor-default";
                    }
                    return date.getDate() === selectedDate?.getDate()
                        ? "text-white bg-blue-500"
                        : "text-black";
                }}
                onChange={handleDateChange}
                selected={selectedDate}
                renderCustomHeader={({
                                         date,
                                         decreaseMonth,
                                         increaseMonth,
                                         prevMonthButtonDisabled,
                                         nextMonthButtonDisabled,
                                     }) => (
                    <div className="bg-white h-12 flex items-center justify-between px-4">
                        <button
                            type='button'
                            onClick={decreaseMonth}
                            className="p-2"
                            disabled={prevMonthButtonDisabled}
                        >
                            <Icon name="arrowicon_line_left" color="black" size={16}/>
                        </button>
                        <div className="text-sm font-semibold">{MONTHS[getMonth(date)]} {getYear(date)}</div>
                        <button
                            type='button'
                            onClick={increaseMonth}
                            className="p-2"
                            disabled={nextMonthButtonDisabled}
                        >
                            <Icon name="arrowicon_line_right" color="black" size={16}/>
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default DateSelector;
