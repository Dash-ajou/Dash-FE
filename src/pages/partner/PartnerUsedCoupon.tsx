import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import Icon from "../../components/common/icons/Icon";
import ListBlock from "../../components/common/ListBlock";
import { fetchUsedCoupon, UsedCoupon } from "../../services/partnerCouponUsedService";
import { fetchCouponDetailService, CouponDetailResponse } from "../../services/couponDetailService";
import ReceiptModal from "../../components/common/modal/ReceiptModal";

type ExtendedCouponDetail = CouponDetailResponse["data"] & {
  payment_code: string;
};

const PartnerUsedCoupon = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [partnerUsedCoupons, setPartnerUsedCoupons] = useState<UsedCoupon[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<ExtendedCouponDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coupons = await fetchUsedCoupon();
        setPartnerUsedCoupons(coupons);
      } catch (error) {
        console.error("파트너 사용 완료 쿠폰 조회 실패", error);
      }
    };
    fetchData();
  }, []);

  const handlePartnerCouponClick = async (coupon: UsedCoupon) => {
    try {
      const res = await fetchCouponDetailService(coupon.coupon_id);
      setSelectedCoupon({
        ...res.data,
        payment_code: coupon.payment_code,
      });
      setModalVisible(true);
    } catch (err) {
      console.error("쿠폰 상세 조회 실패", err);
    }
  };

  const filteredCoupons = partnerUsedCoupons.filter((coupon) =>
    coupon.coupon_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Layout>
      <div>
        <div className="w-full px-4 py-2 mt-3 mb-8 bg-white rounded-md outline outline-1 outline-zinc-300 flex items-center gap-3">
          <Icon name="search_gray" size={18} />
          <input
            type="text"
            placeholder="쿠폰 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
          />
        </div>

        {filteredCoupons.length > 0 ? (
          filteredCoupons.map((coupon) => (
            <ListBlock
              key={coupon.coupon_id}
              type="datetimelist"
              menuname={coupon.coupon_name}
              datetime={new Date(coupon.used_at).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
              onClick={() => handlePartnerCouponClick(coupon)}
            />
          ))
        ) : (
          <div className="text-center text-sm text-gray-500">사용한 쿠폰이 없습니다.</div>
        )}
      </div>

      <ReceiptModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        coupon={selectedCoupon}
      />
    </Layout>
  );
};

export default PartnerUsedCoupon;
