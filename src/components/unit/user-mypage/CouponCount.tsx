import Icon from "../../common/icons/Icon";

interface CouponCountProps {
    type: "available" | "used";
    count: number;
    onClick?: () => void;
}

const CouponCount: React.FC<CouponCountProps> = ({ type, count, onClick }) => {
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
                };
            case "used":
                return {
                    icon: (
                        <div className="pt-1.5">
                            <Icon name="usedcouponicon_line" size={30} />
                        </div>
                    ),
                    message: "사용 완료한 쿠폰",
                };
        }
    };

    const { icon, message } = getContent();

    return (
        <div
            className="flex flex-col bg-white rounded-xl shadow-custom-basic"
            onClick={onClick}
        >
            <div className="px-4 py-3">
                <h1 className="text-sm text-black font-semibold pb-2">
                    {message}
                </h1>
                <div className="flex items-center gap-4">
                    {icon}
                    <p className="text-2xl font-black text-black">{count}</p>
                </div>
            </div>
        </div>
    );
};

export default CouponCount;
