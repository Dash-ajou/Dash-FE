import React, {useCallback, useEffect, useRef, useState} from 'react';
import {getDate, getHours, getMinutes, getMonth, setHours, setMinutes} from "date-fns";

type TimeSelectorProps = {
    selectedDate: Date;
    onTimeChange?: (updatedDate: Date) => void;
    onDateClick: () => void;
}

const MERIDIEM_ITEMS = ["오전", "오후"];
const ITEM_WIDTH = 1; // 눈금 크기(px)
const SCROLL_SENSITIVITY = 15; // 스크롤 감도 (값이 클수록 천천히 이동)
const LONG_TICK_INTERVAL = 5; // 긴 눈금 간격
const TOTAL_ITEMS = 1000; // 눈금 개수
const INITIAL_OFFSET = (TOTAL_ITEMS / 2) * ITEM_WIDTH; // 중앙 스크롤 위치

const TimeSelector: React.FC<TimeSelectorProps> = ({
                                                       selectedDate,
                                                       onTimeChange,
                                                       onDateClick,
                                                   }) => {
    const [selectedHour, setSelectedHour] = useState(getHours(selectedDate));
    const [selectedMinute, setSelectedMinute] = useState(getMinutes(selectedDate));
    const [activeSelector, setActiveSelector] = useState<"hour" | "minute">("hour");

    const hourScrollRef = useRef<HTMLDivElement>(null);
    const minuteScrollRef = useRef<HTMLDivElement>(null);
    const lastScrollTime = useRef<number>(0);
    const isInitializing = useRef(true);

    const period = selectedHour < 12 ? 0 : 1;
    const displayHour = selectedHour % 12 === 0 ? 12 : selectedHour % 12;

    useEffect(() => {
        const newDate = new Date(selectedDate);
        const updatedDate = setHours(setMinutes(newDate, selectedMinute), selectedHour);
        onTimeChange?.(updatedDate);
    }, [selectedHour, selectedMinute]);

    /** 🎯 시(hour) 변경 */
    const handleHourChange = useCallback((newHour: number) => {
        setSelectedHour((prev) => (prev !== newHour ? newHour : prev));
    }, []);

    /** 🎯 분(minute) 변경 */
    const handleMinuteChange = useCallback((newMinute: number) => {
        setSelectedMinute((prev) => (prev !== newMinute ? newMinute : prev));
    }, []);

    const handleScroll = useCallback((type: "hour" | "minute", event: React.UIEvent<HTMLDivElement>) => {
        if (isInitializing.current) return;

        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastScrollTime.current;
        if (timeDiff < 50) return; // 너무 빈번한 이벤트 방지
        lastScrollTime.current = currentTime;

        const scrollLeft = event.currentTarget.scrollLeft;
        const scrollRef = type === "hour" ? hourScrollRef : minuteScrollRef;
        const lastScrollLeft = scrollRef.current?.dataset.lastScrollLeft
            ? parseInt(scrollRef.current.dataset.lastScrollLeft, 10)
            : scrollLeft;

        const distance = Math.abs(scrollLeft - lastScrollLeft); // 이동 거리
        const speed = distance / timeDiff; // 속도 = 이동 거리 / 시간 차이

        const dynamicSensitivity = SCROLL_SENSITIVITY / (1 + speed * 2);
        const rawDelta = (scrollLeft - lastScrollLeft) / dynamicSensitivity;
        const delta = Math.round(rawDelta / ITEM_WIDTH);

        if (delta !== 0) { // 0일 경우 불필요한 렌더링 방지
            if (type === "hour") {
                const newHour = (24 + selectedHour + delta) % 24;
                handleHourChange(newHour);
            } else if (type === "minute") {
                const newMinute = (60 + selectedMinute + delta) % 60;
                handleMinuteChange(newMinute);
            }
        }

        if (scrollRef.current) {
            scrollRef.current.dataset.lastScrollLeft = scrollLeft.toString();
        }
    }, [selectedHour, selectedMinute]);

    useEffect(() => {
        requestAnimationFrame(() => {
            if (hourScrollRef.current) {
                hourScrollRef.current.scrollTo({ left: INITIAL_OFFSET, behavior: 'instant' });
            }
            if (minuteScrollRef.current) {
                minuteScrollRef.current.scrollTo({ left: INITIAL_OFFSET, behavior: 'instant' });
            }

            setTimeout(() => {
                isInitializing.current = false; // 🚀 초기화 후 스크롤 이벤트 허용
            }, 100);
        });
    }, []);

    return (
        <div
            className="text-2xl font-bold gap-2 flex flex-col justify-center items-center mt-10"
        >
            <div
                className="flex gap-2"
                onClick={onDateClick}
            >
                <span className="text-gray-400">{getMonth(selectedDate)+1}</span>
                <span className="text-black">월</span>
                <span className="text-gray-400">{getDate(selectedDate)}</span>
                <span className="text-black">일</span>
            </div>
            <div className="flex gap-2">
                <span className="text-black">{MERIDIEM_ITEMS[period]}</span>
                <span
                    className={`cursor-pointer ${activeSelector === "hour" ? "text-blue-500" : "text-gray-400"}`}
                    onClick={() => setActiveSelector("hour")}
                >
                    {displayHour}
                </span>
                <span className="text-black">시</span>
                <span
                    className={`cursor-pointer ${activeSelector === "minute" ? "text-blue-500" : "text-gray-400"}`}
                    onClick={() => setActiveSelector("minute")}
                >
                    {selectedMinute}
                </span>
                <span className="text-black">분</span>
            </div>

            {activeSelector && (
                <div className="relative w-full overflow-hidden mt-4">
                    <div
                        ref={activeSelector === 'hour' ? hourScrollRef : minuteScrollRef}
                        className="flex gap-2 overflow-x-auto scrollbar-hide px-4 items-center"
                        onScroll={(e) => handleScroll(activeSelector, e)}
                        style={{
                            width: '100%',
                            minWidth: '400px',
                            whiteSpace: 'nowrap',
                            overflowX: 'scroll',
                        }}
                    >
                        {Array.from({ length: TOTAL_ITEMS }).map((_, index) => (
                            <div
                                key={index}
                                className={`${index % LONG_TICK_INTERVAL === 0 ? 'h-6 bg-gray-500' : 'h-4 bg-gray-300'}`}
                                style={{ minWidth: `${ITEM_WIDTH}px` }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
};

export default TimeSelector;

