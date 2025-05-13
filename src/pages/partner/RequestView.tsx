import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import DetailBox from "../../components/common/DetailBox.tsx";
import {useNavigate, useParams} from "react-router-dom";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import {couponRequestDetail} from "../../services/vendorCouponRequestService.ts";
import BasicModal from "../../components/common/modal/BasicModal.tsx";

const RequestView: React.FC = () => {
    const navigate=useNavigate();

    const {request_id} = useParams<{ request_id: string }>();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isApprovedModalOpen, setIsApprovedModalOpen] = useState(false);
    const [isRejectedModalOpen, setIsRejectedModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await couponRequestDetail(Number(request_id));
                if (response.success) {
                    setData(response.data);
                } else {
                    setError("데이터를 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                setError("데이터를 불러오는 중 오류가 발생했습니다." + error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [request_id]);

    const handleApprove = () => {
        //TODO - 승인 로직
        const productInfo = data.products.map((item: { product_name: string; count: number }) => ({
            menu_name: item.product_name,
            count: item.count
        }));

        navigate("/partner/request/payment", {
            state: {
                request_id,
                products: productInfo
            }
        });
    }

    const handleReject = () => {
        //TODO - 반려 로직
        navigate("/partner/request/list");
    }

    if (loading && !data || !data.products) {
        return <div>로딩 중...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6  mt-4">
                <DetailBox
                    mode={"default"}
                    title={"벤더 정보"}
                    leftstring={["발행 단체명", "대표자 명", "연락처", "작성 일시"]}
                    rightstring={[
                        data.vendor.vendor_name,
                        data.vendor.president_name,
                        data.vendor.president_phone,
                        data.created_at,
                    ]}
                />

                <DetailBox
                    mode={"default"}
                    title={"요청 상세"}
                    leftstring={[
                        "메뉴명",
                        ...Array(data?.products?.length - 1).fill("")
                    ]}
                    rightstring={[
                        ...data.products.map(
                            (item: { product_name: string; count: number }) =>
                                `${item.product_name}  ${item.count}EA`
                        ),
                    ]}
                />
            </div>

            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[450px] bg-white px-6 py-4 shadow-md flex justify-center gap-4 z-10">
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="fill"
                    color="blue"
                    detail={{label: "승인", position: "left", icon: "checkicon_fill_white"}}
                    onClick={()=>setIsApprovedModalOpen(true)}
                />
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="line"
                    color="blue"
                    detail={{label: "반려", position: "left", icon: "crossicon_fill"}}
                    onClick={()=>setIsRejectedModalOpen(true)}
                />
            </div>

            <BasicModal
                mode="YesNo"
                isOpen={isApprovedModalOpen}
                title={"승인을 위해 몇 가지 정보 입력이 필요합니다"}
                onClose={() => setIsApprovedModalOpen(false)}
                onConfirm={handleApprove}
            />
            <BasicModal
                mode="YesNo"
                isOpen={isRejectedModalOpen}
                title={"반려하시겠습니까?"}
                onClose={() => setIsRejectedModalOpen(false)}
                onConfirm={handleReject}
            />
        </Layout>
    )
}

export default RequestView;
