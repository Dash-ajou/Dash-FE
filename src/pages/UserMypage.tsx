import { useEffect, useState } from "react";
import CommonButton from "../components/common/button/CommonButton";
import DetailBox from "../components/common/DetailBox";
import CouponCount from "../components/unit/user-mypage/CouponCount";
import { fetchUserMyPage, UserMyPageData } from "../services/userMypageService";

const UserMypage = () => {
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
        <div className="mx-7">
            <div className="text-black font-bold text-2xl mt-11 mb-4">
                <p>{userData.general_name}님 안녕하세요</p>
            </div>
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
                    />
                </div>
            </div>
            <div className="flex flex-col mt-7 gap-4">
                <DetailBox
                    mode="setting"
                    title="내 정보"
                    leftstring={userData.menus.my_info.map(
                        (item) => item.title
                    )}
                    linkurl={userData.menus.my_info.map((item) => item.url)}
                />
                <DetailBox
                    mode="setting"
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
        </div>
    );
};

export default UserMypage;
