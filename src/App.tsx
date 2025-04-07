import React from "react";
import {Route, Routes} from "react-router-dom";
import Join from "./pages/both/Join.tsx";
import Login from "./pages/both/Login.tsx";
import FindPW from "./pages/both/FIndPW.tsx";
import Onboarding from "./pages/both/Onboarding.tsx";
import UserMain from "./pages/UserMain";
import UserNotification from "./pages/UserNotification";
import UserMypage from "./pages/UserMypage";
import UserGift from "./pages/UserGift";
import Layout from "./components/layout/Layout";
import QRScanPage from "./pages/partner/QRScanPage.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Onboarding/>}/>
            <Route path="/join" element={<Join/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/findpw" element={<FindPW/>}/>
            <Route
                path="/qrscan"
                element={<QRScanPage/>}
            />
            <Route
                path="/usermain"
                element={
                    <Layout>
                        <UserMain />
                    </Layout>
                }
            />
            <Route
                path="/usernotification"
                element={
                    <Layout>
                        <UserNotification />
                    </Layout>
                }
            />
            <Route
                path="/usermypage"
                element={
                    <Layout>
                        <UserMypage />
                    </Layout>
                }
            />
            <Route
                path="/usergift"
                element={
                    <Layout>
                        <UserGift />
                    </Layout>
                }
            />
        </Routes>
    );
};

export default App;
