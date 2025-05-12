import React from "react";
import {Route, Routes} from "react-router-dom";
import Join from "./pages/both/Join.tsx";
import Login from "./pages/both/Login.tsx";
import FindPW from "./pages/both/FIndPW.tsx";
import Onboarding from "./pages/both/Onboarding.tsx";
import UserMain from "./pages/user/UserMain.tsx";
import UserNotification from "./pages/UserNotification";
import UserMypage from "./pages/user/UserMypage.tsx";
import UserGift from "./pages/user/UserGift.tsx";
import Layout from "./components/layout/Layout";
import QRScanPage from "./pages/partner/QRScanPage.tsx";
import UserAccountInfo from "./pages/user/UserAccountInfo.tsx";
import UserUsedCoupon from "./pages/user/UserUsedCoupon.tsx";
import UserCouponPublished from "./pages/user/UserCouponPublished.tsx";
import UserCouponPublishedDetail from "./pages/user/UserCouponPublishedDetail.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Onboarding/>}/>
            <Route path="/join" element={<Join/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/findpw" element={<FindPW/>}/>
            <Route path="/user/coupon/register" element={<QRScanPage />} />
            <Route path="/user/main" element={<UserMain />} />
            <Route path="/user/notification" element={<UserNotification />} />
            <Route path="/user/mypage" element={<UserMypage />} />
            <Route path="/user/gift" element={<UserGift />} />
            <Route path="/user/accountinfo" element={<UserAccountInfo />} />
            <Route path="/partner/coupon/scan" element={<QRScanPage />} />
            <Route path="/partner/coupon/status/:couponNum" element={<></>} />
            <Route path="/user/mypage/usedcoupon" element={<UserUsedCoupon />} />
            <Route path="/user/coupon/published" element={<UserCouponPublished />} />
            <Route path="/user/coupon/published/detail" element={<UserCouponPublishedDetail />} />
        </Routes>
    );
};

export default App;
