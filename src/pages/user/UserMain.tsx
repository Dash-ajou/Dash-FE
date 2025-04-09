import { useState } from "react";
import UserMainQRButton from "../../components/unit/user-main/UserMainQRButtons";
import UserMainButtons from "../../components/unit/user-main/UserMainButtons";
import BasicModal from "../../components/common/modal/BasicModal";
import QRModal from "../../components/module/QRModal";
import Layout from "../../components/layout/Layout";

const UserMain = () => {
    // TO-DO; 나중에 API에서 받아올 값 (현재는 임시값)
    const qrCount = 4;

    const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);

    const handleConfirm = () => {
        setIsBasicModalOpen(false);
        setIsQRModalOpen(true);
    };

    const handleCloseQRModal = () => {
        setIsQRModalOpen(false);
    };

    return (
        <Layout>
            <div className="mt-9 mb-7">
                <h1 className="text-black text-xl font-semibold">
                    ㅇㅇㅇ님의 쿠폰
                </h1>
            </div>
            <div>
                <UserMainQRButton qrCount={qrCount} />
            </div>
            <div className="mt-6">
                <UserMainButtons />
            </div>
            <BasicModal
                mode="YesNo"
                isOpen={isBasicModalOpen}
                title="쿠폰을 사용하시나요?"
                onClose={() => setIsBasicModalOpen(false)}
                onConfirm={handleConfirm}
            />
            {isQRModalOpen && (
                <div
                    className="fixed inset=0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleCloseQRModal}
                >
                    <QRModal
                        title="가나다라"
                        qrimg="none"
                        coupnum="1234-567-81"
                        storename="상점 이름"
                        duedate="2025-12-31"
                        onClose={handleCloseQRModal}
                    />
                </div>
            )}
            ;
        </Layout>
    );
};

export default UserMain;
