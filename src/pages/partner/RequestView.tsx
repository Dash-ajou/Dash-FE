import React, {useEffect, useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import DetailBox from "../../components/common/DetailBox.tsx";
import {useParams} from "react-router-dom";
import CommonButton from "../../components/common/button/CommonButton.tsx";

const RequestView: React.FC = () => {
    const {request_id} = useParams<{ request_id: string }>();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            <div className="flex flex-row gap-4">
                <CommonButton
                    size="large"
                    mode="fill"
                    color="blue"
                    detail={{label: "승인", position: "left", icon: "checkicon_fill_white"}}
                />
                <CommonButton
                    size="large"
                    mode="line"
                    color="blue"
                    detail={{label: "반려", position: "left", icon: "crossicon_fill"}}
                />
            </div>
        </Layout>
    )
}

export default RequestView;
