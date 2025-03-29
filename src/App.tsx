import React from "react";
import {Route, Routes} from "react-router-dom";
import Join from "./pages/both/Join.tsx";
import Login from "./pages/both/Login.tsx";
import FindPW from "./pages/both/FIndPW.tsx";
import Onboarding from "./pages/both/Onboarding.tsx";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Onboarding/>}/>
            <Route path="/join" element={<Join/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/findpw" element={<FindPW/>}/>
        </Routes>
    )
}

export default App;
