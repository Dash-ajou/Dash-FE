import InputField from "../../common/InputField.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";
import React, {useEffect, useState} from "react";
import Status from "../../common/Status.tsx";
import {useLocation} from "react-router-dom";

type PhoneAuthProps = {
    phoneNum: string;
    setPhoneNum: (num: string) => void;
    isVerified: boolean;
    setIsVerified: (verify: boolean) => void;
    onNext: () => void;
}

const PhoneAuth: React.FC<PhoneAuthProps> = ({phoneNum, setPhoneNum, isVerified, setIsVerified, onNext}) => {
    const location = useLocation();

    const [localPhoneNum, setLocalPhoneNum] = useState<string>(phoneNum);
    const [showNotice, setShowNotice] = useState<boolean>(false);
    const [isVerifyClicked, setIsVerifyClicked] = useState<boolean>(false);
    const [authCode, setAuthCode] = useState<string>("");
    const [showAuthNotice, setShowAuthNotice] = useState<boolean>(false);
    const [isCodeSixDigits, setIsCodeSixDigits] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeUnload = () => {
            setPhoneNum(localPhoneNum);
        };

        window.addEventListener("popstate", handleBeforeUnload);
        return () => {
            window.removeEventListener("popstate", handleBeforeUnload);
        };
    }, [localPhoneNum]);

    useEffect(() => {
        const changed = localPhoneNum !== phoneNum;
        if (changed && isVerified) {
            setIsVerified(false);
            setIsVerifyClicked(false);
            setAuthCode("");
        }
    }, [localPhoneNum, phoneNum]);

    const handleNext = () => {
        setPhoneNum(localPhoneNum);
        CheckAuthCode();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setLocalPhoneNum(value);

        if (value.length > 0 && value.length !== 11) {
            setShowNotice(true);
        } else {
            setShowNotice(false);
        }
    }

    const handleAuth = () => {
        setIsVerifyClicked(true);
    }

    const handleAuthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setAuthCode(value);
        setShowAuthNotice(false);

        setIsCodeSixDigits(value.length === 6);
    };

    const CheckAuthCode = () => {
        const correctCode = "123456";

        if (authCode === correctCode) {
            setIsVerified(true);
            onNext();
        } else {
            setShowAuthNotice(true);
        }
    }

    return (
        <div className="flex flex-col justify-center gap-6 w-full">
            <div
                className="text-black font-bold text-xl mt-16"
                style={{
                    visibility: location.pathname.startsWith("/join") ? "visible" : "hidden"
                }}
            >
                온라인 쿠폰 관리 플랫폼 Dash <br/>회원가입을 진행할게요
            </div>

            <div className="flex flex-row">
                <InputField
                    label={"전화번호를 입력해주세요"}
                    dropdown={false}
                    notice={showNotice ? {detail: "올바른 전화번호 형식이 아닙니다", color: "red"} : undefined}
                    value={localPhoneNum}
                    onInput={handleChange}
                />
                {!isVerified && (
                    <div className="mt-4">
                        <Status statusType="verify" color="button" onClick={handleAuth}/>
                    </div>
                )}
            </div>

            {isVerifyClicked && (
                <div className="flex flex-row items-center">
                    <InputField
                        label={"인증번호를 입력해주세요"}
                        dropdown={false}
                        notice={showAuthNotice ? {detail: "인증번호를 다시 확인해주세요", color: "red"} : undefined}
                        value={authCode}
                        onInput={handleAuthChange}
                    />
                    <Status statusType="time" color="timer"/>
                </div>
            )}

            {(isVerified || (!isVerified && isCodeSixDigits)) && (
                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "계속하기", position: "none"}}
                        onClick={handleNext}
                    />
                </div>
            )}
        </div>
    )
}

export default PhoneAuth;
