import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import Layout from "../../components/layout/Layout.tsx";
import DetailBox from "../../components/common/DetailBox.tsx";
import BasicModal from "../../components/common/modal/BasicModal.tsx";

const CouponRequestConfirm: React.FC = () => {
    const location = useLocation();
    const {vendor, request} = location.state;

    const [showResultModal, setShowResultModal] = React.useState(false);
    const [modalMessage, setModalMessage] = React.useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        // try {
        //     const response = await couponRequest;
        //
        //     if (response.success) {
        //         setModalMessage("요청서 발행에 성공했습니다.");
        //     } else {
        //         setModalMessage("요청서 발행 중 오류가 발생했습니다.");
        //     }
        // } catch (error) {
        //     setModalMessage("요청서 발행 중 오류가 발생했습니다." + error);
        // } finally {
        //     setShowResultModal(true);
        // }
        const success = true;

        if (success) {
            setModalMessage("요청서 발행에 성공했습니다.");
        } else {
            setModalMessage("요청서 발행 중 오류가 발생했습니다.");
        }
        setShowResultModal(true);
    }

    const handleConfirm = () => {
        setShowResultModal(true);
        navigate('/user/coupon/request/detail', {state: 1})
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <div className="text-black font-bold text-xl mt-8 mb-4 min-h-16">
                    요청주신 내용을 정리해봤어요<br/>
                    한 번 더 확인 후 요청서를 발행해주세요
                </div>

                <DetailBox
                    mode={"default"}
                    title={"벤더 정보"}
                    leftstring={["발행 단체명", "대표자 명", "대표자 연락처"]}
                    rightstring={[vendor.organizationName, vendor.representativeName, vendor.contact]}
                />

                <DetailBox
                    mode={"default"}
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

            <BasicModal
                mode={"YesNo"}
                isOpen={showResultModal}
                title={modalMessage}
                onClose={()=>navigate('/user/main')}
                onConfirm={handleConfirm}
            />
        </Layout>
    );
};

export default CouponRequestConfirm;
