import React from "react";
import { Route, Routes } from "react-router-dom";
import UserMain from "./pages/UserMain";
import UserNotification from "./pages/UserNotification";
import UserMypage from "./pages/UserMypage";
import UserGift from "./pages/UserGift";
import Layout from "./components/layout/Layout";

const App: React.FC = () => {
    return (
        <Routes>
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
