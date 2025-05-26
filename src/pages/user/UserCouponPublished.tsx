import { useEffect, useState } from "react";
import Icon from "../../components/common/icons/Icon";
import Layout from "../../components/layout/Layout";
import Block from "../../components/module/Block";
import { fetchPublishedCoupon, PublishedCoupon } from "../../services/userPublishedCouponService";
import { useNavigate } from "react-router-dom";
import { formatDateYMD } from "../../utiles/date";
import Statistics from "../../components/module/Statistics";

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

  const handleToggleChange = (issueId: number, isOn: boolean) => {
    console.log("Toggle changed:", { issueId, isOn });
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.issue_id === issueId ? { ...coupon, status: isOn ? "ENABLED" : "DISABLED" } : coupon,
      ),
    );
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

      <div className="px-2 flex flex-col gap-4">
        {filteredCoupons.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            {searchTerm ? "검색 결과가 없습니다." : "발행된 쿠폰이 없습니다."}
          </div>
        ) : (
          filteredCoupons.map((coupon) => (
            <div
              key={coupon.issue_id}
              onClick={() =>
                navigate("/user/coupon/published/detail", {
                  state: {
                    businessName: coupon.partner.business_name,
                    issueId: coupon.issue_id,
                  },
                })
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
