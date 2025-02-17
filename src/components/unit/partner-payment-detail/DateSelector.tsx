import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import CommonButton from "../../common/button/CommonButton";
import SlideUpModal from "../../common/modal/SlideUpModal";

type Mode = "date" | "time" | "default";

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<Mode>("date");
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false); // 시간 선택 모달 상태

  // 날짜 변경 핸들러
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // 시간 변경 핸들러
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = event.target.value.split(":").map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours, minutes);
      setSelectedDate(updatedDate);
    }
  };

  // 현재 날짜 & 시간 포맷
  const formattedDate = selectedDate.toLocaleDateString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).replace(/\./g, ""); // 점(.) 제거

  const formattedTime = selectedDate.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-5">
      {/* 기본 화면 */}
      {mode === "default" && (
        <div className="flex flex-col items-center gap-2 text-xl font-bold">
          {/* 날짜 */}
          <span className="cursor-pointer" onClick={() => setMode("date")}>
            <span className="text-gray-500 hover:text-blue-500">
              {formattedDate.split(" ")[0]}
            </span>
            <span className="text-black pl-1">월 </span>
            <span className="text-gray-500 hover:text-blue-500">
              {formattedDate.split(" ")[1]}
            </span>
            <span className="text-black pl-1">일</span>
          </span>

          {/* 시간 */}
          <span className="cursor-pointer" onClick={() => setIsTimeModalOpen(true)}>
            <span className="text-black">{formattedTime.split(" ")[0]} </span>
            <span className="text-gray-500 hover:text-blue-500">
              {formattedTime.split(" ")[1].split(":")[0]}
            </span>
            <span className="text-black pl-1">시 </span>
            <span className="text-gray-500 hover:text-blue-500">
              {formattedTime.split(" ")[1].split(":")[1]}
            </span>
            <span className="text-black pl-1">분</span>
          </span>
        </div>
      )}

      {/* SlideUpModal: 날짜 선택 화면 (초기 상태) */}
      {mode === "date" && (
        <SlideUpModal isOpen={true} height="long" onClose={() => setMode("default")} title="날짜 선택">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            locale={ko}
            inline
            dayClassName={(date) =>
              date.toDateString() === selectedDate.toDateString()
                ? "bg-blue-500 text-white rounded-lg"
                : ""
            }
          />
          <CommonButton
            size="large"
            mode="fill"
            color="blue"
            isActive={true}
            detail={{
              label: `${selectedDate.getFullYear()}년 ${
                selectedDate.getMonth() + 1
              }월 ${selectedDate.getDate()}일 (${formattedDate.split(" ")[2]}) 선택`,
              position: "none",
            }}
            onClick={() => setMode("default")}
          />
        </SlideUpModal>
      )}

      {/* SlideUpModal: 시간 선택 화면 (날짜 선택 후 열림) */}
      <SlideUpModal isOpen={isTimeModalOpen} height="short" onClose={() => setIsTimeModalOpen(false)} title="시간 선택">
        <div className="flex flex-col items-center gap-4">
          <input
            type="time"
            value={`${String(selectedDate.getHours()).padStart(2, "0")}:${String(
              selectedDate.getMinutes()
            ).padStart(2, "0")}`}
            onChange={handleTimeChange}
            className="w-40 text-xl text-center border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <CommonButton
            size="large"
            mode="fill"
            color="blue"
            isActive={true}
            detail={{
              label: `${formattedDate} ${formattedTime} 선택`,
              position: "none",
            }}
            onClick={() => setIsTimeModalOpen(false)}
          />
        </div>
      </SlideUpModal>
    </div>
  );
};

export default DateSelector;
