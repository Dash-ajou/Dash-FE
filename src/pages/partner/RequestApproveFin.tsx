import React from "react";
import Layout from "../../components/layout/Layout.tsx";
import Icon from "../../components/common/icons/Icon.tsx";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import {useNavigate} from "react-router-dom";

const RequestApproveFin: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="flex flex-col justify-center w-full">
                <div className="text-black font-bold text-xl mt-16">요청이 승인되었습니다 <br/>자세한 사항은 통계 탭의 발행 단체별 사용현황에서 <br/>확인할 수 있습니다 </div>

                <div className="flex w-full items-center justify-center mt-16">
                    <Icon name="logoicon" size={120}/>
                </div>

                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "계속하기", position: "none"}}
                        onClick={() => navigate("/partner/request/list")}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default RequestApproveFin;
