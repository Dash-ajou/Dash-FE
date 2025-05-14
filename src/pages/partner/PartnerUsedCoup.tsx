import ListBlock from "../../components/common/ListBlock";
import Layout from "../../components/layout/Layout";
import Icon from "../../components/common/icons/Icon";
import { useEffect, useState } from "react";
import { fetchPartnerUsedCoupon } from "../../services/partnerUsedCouponService";

interface UsedCoupon {
  redeem_id: number;
  used_at: string;
  menu_name: string;
}

const PartnerUsedCoup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usedCoupons, setUsedCoupons] = useState<UsedCoupon[]>([]);

  useEffect(() => {
    const loadCoupons = async () => {
      const result = await fetchPartnerUsedCoupon();
      setUsedCoupons(result);
    };
    loadCoupons();
  }, []);

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
        {usedCoupons
          .filter((c) => c.menu_name.includes(searchTerm))
          .map((coup) => (
            <ListBlock
              key={coup.redeem_id}
              type="datetimelist"
              menuname={coup.menu_name}
              datetime={coup.used_at}
            />
          ))}
      </div>
    </Layout>
  );
};

export default PartnerUsedCoup;
