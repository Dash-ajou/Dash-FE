import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/module/Statistics";
import { fetchPartnerStats, MainPartnerStats } from "../../services/partnerStatService";
import { useNavigate } from "react-router-dom";

const PartnerStat = () => {
  const [stats, setStats] = useState<MainPartnerStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchPartnerStats();
        setStats(result);
      } catch (error) {
        console.error("Failed to load partner stats:", error);
      }
    };
    loadData();
  }, []);

  return (
    <Layout>
      <div className="mt-10 px-6 mb-5">
        {stats && (
          <Statistics mode="simplestat" published={stats.totalIssued} used={stats.totalUsed} />
        )}
      </div>
          <div className="w-full h-0 mt-7 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
      <div className="px-4 py-5">
        <p className="font-bold text-black text-base">발행 단체별 사용현황</p>
      </div>
      <div className="flex py-1 gap-3 overflow-x-auto scrollbar-hide">
        {stats?.detailedStats.map((vendor) => (
          <Statistics
            key={vendor.vendorId}
            mode="orgstat"
            orgname={vendor.vendorName}
            published={vendor.vendorIssued}
            used={vendor.vendorUsed}
            onClick={() =>
              navigate(`/partner/orgdetail/${vendor.vendorId}`)
            }
          />
        ))}
      </div>
        <div className="w-full h-0 mt-7 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>

        <div className="px-4 py-5">
            <p className="font-bold text-black text-base">메뉴별 사용현황</p>
        </div>
        <div className="flex py-1 gap-3 overflow-x-auto scrollbar-hide">
            {stats?.menuUsage?.map((menu, index) => (
                <Statistics
                    key={index}
                    mode="orgstat"
                    orgname={menu.menuName}
                    published={menu.menuIssued}
                    used={menu.menuUsed}
                    onClick={() => navigate(`/partner/menudetail/${encodeURIComponent(menu.menuName)}`)}
                />
            ))}
        </div>

    </Layout>
  );
};

export default PartnerStat;
