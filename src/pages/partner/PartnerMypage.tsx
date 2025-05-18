import { useEffect, useState } from "react";
import CommonButton from "../../components/common/button/CommonButton";
import {
    fetchUserMyPage,
    UserMyPageData,
} from "../../services/userMypageService";
import DetailBox from "../../components/common/DetailBox";
import Layout from "../../components/layout/Layout";

const PartnerMypage = () => {
    const [userData, setUserData] = useState<UserMyPageData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchUserMyPage();
            if (res.success) {
                setUserData(res.data);
            }
        };
        fetchData();
    }, []);

    if (!userData) {
        return <div className="text-center mt-10">불러오는 중</div>;
    }

    return (
        <Layout>
            <div className="text-black font-bold text-2xl mt-11 mb-4">
                <p>{userData.general_name}님 안녕하세요</p>
            </div>

            <div className="flex flex-col mt-7 gap-4">
                <DetailBox
                    mode="default"
                    title="내 정보"
                    leftstring={userData.menus.my_info.map(
                        (item) => item.title
                    )}
                    linkurl={userData.menus.my_info.map((item) => item.url)}
                />
                <DetailBox
                    mode="default"
                    title="고객센터"
                    leftstring={userData.menus.customer_center.map(
                        (item) => item.title
                    )}
                    linkurl={userData.menus.customer_center.map(
                        (item) => item.url
                    )}
                />
            </div>

            <div className="flex flex-col items-center justify-center mt-7">
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="black"
                    detail={{ label: "로그아웃", position: "none" }}
                />
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="red"
                    detail={{ label: "회원 탈퇴", position: "none" }}
                />
            </div>
        </Layout>
    );
};

export default PartnerMypage;
