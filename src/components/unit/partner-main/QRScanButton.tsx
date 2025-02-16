import React from 'react';
import Icon from "../../common/icons/Icon.tsx";

const QRScanButton: React.FC = () => {
    return (
        <button
            className="relative flex items-center justify-start shadow-custom-basic bg-white text-blue-500
                text-lg font-bold overflow-hidden flex-1 py-7 pl-7 pr-10 rounded-xl"
        >
            <Icon name="qricon_line" size={32} className="mr-4"/>
            QR 인식

            <span className="absolute right-[-30px] top-1/2 transform translate-y-[-50%] opacity-20 text-[120px]">
                <Icon name="qricon_line" size={150}/>
            </span>
        </button>
    );
};

export default QRScanButton;
