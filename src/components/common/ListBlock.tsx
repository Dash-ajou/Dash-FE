import React from "react";

type ListBlockProps = {
  type: "coupstatuslist" | "datetimelist" | "orgnamelist";
  coupnum?: string;
  coupstatus?: "Issued" | "Registered" | "Used";
  name?: string;
  datetime?: string;
  orgname?: string;
  coupea?: number;
  usedea?: number;
  menuname?: string;
  onClick?: () => void;
};

const ListBlock: React.FC<ListBlockProps> = ({
  type,
  coupnum,
  coupstatus,
  name,
  datetime,
  orgname,
  coupea,
  usedea,
  menuname,
    onClick,
}) => {
  // 쿠폰 상태별 텍스트 설정
  const coupstatuslist = () => {
    switch (coupstatus) {
      case "Issued":
        return `미등록`;
      case "Registered":
        return `${name ? `${name}/` : ""}등록완료`;
      case "Used":
        return `${name ? `${name}/` : ""}사용완료`;
      default:
        return "";
    }
  };

  // 표시할 내용 결정
  const getContent = () => {
    switch (type) {
      case "coupstatuslist":
        return coupstatuslist();
      case "datetimelist":
        return datetime ? `${datetime}` : "정보 없음";
      case "orgnamelist":
        return orgname && coupea !== undefined && usedea !== undefined
          ? `${usedea}/${coupea}`
          : "정보 없음";
      default:
        return "잘못된 타입";
    }
  };

  return (
    <div
      className={`flex items-center justify-between w-full px-6 py-4 rounded-xl text-xs text-black font-normal my-1 
                        ${type === "orgnamelist" ? "bg-gray-200" : "bg-blue-50"}`} onClick={onClick}>
      <span className={type === "datetimelist" ? "flex flex-wrap text-base font-medium" : ""}>
        {type === "orgnamelist" ? orgname : type === "datetimelist" ? menuname : coupnum}
      </span>

      <span>{getContent()}</span>
    </div>
  );
};

export default ListBlock;
