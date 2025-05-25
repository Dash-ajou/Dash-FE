import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CommonButton from "../../components/common/button/CommonButton";
import CouponCount from "../../components/unit/user-mypage/CouponCount";
import { fetchUserMyPage, UserMyPageData } from "../../services/userMypageService";
import DetailBox from "../../components/common/DetailBox";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../../services/authService";
import { resetUserInfo } from "../../store/userSlice";

const UserMypage = () => {
  const [userData, setUserData] = useState<UserMyPageData | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userName = useSelector((state: RootState) => state.user.name);

  const handleLogOut = async () => {
    const res = await logout();
    if (res.success) {
      dispatch(resetUserInfo());
      navigate("/login");
    } else {
      alert("로그아웃에 실패했습니다.");
    }
  };

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
        <p>{userName}님 안녕하세요</p>
      </div>

      <div className="flex justify-center gap-3">
        <div className="w-full">
          <CouponCount type="available" count={userData.couponStatus.usableCoupons} />
        </div>
        <div className="w-full">
          <CouponCount
            type="used"
            count={userData.couponStatus.usedCoupons}
            onClick={() => navigate("/user/mypage/usedcoupon")}
          />
        </div>
      </div>

      <div className="flex flex-col mt-7 gap-4">
        <DetailBox
          mode="default"
          title="내 정보"
          leftstring={userData.menus.myInfo.map((item) => item.title)}
          linkurl={userData.menus.myInfo.map((item) => item.url)}
        />
        <DetailBox
          mode="default"
          title="고객센터"
          leftstring={userData.menus.customerCenter.map((item) => item.title)}
          linkurl={userData.menus.customerCenter.map((item) => item.url)}
        />
      </div>

      <div className="flex flex-col items-center justify-center mt-7">
        <CommonButton
          size="mini"
          isActive={true}
          mode="text"
          color="black"
          detail={{ label: "로그아웃", position: "none" }}
          onClick={handleLogOut}
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
