import React from 'react';
import {useLocation} from "react-router-dom";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import Layout from "../../components/layout/Layout.tsx";
import DetailBox from "../../components/common/DetailBox.tsx";

const CouponRequestConfirm: React.FC = () => {
    const location = useLocation();
    const {vendor, request} = location.state;

    const handleSubmit = () => {

    }

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <div className="text-black font-bold text-xl mt-8 mb-4 min-h-16">
                    요청주신 내용을 정리해봤어요<br/>
                    한 번 더 확인 후 요청서를 발행해주세요
                </div>

                <DetailBox
                    mode={"coupinfo"}
                    title={"벤더 정보"}
                    leftstring={["발행 단체명", "대표자 명", "연락처"]}
                    rightstring={[vendor.organizationName, vendor.representativeName, vendor.contact]}
                />

                <DetailBox
                    mode={"coupinfo"}
                    title={"요청 상세"}
                    leftstring={[
                        "파트너 명",
                        "연락처",
                        "메뉴명",
                        ...Array(request.menu.length - 1).fill("")
                    ]}
                    rightstring={[
                        request.partnerName,
                        request.partnerPhone,
                        ...request.menu.map((item: { menuName: string; quantity: string }) => `${item.menuName} ${item.quantity}EA`)
                    ]}
                />

                <div className="flex justify-center mt-6">
                    <CommonButton
                        size="normal"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "요청서 발행", position: "right", icon: "arrowicon_line_right_white"}}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default CouponRequestConfirm;
