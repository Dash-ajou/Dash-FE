import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/common/button/CommonButton";
import CouponCount from "../../components/unit/user-mypage/CouponCount";
import {
    fetchUserMyPage,
    UserMyPageData,
} from "../../services/userMypageService";
import DetailBox from "../../components/common/DetailBox";
import Layout from "../../components/layout/Layout";

const UserMypage = () => {
    const [userData, setUserData] = useState<UserMyPageData | null>(null);
    const [userType, setUserType] = useState<"USER" | "PARTNER">("USER");
    const navigate = useNavigate();

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

    const myInfoTitles = userData.menus.my_info.map((item) => item.title);
    const myInfoUrls = userData.menus.my_info.map((item) => item.url);

    return (
        <Layout>
            {/* TO-DO; 계정 타입 전환용 버튼, 삭제 필요 */}
            <div className="flex justify-end mt-4">
                <button
                    className="text-sm text-blue-500 underline"
                    onClick={() =>
                        setUserType((prev) =>
                            prev === "USER" ? "PARTNER" : "USER"
                        )
                    }
                >
                    현재 타입: {userType}
                </button>
            </div>

            <div className="text-black font-bold text-2xl mt-11 mb-4">
                <p>{userData.general_name}님 안녕하세요</p>
            </div>
            {userType === "USER" && (
                <div className="flex justify-center gap-3">
                    <div className="w-full">
                        <CouponCount
                            type="available"
                            count={userData.coupon_status.usable_coupons}
                        />
                    </div>
                    <div className="w-full">
                        <CouponCount
                            type="used"
                            count={userData.coupon_status.used_coupons}
                            onClick={() => navigate("/user/mypage/usedcoupon")}
                        />
                    </div>
                </div>
            )}

            <div className="flex flex-col mt-7 gap-4">
                <DetailBox
                    mode="default"
                    title="내 정보"
                    leftstring={myInfoTitles}
                    linkurl={myInfoUrls}
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

export default UserMypage;
