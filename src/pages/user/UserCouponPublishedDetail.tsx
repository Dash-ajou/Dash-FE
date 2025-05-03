//TO-DO: 쿠폰 철회하기 눌렀을 때 로직 추가 필요
//TO-DO: 다운로드 api 연동 필요
//TO-DO: 필터 API 연동 필요
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/module/Statistics";
import FilterGroup from "../../components/unit/user-coupon-detail/FilterGroup";
import ListBlock from "../../components/common/ListBlock";
import CommonButton from "../../components/common/button/CommonButton";
import {
    CouponRegistStatus,
    fetchCouponRegistStatus,
} from "../../services/userCoupRegisterationCheckService";
import SlideUpModal from "../../components/common/modal/SlideUpModal";
import BasicModal from "../../components/common/modal/BasicModal";

const UserCouponPublishedDetail = () => {
    const location = useLocation();
    const { issueId } = location.state || {}; // TO-DO: 실제 issueId 사용 시 null 방지 처리

    const [couponStatuses, setCouponStatuses] = useState<CouponRegistStatus[]>(
        []
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);

    useEffect(() => {
        // TO-DO: 실제 API 연결 시 mockCouponIds 제거, issueId로 coupon list API 호출 필요
        const mockCouponIds = [400011, 400012];

        const fetchAll = async () => {
            const result: CouponRegistStatus[] = [];
            for (const couponId of mockCouponIds) {
                try {
                    // TO-DO: 실제 연결 시 issueId도 함께 전달하도록 함수 시그니처 수정 필요
                    const data = await fetchCouponRegistStatus(couponId);
                    result.push(data);
                } catch (err) {
                    console.error(`쿠폰 ${couponId} 불러오기 실패`, err);
                }
            }
            setCouponStatuses(result);
        };
        fetchAll();
    }, [issueId]); // TO-DO: 의존성 배열 수정 고려 (실제 API에 따라)

    const statusToText = (
        status: string
    ): "Issued" | "Registered" | "Used" | undefined => {
        switch (status) {
            case "REGISTERABLE":
                return "Issued";
            case "USABLE":
                return "Registered";
            case "USED":
                return "Used";
            default:
                return undefined; // TO-DO: status 값 확장 시 이 부분도 같이 수정
        }
    };

    return (
        <>
            <Layout>
                <div className="relative w-full max-w-[430px] mx-auto min-h-screen">
                    <div className="px-5 mt-2 mb-12">
                        {/* TO-DO: 실제 발행/등록/사용된 수를 통계 API로 대체 */}
                        <Statistics
                            mode="detailstat"
                            published={50}
                            registered={38}
                            used={2}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div className="text-black text-xl font-bold leading-normal">
                                필터
                            </div>
                            <FilterGroup
                                onFilterClick={() => setIsFilterOpen(true)}
                                onDownloadClick={() => setIsModalOpen(true)}
                            />
                        </div>
                        <div className="w-full h-0 mx-auto outline outline-1 outline-offset-[-0.50px] outline-gray-300" />
                    </div>
                    <div className="flex flex-col mt-4 pb-40">
                        {couponStatuses.map((coupon) => (
                            <ListBlock
                                key={coupon.id}
                                type="coupstatuslist"
                                coupnum={`#${coupon.id}`}
                                coupstatus={statusToText(coupon.status)}
                                name={coupon.register?.name}
                            />
                        ))}
                    </div>
                </div>
            </Layout>
            <div className="absolute bottom-1 w-full py-4 bg-white shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.10)]">
                <div className="flex px-9">
                    <CommonButton
                        size="large"
                        isActive
                        mode="fill"
                        color="red"
                        detail={{
                            label: "쿠폰 철회하기",
                            position: "left",
                            icon: "trashicon_white",
                        }}
                        onClick={() => setIsBasicModalOpen(true)}
                    />
                </div>
            </div>
            <BasicModal
                mode="YesNo"
                isOpen={isBasicModalOpen}
                title="미등록 쿠폰을 철회할까요?"
                onClose={() => setIsBasicModalOpen(false)}
                onConfirm={() => {
                    //TO-DO: 실제 철회 로직 추가
                    setIsBasicModalOpen(false);
                }}
            />
            <SlideUpModal
                isOpen={isModalOpen}
                height="auto"
                onClose={() => setIsModalOpen(false)}
            >
                <div className="flex flex-col gap-4">
                    <CommonButton
                        size="large"
                        isActive
                        mode="fill"
                        color="blue"
                        detail={{ label: "csv 다운로드", position: "none" }}
                    />
                    <CommonButton
                        size="large"
                        isActive
                        mode="fill"
                        color="blue"
                        detail={{ label: "png 다운로드", position: "none" }}
                    />
                </div>
            </SlideUpModal>
            <SlideUpModal
                isOpen={isFilterOpen}
                height="auto"
                onClose={() => setIsFilterOpen(false)}
            >
                <div>
                    <p className="text-black text-base font-bold mb-6">
                        사용상태
                    </p>
                </div>
                <div className="flex flex-wrap gap-4 mb-10">
                    {["전체", "사용완료", "등록완료", "미등록"].map((label) => (
                        <div className="bg-white rounded-3xl border border-gray-200 text-black text-xs font-normal px-2 py-1">
                            {label}
                        </div>
                    ))}
                </div>
                <div className="flex w-full justify-between gap-4 px-8">
                    <CommonButton
                        size="large"
                        isActive
                        mode="line"
                        color="blue"
                        detail={{ label: "초기화", position: "none" }}
                    />
                    <CommonButton
                        size="large"
                        isActive
                        mode="fill"
                        color="blue"
                        detail={{ label: "필터 적용", position: "none" }}
                    />
                </div>
            </SlideUpModal>
        </>
    );
};

export default UserCouponPublishedDetail;
