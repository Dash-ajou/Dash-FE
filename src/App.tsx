import React from "react";
import {Route, Routes} from "react-router-dom";
import UserMain from "./pages/user/UserMain";
//import UserNotification from "./pages/user/UserNotification";
import UserMypage from "./pages/user/UserMypage";
import UserGift from "./pages/user/UserGift.tsx";
import QRScanPage from "./pages/partner/QRScanPage.tsx";
import UserAccountInfo from "./pages/user/UserAccountInfo.tsx";
import CouponRequest from "./pages/vendor/CouponRequest.tsx";
import CouponRequestConfirm from "./pages/vendor/CouponRequestConfirm.tsx";
import CouponRequestList from "./pages/vendor/CouponRequestList.tsx";
import CouponRequestDetail from "./pages/vendor/CouponRequestDetail.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/user/coupon/register" element={<QRScanPage/>}/>
            <Route path="/user/main" element={<UserMain/>}/>
            {/*<Route path="/user/notification" element={<UserNotification/>}/>*/}
            <Route path="/user/mypage" element={<UserMypage/>}/>
            <Route path="/user/gift" element={<UserGift/>}/>
            <Route path="/user/accountinfo" element={<UserAccountInfo/>}/>
            <Route path="/partner/coupon/scan" element={<QRScanPage/>}/>
            <Route path="/partner/coupon/status/:couponNum" element={<></>} />
            <Route path="/user/coupon/request" element={<CouponRequest/>}/>
            <Route path="/user/coupon/request/confirm" element={<CouponRequestConfirm />} />
            <Route path="/user/coupon/request/list" element={<CouponRequestList/>}/>
            <Route path="/user/coupon/request/detail" element={<CouponRequestDetail/>}/>
        </Routes>
    );
};

export default App;
