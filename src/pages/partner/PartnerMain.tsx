import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircleButton from "../../components/common/button/CircleButton";
import CommonButton from "../../components/common/button/CommonButton";
import Icon from "../../components/common/icons/Icon";
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/module/Statistics";
import QRScanButton from "../../components/unit/partner-main/QRScanButton";
import ListBlock from "../../components/common/ListBlock";
import {
    fetchPartnerStats,
    PartnerStats,
} from "../../services/partnerStatService";

const PartnerMain = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [stats, setStats] = useState<PartnerStats | null>(null);
    const navigate = useNavigate();

    const toggleCheck = () => {
        setIsChecked((prev) => !prev);
    };

    const goToStatsPage = () => {
        navigate("/partner/statistics");
    };

    useEffect(() => {
        const getStats = async () => {
            const res = await fetchPartnerStats();
            setStats(res);
        };
        getStats();
    }, []);

    return (
        <Layout>
            <div className="mt-5" onClick={goToStatsPage}>
                {/* TO-DO: API 연동 필요 */}
                {stats && (
                    <Statistics
                        mode="totalstat"
                        published={stats?.total_issued}
                        used={stats?.total_used}
                    />
                )}
            </div>
            <div className="flex flex-col w-full mt-5">
                <QRScanButton />
                <div className="flex w-full justify-between gap-3.5 mt-6 mb-5">
                    <CommonButton
                        size="large"
                        isActive
                        mode="ghost"
                        color="blue"
                        detail={{
                            label: "요청 목록",
                            position: "left",
                            icon: "listdetail_blue",
                        }}
                    />
                    <CommonButton
                        size="large"
                        isActive
                        mode="ghost"
                        color="blue"
                        detail={{
                            label: "완료 내역",
                            position: "left",
                            icon: "circlecheck_blue",
                        }}
                    />
                </div>
                <div className="w-full h-0 outline outline-2 outline-offset-[-1px] outline-blue-500"></div>
                <div className="relative w-full h-72 mt-4 bg-white rounded-xl shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] px-6 overflow-hidden">
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-black font-bold text-base">
                            발행 쿠폰 현황
                        </p>
                        <CircleButton
                            size="small"
                            fill="gray"
                            icon="searchicon_blue"
                        />
                    </div>
                    <div
                        className="flex items-center cursor-pointer space-x-1 mt-2 mb-2"
                        onClick={toggleCheck}
                    >
                        <div className="relative w-[22px] h-[22px] flex items-center justify-center">
                            <Icon
                                name="checkicon_fill_blue"
                                size={16}
                                className={`absolute ${
                                    isChecked ? "block" : "hidden"
                                }`}
                            />
                            <Icon
                                name="checkicon_line_blue"
                                size={22}
                                className={`absolute ${
                                    isChecked ? "hidden" : "block"
                                }`}
                            />
                        </div>
                        <div className="text-black text-xs font-medium">
                            사용 완료된 쿠폰도 함께 보기
                        </div>
                    </div>
                    <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
                    <div className="mt-4 pb-6 overflow-y-scroll h-[148px] pr-2 scrollbar-hide">
                        {/* TO-DO: API 연동 필요 */}
                        <ListBlock
                            type="orgnamelist"
                            orgname="아주대학교 총학생회"
                            coupea={150}
                            usedea={10}
                        />
                        <ListBlock
                            type="orgnamelist"
                            orgname="아주대학교 총학생회"
                            coupea={150}
                            usedea={10}
                        />
                        <ListBlock
                            type="orgnamelist"
                            orgname="아주대학교 총학생회"
                            coupea={150}
                            usedea={10}
                        />
                        <ListBlock
                            type="orgnamelist"
                            orgname="아주대학교 총학생회"
                            coupea={150}
                            usedea={10}
                        />
                        <ListBlock
                            type="orgnamelist"
                            orgname="아주대학교 총학생회"
                            coupea={150}
                            usedea={10}
                        />
                        <div
                            className="absolute bottom-0 left-0 w-full h-16 pointer-events-none z-10 rounded-b-xl"
                            style={{
                                background:
                                    "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0), rgba(255,255,255,1))",
                            }}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PartnerMain;
