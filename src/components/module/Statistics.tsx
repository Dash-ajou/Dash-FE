import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export type StatisticsProps = {
  mode: "totalstat" | "simplestat" | "orgstat" | "detailstat";
  title?: string;
  orgname?: string;
  published: number;
  registered?: number;
  used: number;
  onClick?: () => void;
};

const Statistics: React.FC<StatisticsProps> = ({
  mode,
  title,
  orgname,
  published,
  registered = 0,
  used,
  onClick,
}) => {
  const percentage = Math.round((used / published) * 100);

  const getStrokeWidth = (mode: string) => {
    switch (mode) {
      case "totalstat":
        return 9;
      case "simplestat":
        return 13;
      case "orgstat":
        return 12;
      case "detailstat":
        return 7;
      default:
        return 8;
    }
  };

  const totalStat = (
    <div className="flex flex-col px-6 py-5 bg-white border rounded-xl shadow-custom-basic">
      <h2 className="text-black text-base font-bold">{title || "종합통계"}</h2>
      <p className="text-gray-400 text-xs font-bold mt-0">사용률</p>
      <hr className="w-full my-3 border-gray-300" />
      <div className="flex justify-between items-center mx-8">
        <div className="relative w-24 h-24">
          <CircularProgressbar
            value={percentage}
            strokeWidth={getStrokeWidth("totalstat")}
            styles={buildStyles({
              pathColor: "#256FEF",
              trailColor: "#E9F1FD",
              backgroundColor: "#D3E2FC",
            })}
            background={true}
            backgroundPadding={0}
            text={""}
          />
          <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-blue-500">
            {`${percentage}%`}
          </div>
        </div>

        <div className="flex flex-col text-xs items-center ml-6 space-y-3">
          <div>
            <span className="font-bold text-black">발행매수</span>
            <span className="font-light text-black ml-4">{published}매</span>
          </div>
          <div>
            <span className="font-bold text-black">사용매수</span>
            <span className="font-light text-black ml-4">{used}매</span>
          </div>
          <div>
            <span className="font-bold text-black">잔여매수</span>
            <span className="font-light text-black ml-4">{published - used}매</span>
          </div>
        </div>
      </div>
    </div>
  );

  const simpleStat = (
    <div className="flex items-center justify-center bg-white border rounded-xl shadow-custom-basic px-5 py-3">
      <div className="relative w-24 h-24">
        <CircularProgressbar
          value={percentage}
          strokeWidth={getStrokeWidth("simplestat")}
          styles={buildStyles({
            textColor: "#256FEF",
            pathColor: "#256FEF",
            trailColor: "#E9F1FD",
            backgroundColor: "#D3E2FC",
          })}
          background={true}
          backgroundPadding={0}
          text={""}
        />
        <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-blue-500">
          {`${percentage}%`}
        </div>
      </div>
      <div className="flex flex-col ml-9 text-xs space-y-2">
        <div>
          <span className="font-bold text-black">발행매수</span>
          <span className="font-light text-black ml-4">{published}매</span>
        </div>
        <div>
          <span className="font-bold text-black">사용매수</span>
          <span className="font-light text-black ml-4">{used}매</span>
        </div>
        <div>
          <span className="font-bold text-gray-500">잔여매수</span>
          <span className="font-light text-gray-500 ml-4">{published - used}매</span>
        </div>
      </div>
    </div>
  );

  const orgStat = (
    <div
      className="flex flex-col min-w-[150px] items-center bg-white border rounded-xl shadow-custom-basic px-2"
      onClick={onClick}>
      <p className="text-left mt-2 mb-1.5 text-[10px] text-black font-bold w-full">{orgname}</p>
      <hr className="w-full mb-3 border-gray-300" />
      <div className="relative w-20 h-20 mb-2">
        <CircularProgressbar
          value={percentage}
          strokeWidth={getStrokeWidth("orgstat")}
          styles={buildStyles({
            textColor: "black",
            pathColor: "#BED4FA",
            trailColor: "#256FEF",
          })}
          text={""}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
          {`${percentage}%`}
        </div>
      </div>
      <div>
        <div className="text-xs flex flex-col items-center mt-2 space-y-2">
          <div>
            <span className="font-regular text-black pr-1">발행매수</span>
            <span className="font-bold text-blue-500">{published}매</span>
          </div>
          <div className="pb-2">
            <span className="font-regular text-black pr-1">사용매수</span>
            <span className="font-bold text-blue-500">{used}매</span>
          </div>
        </div>
      </div>
    </div>
  );

  const detailStat = (
    <div className="flex items-center justify-center bg-white border rounded-xl shadow-custom-basic px-5 py-6">
      <div className="relative w-20 h-20">
        <CircularProgressbar
          value={percentage}
          strokeWidth={getStrokeWidth("detailstat")}
          styles={buildStyles({
            textColor: "#256FEF",
            pathColor: "#256FEF",
            trailColor: "#E9F1FD",
            backgroundColor: "#D3E2FC",
          })}
          background={true}
          backgroundPadding={0}
          text={""}
        />
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-blue-700">
          {`${percentage}%`}
        </div>
      </div>

      <div className="flex ml-4">
        <div className="flex flex-col space-y-3 leading-tight text-xs text-black">
          <div>
            <span className="font-bold mr-3">발행매수</span>
            <span className="font-light">{published}매</span>
          </div>
          <div>
            <span className="font-bold mr-3">등록매수</span>
            <span className="font-light">{registered}매</span>
          </div>
          <div>
            <span className="font-bold mr-3">사용매수</span>
            <span className="font-light">{used}매</span>
          </div>
        </div>

        <div className="flex flex-col justify-end leading-tight text-xs text-black space-y-3 ml-3">
          <div>
            <span className=" font-bold mr-3">미등록매수</span>
            <span className=" font-light">{published - registered}매</span>
          </div>
          <div>
            <span className=" font-bold mr-3">잔여매수</span>
            <span className=" font-light">{published - used}매</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {mode === "totalstat" && totalStat}
      {mode === "simplestat" && simpleStat}
      {mode === "orgstat" && orgStat}
      {mode === "detailstat" && detailStat}
    </div>
  );
};

export default Statistics;
