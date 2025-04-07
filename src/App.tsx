import { Route, Routes } from "react-router-dom";
import UserMain from "./pages/user/UserMain.tsx";
//import UserNotification from "./pages/UserNotification";
//import UserMypage from "./pages/user/UserMypage.tsx";
import UserGift from "./pages/user/UserGift.tsx";
import Layout from "./components/layout/Layout";
import QRScanPage from "./pages/partner/QRScanPage.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/user/coupon/register" element={<QRScanPage/>}/>
            <Route
                path="/usermain"
                element={
                    <Layout>
                        <UserMain />
                    </Layout>
                }
            />
            {/*<Route*/}
            {/*    path="/usernotification"*/}
            {/*    element={*/}
            {/*        <Layout>*/}
            {/*            <UserNotification />*/}
            {/*        </Layout>*/}
            {/*    }*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    path="/usermypage"*/}
            {/*    element={*/}
            {/*        <Layout>*/}
            {/*            <UserMypage />*/}
            {/*        </Layout>*/}
            {/*    }*/}
            {/*/>*/}
            <Route
                path="/usergift"
                element={
                    <Layout>
                        <UserGift />
                    </Layout>
                }
            />
            <Route path="/partner/coupon/scan" element={<QRScanPage/>}/>
            <Route path="/partner/coupon/status/:couponNum" element={<></>} />
        </Routes>
    );
};

export default App;
