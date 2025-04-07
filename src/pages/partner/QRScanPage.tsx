import QRScan from "../../components/unit/partner-qrscan/QRScan.tsx";
import SubHeader from "../../components/layout/SubHeader.tsx";
import React, {useState} from "react";
import BasicModal from "../../components/common/modal/BasicModal.tsx";
import {useNavigate} from "react-router-dom";
import {CouponRegister} from "../../services/userCoupManageService.ts";

const QRScanPage: React.FC = () => {
    const [couponNum, setCouponNum] = useState<string>("");
    const [alarmModalOpen, setAlarmModalOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const navigate = useNavigate();

    const handleCouponRegister = async () => {
        try {
            const result = await CouponRegister({ coupon_number: couponNum });

            if (result.success) {
                setModalTitle("등록이 완료되었습니다");
                setIsSuccess(true);
            } else {
                setModalTitle("등록에 실패했습니다. 다시 시도해주세요.");
                setIsSuccess(false);
            }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setModalTitle("알 수 없는 오류가 발생했습니다.");
            setIsSuccess(false);
        } finally {
            setAlarmModalOpen(true);
        }
    };

    const handleConfirm = () => {
        if (isSuccess) {
            navigate("/usermain");
        } else {
            setAlarmModalOpen(false);
        }
    }

    return (
        <>
            <SubHeader/>
            <QRScan
                couponNum={couponNum}
                setCouponNum={setCouponNum}
                onClick={handleCouponRegister}
            />

            <BasicModal
                mode={"OnlyYes"}
                isOpen={alarmModalOpen}
                title={modalTitle}
                onConfirm={handleConfirm}
            />
        </>
    );
};

export default QRScanPage;
