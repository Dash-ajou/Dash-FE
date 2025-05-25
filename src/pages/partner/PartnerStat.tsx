import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/module/Statistics";
import { fetchPartnerStats } from "../../services/partnerOrgStatService"; // 여기로 import 통일
import { useNavigate } from "react-router-dom";

const PartnerStat = () => {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof fetchPartnerStats>> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchPartnerStats();
      setStats(result);
    };
    loadData();
  }, []);

  return (
    <Layout>
      <div className="px-6 mb-5">
        {stats && (
          <Statistics mode="simplestat" published={stats.total_issued} used={stats.total_used} />
        )}
      </div>
      <div className="px-4">
        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
      </div>
      <div className="px-4 py-5">
        <p className="font-bold text-black text-base">발행 단체별 사용현황</p>
      </div>
      <div className="flex py-1 gap-3 overflow-x-auto scrollbar-hide">
        {stats?.vendors.map((vendor) => (
          <Statistics
            key={vendor.vendor_name}
            mode="orgstat"
            orgname={vendor.vendor_name}
            published={vendor.vendor_issued_count}
            used={vendor.vendor_used_count}
            onClick={() =>
              navigate("/partner/orgdetail", {
                state: {
                  vendor_id: vendor.vendor_id,
                  name: vendor.vendor_name,
                },
              })
            }
          />
        ))}
      </div>
      <div className="px-4 mt-7">
        <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
      </div>
      <div className="px-4 py-5">
        <p className="font-bold text-black text-base">메뉴별 사용현황</p>
      </div>
      <div className="flex py-1 gap-3 overflow-x-auto scrollbar-hide">
        {stats?.menu_usage.map((menu) => (
          <Statistics
            key={menu.menu_name}
            mode="orgstat"
            orgname={menu.menu_name}
            published={menu.menu_issued_count}
            used={menu.menu_used_count}
            onClick={() =>
              navigate("/partner/menudetail", {
                state: { name: menu.menu_name },
              })
            }
          />
        ))}
      </div>
    </Layout>
  );
};

export default PartnerStat;
