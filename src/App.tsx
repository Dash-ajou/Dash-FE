import { Route, Routes } from "react-router-dom";
import UserMain from "./pages/UserMain";
import UserNotification from "./pages/UserNotification";
import UserMypage from "./pages/UserMypage";
import UserGift from "./pages/UserGift";
import Layout from "./components/layout/Layout";
import QRScanPage from "./pages/partner/QRScanPage.tsx";

const App: React.FC = () => {
    return (
        <Routes>
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
