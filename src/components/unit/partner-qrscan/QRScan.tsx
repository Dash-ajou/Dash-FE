import React, {useEffect} from "react";
import {Html5Qrcode, Html5QrcodeCameraScanConfig} from "html5-qrcode";

const QRScan: React.FC = () => {
    useEffect(() => {
        const html5QrCode = new Html5Qrcode("custom-qr-reader");

        Html5Qrcode.getCameras().then((devices) => {
            if (!devices || devices.length === 0) {
                alert("카메라를 찾을 수 없습니다.");
                return;
            }

            const config: Html5QrcodeCameraScanConfig = {
                fps: 10,
                qrbox: {width: 250, height: 250},
                aspectRatio: 1.0,
            };

            html5QrCode
                .start(
                    {facingMode: "environment"},
                    config,
                    (decodedText) => {
                        console.log("✅ QR 스캔 성공:", decodedText);
                        alert(`QR 코드: ${decodedText}`);
                    },
                    (errorMessage) => {
                        // console.log("스캔 실패:", errorMessage);
                    }
                )
                .catch((err) => {
                    console.error("카메라 시작 실패:", err);
                });

            return () => {
                html5QrCode.stop().then(() => html5QrCode.clear());
            };
        });
    }, []);

    return (
        <div className="relative w-full h-[calc(100vh-48px)] bg-black overflow-hidden">
            {/* 카메라 영역 (전체) */}
            <div id="custom-qr-reader" className="absolute top-0 left-0 w-full h-full z-0" />

            {/* shaded region - 파란 네모 바깥 어두운 배경 */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-5">
                {/* 위 */}
                <div className="absolute top-0 left-0 w-full h-[calc(50%-40%)] bg-black bg-opacity-60" />
                {/* 아래 */}
                <div className="absolute bottom-0 left-0 w-full h-[calc(50%-40%)] bg-black bg-opacity-60" />
                {/* 왼쪽 */}
                <div className="absolute top-[10%] left-0 w-[10%] h-[80%] bg-black bg-opacity-60" />
                {/* 오른쪽 */}
                <div className="absolute top-[10%] right-0 w-[10%] h-[80%] bg-black bg-opacity-60" />
            </div>

            {/* 스캔 가이드 박스 */}
            <div
                className="absolute top-1/2 left-1/2 w-[80%] aspect-square -translate-x-1/2 -translate-y-1/2 border-4 border-blue-500 rounded-md pointer-events-none z-10"
            >
                {/* 흰색 모서리 표시 (4개) */}
                <div className="absolute top-4 left-4 w-6 h-1 bg-white" />
                <div className="absolute top-4 left-4 w-1 h-6 bg-white" />
                <div className="absolute top-4 right-4 w-6 h-1 bg-white" />
                <div className="absolute top-4 right-4 w-1 h-6 bg-white" />
                <div className="absolute bottom-4 left-4 w-6 h-1 bg-white" />
                <div className="absolute bottom-4 left-4 w-1 h-6 bg-white" />
                <div className="absolute bottom-4 right-4 w-6 h-1 bg-white" />
                <div className="absolute bottom-4 right-4 w-1 h-6 bg-white" />
            </div>

            {/* 안내 문구 */}
            <p className="absolute bottom-24 w-full text-center text-white text-sm z-20">
                QR코드를 스캔하세요
            </p>
        </div>
    );
};

export default QRScan;
