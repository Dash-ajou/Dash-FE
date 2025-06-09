import React, { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Join from "./pages/both/Join.tsx"
import Login from "./pages/both/Login.tsx"
import FindPW from "./pages/both/FIndPW.tsx"
import Onboarding from "./pages/both/Onboarding.tsx"
import UserMain from "./pages/user/UserMain.tsx"
import UserNotification from "./pages/user/UserNotification"
import UserMypage from "./pages/user/UserMypage.tsx"
import UserGift from "./pages/user/UserGift.tsx"
import QRScanPage from "./pages/partner/QRScanPage.tsx"
import UserAccountInfo from "./pages/user/UserAccountInfo.tsx"
import CouponRequest from "./pages/vendor/CouponRequest.tsx"
import CouponRequestConfirm from "./pages/vendor/CouponRequestConfirm.tsx"
import CouponRequestList from "./pages/vendor/CouponRequestList.tsx"
import CouponRequestDetail from "./pages/vendor/CouponRequestDetail.tsx"
import PartnerMain from "./pages/partner/PartnerMain.tsx"
import PartnerStat from "./pages/partner/PartnerStat.tsx"
import PartnerOrgDetail from "./pages/partner/PartnerOrgDetail.tsx"
import PartnerMenuDetail from "./pages/partner/PartnerMenuDetail.tsx"
import UserCouponPublished from "./pages/user/UserCouponPublished.tsx"
import UserCouponPublishedDetail from "./pages/user/UserCouponPublishedDetail.tsx"
import PaymentInfo from "./pages/partner/PaymentInfo.tsx"
import PhoneNumChange from "./pages/both/PhoneNumChange.tsx"
import EmailChange from "./pages/both/EmailChange.tsx"
import PartnerCoupValCheck from "./pages/partner/PartnerCoupValCheck.tsx"
import PartnerAuth from "./pages/partner/PartnerAuth.tsx"
import RequestView from "./pages/partner/RequestView.tsx"
import RequestApproveFin from "./pages/partner/RequestApproveFin.tsx"
import PartnerMypage from "./pages/partner/PartnerMypage.tsx"
import PartnerNotification from "./pages/partner/PartnerNotification.tsx"
import ProtectedRoute from "./components/common/ProtectedRoute"
import { useDispatch, useSelector } from "react-redux"
import { getUserInfo } from "./services/authService.ts"
import { setUserInfo } from "./store/userSlice.ts"
import { setUserType } from "./store/typeSlice.ts"
import { RootState } from "./store/store.ts"
import PartnerUsedCoupon from './pages/partner/PartnerUsedCoupon.tsx'
import UserUsedCoupon from './pages/user/UserUsedCoupon.tsx'
import { setIsMobile } from "./store/deviceSlice.ts"

const App: React.FC = () => {
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user)
    const type = useSelector((state: RootState) => state.type)

    useEffect(() => {
        const handleResize = () => {
            dispatch(setIsMobile(window.innerWidth <= 1024))
        }

        window.addEventListener("resize", handleResize)
        handleResize() // initial check

        return () => window.removeEventListener("resize", handleResize)
    }, [dispatch])

    useEffect(() => {
        if (!user.name || !type.userType) {
            getUserInfo().then((res) => {
                if (res.success && res.data) {
                    dispatch(
                        setUserInfo({
                            name: res.data.name,
                            email: res.data.email || "",
                            phone: res.data.phone,
                        })
                    )
                    dispatch(setUserType(res.data.userType))
                }
            })
        }
    }, [user.name, type.userType, dispatch])

    return (
        <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/join" element={<Join />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findpw" element={<FindPW />} />
            <Route
                path="/mypage/update/phone"
                element={
                    <ProtectedRoute>
                        <PhoneNumChange />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/mypage/update/email"
                element={
                    <ProtectedRoute>
                        <EmailChange />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/main"
                element={
                    <ProtectedRoute>
                        <UserMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/notification"
                element={
                    <ProtectedRoute>
                        <UserNotification />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/mypage"
                element={
                    <ProtectedRoute>
                        <UserMypage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/mypage/usedcoupon"
                element={
                    <ProtectedRoute>
                        <UserUsedCoupon />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/gift"
                element={
                    <ProtectedRoute>
                        <UserGift />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/general/account"
                element={
                    <ProtectedRoute>
                        <UserAccountInfo />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/register"
                element={
                    <ProtectedRoute>
                        <QRScanPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/request"
                element={
                    <ProtectedRoute>
                        <CouponRequest />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/request/confirm"
                element={
                    <ProtectedRoute>
                        <CouponRequestConfirm />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/request/list"
                element={
                    <ProtectedRoute>
                        <CouponRequestList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/request/detail"
                element={
                    <ProtectedRoute>
                        <CouponRequestDetail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/published"
                element={
                    <ProtectedRoute>
                        <UserCouponPublished />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/user/coupon/published/:issueId"
                element={
                    <ProtectedRoute>
                        <UserCouponPublishedDetail />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/partner/coupon/scan"
                element={
                    <ProtectedRoute>
                        <QRScanPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/coupon/status/:couponNum"
                element={
                    <ProtectedRoute>
                        <PartnerCoupValCheck />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/main"
                element={
                    <ProtectedRoute>
                        <PartnerMain />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/mypage"
                element={
                    <ProtectedRoute>
                        <PartnerMypage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/notification"
                element={
                    <ProtectedRoute>
                        <PartnerNotification />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/statistics"
                element={
                    <ProtectedRoute>
                        <PartnerStat />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/orgdetail/:vendorId"
                element={
                    <ProtectedRoute>
                        <PartnerOrgDetail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/menudetail/:menuName"
                element={
                    <ProtectedRoute>
                        <PartnerMenuDetail />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/request/auth"
                element={
                    <ProtectedRoute>
                        <PartnerAuth />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/request/list"
                element={
                    <ProtectedRoute>
                        <CouponRequestList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/request/detail"
                element={
                    <ProtectedRoute>
                        <RequestView />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/request/payment"
                element={
                    <ProtectedRoute>
                        <PaymentInfo />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/request/approve"
                element={
                    <ProtectedRoute>
                        <RequestApproveFin />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/partner/usedcoupon"
                element={
                    <ProtectedRoute>
                        <PartnerUsedCoupon />
                    </ProtectedRoute>
                }
            />
        </Routes>
    )
}

export default App
