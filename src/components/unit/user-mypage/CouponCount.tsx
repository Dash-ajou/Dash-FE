import React from "react";
import Icon from "../../common/icons/Icon";

type CouponCountType = "available" | "used";

interface CouponCountProps {
  type: CouponCountType;
  availablecoup?: number;
  usedcoup?: number;
}

const CouponCount: React.FC<CouponCountProps> = ({
  type,
  availablecoup,
  usedcoup,
}) => {
  const getContent = () => {
    switch (type) {
      case "available":
        return {
          icon: (
            <div className="pt-1">
              <Icon name="couponicon_line" size={35} />
            </div>
          ),
          message: "사용 가능한 쿠폰",
          coupnum: availablecoup,
        };
      case "used":
        return {
          icon: (
            <div className="pt-1.5">
              <Icon name="usedcouponicon_line" size={30} />
            </div>
          ),
          message: "사용 완료한 쿠폰",
          coupnum: usedcoup,
        };
    }
  };
  const { icon, message, coupnum } = getContent();

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-custom-basic">
      <div className="px-4 py-3">
        <h1 className="text-sm text-black font-semibold pb-2">{message}</h1>
        <div className="flex items-center gap-4">
          {icon}
          <p className="text-2xl font-black text-black">{coupnum}</p>
        </div>
      </div>
    </div>
  );
};

export default CouponCount;
