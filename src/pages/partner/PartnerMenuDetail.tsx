import { useState, useEffect } from "react";
import ListBlock from "../../components/common/ListBlock";
import Layout from "../../components/layout/Layout";
import {
    fetchPartnerMenuDetailStat,
    MenuVendorStat,
} from "../../services/partnerMenuDetailStatService";
import { useParams } from "react-router-dom";

const PartnerMenuDetail = () => {
    const { menuName } = useParams<{menuName: string}>();
    const [vendorList, setVendorList] = useState<MenuVendorStat[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!menuName) throw new Error("메뉴명이 없습니다.");
                const data = await fetchPartnerMenuDetailStat(menuName);
                setVendorList(data.vendors);
            } catch (error) {
                console.error("메뉴별 상세 정보 로딩 실패:", error);
            }
        };
        fetchData();
    }, [menuName]);
    return (
        <Layout>
            <div className="px-2">
                <div className="mt-9 justify-start mb-3 text-blue-500 text-base font-semibold leading-normal">
                    발행 요청 주체
                </div>
                <div className="w-full h-0 outline outline-1 outline-offset-[-0.50px] outline-gray-300"></div>
            </div>
            <div className="py-2">
                {vendorList.length === 0 && (
                    <div className="text-red-500 text-sm">빈 목록입니다</div>
                )}

                {vendorList.map((vendor, idx) => {
                    return (
                        <ListBlock
                            key={idx}
                            type="orgnamelist"
                            orgname={vendor.vendor_name}
                            coupea={vendor.vendor_issued}
                            usedea={vendor.vendor_used}
                        />
                    );
                })}

            </div>
        </Layout>
    );
};

export default PartnerMenuDetail;
