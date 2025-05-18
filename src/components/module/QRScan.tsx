import React, {useCallback, useEffect, useRef, useState} from "react";
import {Html5Qrcode, Html5QrcodeCameraScanConfig} from "html5-qrcode";
import SlideUpModal from "../common/modal/SlideUpModal.tsx";
import InputField from "../common/InputField.tsx";
import CommonButton from "../common/button/CommonButton.tsx";

type QRScanProps = {
    isPartner: boolean;
    onClick: (data: string) => void;
}

const QRScan: React.FC<QRScanProps> = ({
                                           isPartner,
                                           onClick
                                       }) => {
    const boxRef = useRef<HTMLDivElement>(null);
    const [maskBoxPx, setMaskBoxPx] = useState({x: 0, y: 0, width: 0, height: 0});
    const [screenSize, setScreenSize] = useState({width: 0, height: 0});
    const [scanned, setScanned] = useState(false);

    const [couponNum, setCouponNum] = useState<string>("");

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setCouponNum(event.target.value);
    }, []);

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
                    async (decodedText) => {
                        if (!scanned) {
                            setScanned(true);
                            try {
                                await html5QrCode.stop();
                                await html5QrCode.clear();
                            } catch (err) {
                                console.error(err);
                            }
                            onClick(decodedText);
                        }
                    },
                    () => {
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

    // 파란 박스 위치 → 마스크에 맞게 계산
    useEffect(() => {
        const updateMaskBox = () => {
            const box = boxRef.current;
            if (box) {
                const vw = window.innerWidth;
                const vh = window.innerHeight;

                const rawX = box.offsetLeft;
                const width = box.offsetWidth;
                const height = box.offsetHeight;
                const x = rawX - width / 2; // ← 여기 수정
                const y = box.offsetTop;

                setScreenSize({width: vw, height: vh});
                setMaskBoxPx({x, y, width, height});
            }
        };

        updateMaskBox();
        window.addEventListener("resize", updateMaskBox);
        return () => window.removeEventListener("resize", updateMaskBox);
    }, []);

    const handleClick = () => {
        onClick(couponNum);
    }

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* 카메라 화면 */}
            <div id="custom-qr-reader" className="absolute top-0 left-0 w-full h-full z-0"/>

            {/* 마스크 영역 */}
            <svg
                className="absolute top-0 left-0 z-10 pointer-events-none"
                width={screenSize.width}
                height={screenSize.height}
                viewBox={`0 0 ${screenSize.width} ${screenSize.height}`}
                preserveAspectRatio="none"
            >
                <defs>
                    <mask id="qr-mask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white"/>
                        <rect
                            x={maskBoxPx.x}
                            y={maskBoxPx.y}
                            width={maskBoxPx.width}
                            height={maskBoxPx.height}
                            fill="black"
                            rx="16"
                        />
                    </mask>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width={screenSize.width}
                    height={screenSize.height}
                    fill="black"
                    fillOpacity="0.6"
                    mask="url(#qr-mask)"
                />
            </svg>

            {/* 스캔 박스 */}
            <div
                ref={boxRef}
                id="qr-box"
                className="absolute top-24 left-1/2 w-[80%] aspect-square -translate-x-1/2 border-4 border-blue-500 rounded-2xl pointer-events-none z-20"
            >
                {/* 모서리 장식 */}
                <div className="absolute top-4 left-4 w-6 h-1 bg-white"/>
                <div className="absolute top-4 left-4 w-1 h-6 bg-white"/>
                <div className="absolute top-4 right-4 w-6 h-1 bg-white"/>
                <div className="absolute top-4 right-4 w-1 h-6 bg-white"/>
                <div className="absolute bottom-4 left-4 w-6 h-1 bg-white"/>
                <div className="absolute bottom-4 left-4 w-1 h-6 bg-white"/>
                <div className="absolute bottom-4 right-4 w-6 h-1 bg-white"/>
                <div className="absolute bottom-4 right-4 w-1 h-6 bg-white"/>
            </div>

            {/* 안내 문구 */}
            <p className="absolute bottom-24 w-full text-center text-white text-sm z-20">
                QR코드를 테두리 안에 위치시켜 주세요
            </p>

            <SlideUpModal
                isOpen={true}
                isFixed={true}
                height={"long"}
                title={"수동 번호 입력"}
            >
                <div className="mt-8 gap-8 flex flex-col">
                    <InputField
                        dropdown={false}
                        notice={{
                            icon: "noticeicon_fill",
                            detail: "QR코드 하단의 쿠폰번호를 입력해주세요",
                            color: "black",
                        }}
                        value={couponNum}
                        onInput={handleChange}
                    />
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: (isPartner ? "쿠폰 조회" : "쿠폰 등록"), position: "none"}}
                        onClick={handleClick}
                    />
                </div>
            </SlideUpModal>
        </div>
    );
};

export default QRScan;
