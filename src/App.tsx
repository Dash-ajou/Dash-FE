import React from "react";
import {Route, Routes} from "react-router-dom";
import QRScanPage from "./pages/partner/QRScanPage.tsx";


const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/qrscan" element={<QRScanPage/>}/>
        </Routes>
    )
}

export default App;
