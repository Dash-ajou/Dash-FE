import React from "react";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/both/Join.tsx";
import Login from "./pages/both/Login.tsx";
import FindPW from "./pages/both/FIndPW.tsx";
import Onboarding from "./pages/both/Onboarding.tsx";
import UserMain from "./pages/user/UserMain.tsx";
import UserNotification from "./pages/user/UserNotification";
import UserMypage from "./pages/user/UserMypage.tsx";
import UserGift from "./pages/user/UserGift.tsx";
import QRScanPage from "./pages/partner/QRScanPage.tsx";
import UserAccountInfo from "./pages/user/UserAccountInfo.tsx";
import CouponRequest from "./pages/vendor/CouponRequest.tsx";
import CouponRequestConfirm from "./pages/vendor/CouponRequestConfirm.tsx";
import CouponRequestList from "./pages/vendor/CouponRequestList.tsx";
import CouponRequestDetail from "./pages/vendor/CouponRequestDetail.tsx";
import UserUsedCoupon from "./pages/user/UserUsedCoupon.tsx";
import PartnerMain from "./pages/partner/PartnerMain.tsx";
import PartnerStat from "./pages/partner/PartnerStat.tsx";
import PartnerOrgDetail from "./pages/partner/PartnerOrgDetail.tsx";
import PartnerMenuDetail from "./pages/partner/PartnerMenuDetail.tsx";
import UserCouponPublished from "./pages/user/UserCouponPublished.tsx";
import UserCouponPublishedDetail from "./pages/user/UserCouponPublishedDetail.tsx";
import PaymentInfo from "./pages/partner/PaymentInfo.tsx";
import PhoneNumChange from "./pages/both/PhoneNumChange.tsx";
import EmailChange from "./pages/both/EmailChange.tsx";
import PartnerCoupValCheck from "./pages/partner/PartnerCoupValCheck.tsx";
import PartnerAuth from "./pages/partner/PartnerAuth.tsx";
import RequestView from "./pages/partner/RequestView.tsx";
import RequestApproveFin from "./pages/partner/RequestApproveFin.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Onboarding/>}/>
            <Route path="/join" element={<Join/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/findpw" element={<FindPW/>}/>
            <Route path="/mypage/update/phone" element={<PhoneNumChange/>}/>
            <Route path="/mypage/update/email" element={<EmailChange/>}/>

            <Route path="/user/main" element={<UserMain/>}/>
            <Route path="/user/notification" element={<UserNotification/>}/>
            <Route path="/user/mypage" element={<UserMypage/>}/>
            <Route path="/user/mypage/usedcoupon" element={<UserUsedCoupon/>}/>
            <Route path="/user/gift" element={<UserGift/>}/>
            <Route path="/user/accountinfo" element={<UserAccountInfo/>}/>
            <Route path="/user/coupon/register" element={<QRScanPage/>}/>
            <Route path="/user/coupon/request" element={<CouponRequest/>}/>
            <Route path="/user/coupon/request/confirm" element={<CouponRequestConfirm/>}/>
            <Route path="/user/coupon/request/list" element={<CouponRequestList/>}/>
            <Route path="/user/coupon/request/detail" element={<CouponRequestDetail/>}/>
            <Route path="/user/coupon/published" element={<UserCouponPublished/>}/>
            <Route path="/user/coupon/published/detail" element={<UserCouponPublishedDetail/>}/>

            <Route path="/partner/coupon/scan" element={<QRScanPage/>}/>
            <Route path="/partner/coupon/status/:couponNum" element={<></>}/>
            <Route path="/partner/main" element={<PartnerMain/>}/>
            <Route path="/partner/statistics" element={<PartnerStat/>}/>
            <Route path="/partner/orgdetail" element={<PartnerOrgDetail/>}/>
            <Route path="/partner/menudetail" element={<PartnerMenuDetail/>}/>
            <Route path="/partner/request/auth" element={<PartnerAuth/>}/>
            <Route path="/partner/request/list" element={<CouponRequestList/>}/>
            <Route path="/partner/request/detail" element={<RequestView/>}/>
            <Route path="/partner/request/payment" element={<PaymentInfo/>}/>
            <Route path="/partner/request/approve" element={<RequestApproveFin/>}/>
        </Routes>
    );
};

export default App;
