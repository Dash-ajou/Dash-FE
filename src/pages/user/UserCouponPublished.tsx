import { useEffect, useState } from "react";
import Icon from "../../components/common/icons/Icon";
import Layout from "../../components/layout/Layout";
import Block from "../../components/module/Block";
import { fetchPublishedCoupon, PublishedCoupon } from "../../services/userPublishedCouponService";
import { useNavigate } from "react-router-dom";
import { formatDateYMD } from "../../utiles/date";
import { updateCouponStatus } from '../../services/vendorCouponStatusUpdateService.ts'

const UserCouponPublished = () => {
  const [coupons, setCoupons] = useState<PublishedCoupon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadCoupons = async () => {
      try {
        const data = await fetchPublishedCoupon();
        console.log("Fetched coupons:", data);
        setCoupons(data);
      } catch (err) {
        console.error(err, "실패");
      }
    };
    loadCoupons();
  }, []);

    const handleToggleChange = async (issueId: number, isOn: boolean) => {
    const requestStatus = isOn ? "ENABLE" : "DISABLE"; // 서버에 보낼 값
    const newClientStatus = isOn ? "ENABLED" : "DISABLED"; // 프론트에 저장할 값

    try {
      const response = await updateCouponStatus({ issueId: `${issueId}`, status: requestStatus });
      console.log("Status updated:", response);

      setCoupons((prevCoupons) =>
          prevCoupons.map((coupon) =>
              coupon.issue_id === issueId
                  ? { ...coupon, status: newClientStatus }
                  : coupon
          )
      );
    } catch (error) {
      console.error("쿠폰 상태 변경 실패:", error);
    }
  };


  const filteredCoupons = coupons
    .filter((coupon) => coupon && coupon.partner && coupon.partner.business_name)
    .filter((coupon) =>
      coupon.partner.business_name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <Layout>
      <div className="w-full px-4 py-2 mt-3 mb-8 bg-white rounded-md outline outline-1 outline-zinc-300 flex items-center gap-3">
        <Icon name="search_gray" size={18} />
        <input
          type="text"
          placeholder="파트너명 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-base text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
        />
      </div>

      <div className="py-1 px-2 flex flex-col gap-4 overflow-y-auto scrollbar-hide max-h-[calc(100vh-200px)]">
        {filteredCoupons.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            {searchTerm ? "검색 결과가 없습니다." : "발행된 쿠폰이 없습니다."}
          </div>
        ) : (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.issue_id}
              onClick={() =>
                  navigate(`/user/coupon/published/${coupon.issue_id}`) // state 제거
                }>
              <Block
                key={coupon.issue_id}
                type="toggle"
                title={coupon.partner.business_name}
                subtitle={`사용 현황: ${coupon.used_count} / ${coupon.issue_count}`}
                info={`유효 기간: ~${formatDateYMD(coupon.issue_at)}`}
                isActive={coupon.status === "ENABLED"}
                onToggleChange={(isOn) => handleToggleChange(coupon.issue_id, isOn)}
              />
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default UserCouponPublished;
