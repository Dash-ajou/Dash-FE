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
};

const Statistics: React.FC<StatisticsProps> = ({
  mode,
  title,
  orgname,
  published,
  registered = 0,
  used,
}) => {
  const percentage = Math.round((used / published) * 100);

  const getStrokeWidth = (mode: string) => {
    switch (mode) {
      case "totalstat":
        return 9; // 두께를 9%로 설정
      case "simplestat":
        return 13; // 두께를 13%로 설정기기
      case "orgstat":
        return 12; // 두께를 8%로 설정
      case "detailstat":
        return 7; // 두께를 7%로 설정
      default:
        return 8; // 기본값
    }
  };

  const totalStat = (
    <div className="w-[330px] h-[202px] p-4 bg-white border rounded-xl shadow-custom">
      <h2 className="text-black text-[16px] font-bold">{title || "종합통계"}</h2>
      <p className="text-serviceColor03 text-xs font-bold mt-0">사용률</p>
      <div className="w-[282px] h-[1px] bg-serviceColor04 my-3"></div>
      <div className="flex justify-center items-center">
      <div className="relative w-[100px] h-[100px]">
        <CircularProgressbar
            value={percentage}
            strokeWidth={getStrokeWidth("totalstat")}
            styles={buildStyles({
            pathColor: "#256FEF",
            trailColor: "#D3E2FC",
            backgroundColor: "#E9F1FD"
            })}
            background={true}
            backgroundPadding={0}
            text={""}
        />
        <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-[#256FEF]">
            {`${percentage}%`}
        </div>
        </div>

        <div className="flex flex-col text-xs ml-4">
            <div className="pb-2">
                <span className="font-bold">발행매수</span>
                <span className="font-light ml-4">{published}매</span>
            </div>
            <div className="pb-2">
                <span className="font-bold">사용매수</span>
                <span className="font-light ml-4">{used}매</span>
            </div>
            <div>
                <span className="font-bold">잔여매수</span>
                <span className="font-light ml-4">{published-used}매</span>
            </div>

        </div>
      </div>
    </div>
  );

  const simpleStat = (
    <div className="w-[297px] h-[128px] flex items-center justify-center bg-white border rounded-xl shadow-custom">
      <div className="relative w-[100px] h-[100px]">
        <CircularProgressbar
          value={percentage}          background={true}
          backgroundPadding={0}
          text={""}

          strokeWidth={getStrokeWidth("simplestat")}
          styles={buildStyles({
            textColor: "#256FEF",
            pathColor: "#256FEF",
            trailColor: "#D3E2FC",
            backgroundColor: "#E9F1FD",
          })}
        />
        <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-[#256FEF]">
            {`${percentage}%`}
        </div>
      </div>
      <div className="flex flex-col ml-8 text-xs">
            <div className="pb-2">
                <span className="font-bold">발행매수</span>
                <span className="font-light ml-4">{published}매</span>
            </div>
            <div className="pb-2">
                <span className="font-bold">사용매수</span>
                <span className="font-light ml-4">{used}매</span>
            </div>
            <div>
                <span className="font-bold">잔여매수</span>
                <span className="font-light ml-4">{published-used}매</span>
            </div>
        </div>
    </div>
  );

  const orgStat = (
    <div className="w-[151px] h-[187px] flex flex-col items-center bg-white border rounded-xl shadow-custom">
      <p className="mt-2 mb-1.5 text-[10px] font-bold w-full text-left px-2.5">{orgname}</p>
      <div className="w-[133px] h-[1px] bg-serviceColor04 mb-3"></div>
      <div className="relative w-[77px] h-[77px] mb-2">
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
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black]">
            {`${percentage}%`}
        </div>
      </div>
      <div>
        <div className="text-xs flex flex-col items-center mt-2">
            <div className="pb-2">
                <span className="font-regular pr-1">발행매수</span>
                <span className="font-bold text-main50">{published}매</span>
            </div>
            <div className="pb-2">
                <span className="font-regular pr-1">사용매수</span>
                <span className="font-bold text-main50">{used}매</span>
            </div>
        </div>
      </div>
    </div>
  );

  const detailStat = (
    <div className="w-[329px] h-[134px] flex items-center justify-center bg-white border rounded-xl shadow-custom">
      <div className="relative w-[76px] h-[76px]">
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
        <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[#16438F]">
            {`${percentage}%`}
        </div>
      </div>
      <div className="ml-5">
  <div>
    <span className="text-xs font-bold mr-3">발행매수</span>
    <span className="text-xs font-light">{published}매</span>
  </div>
  <div className="flex justify-between">
    <div>
      <span className="text-xs font-bold mr-3">등록매수</span>
      <span className="text-xs font-light">{registered}매</span>
    </div>
    <div className="ml-3">
      <span className="text-xs font-bold mr-3">미등록매수</span>
      <span className="text-xs font-light">{published - registered}매</span>
    </div>
  </div>
  <div className="flex justify-between">
    <div>
      <span className="text-xs font-bold mr-3">사용매수</span>
      <span className="text-xs font-light">{used}매</span>
    </div>
    <div className="ml-3">
      <span className="text-xs font-bold mr-3">잔여매수</span>
      <span className="text-xs font-light">{published - used}매</span>
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
