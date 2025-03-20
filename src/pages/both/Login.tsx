import React, {useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import InputField from "../../components/common/InputField.tsx";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import {useNavigate} from "react-router-dom";
import Icon from "../../components/common/icons/Icon.tsx";

const Login: React.FC = () => {
    const [phoneNum, setPhoneNum] = useState<string>("");
    const [showNotice, setShowNotice] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [showLoginFail, setShowLoginFail] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const navigate = useNavigate();

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPhoneNum(value);

        if (value.length > 0 && value.length !== 11) {
            setShowNotice(true);
        } else {
            setShowNotice(false);
        }
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value); // ✅ 실시간 업데이트
    };

    const handleLogin = () => {
        //로그인 요청
        //로그인 실패 시
        setShowLoginFail(true);
    }

    return (
        <Layout>
            <div className="flex flex-col justify-center  w-full">
                <div className="mt-24 flex flex-col gap-12">
                    <InputField
                        placeholder={"전화번호"}
                        dropdown={false}
                        notice={showNotice ? {detail: "올바른 전화번호 형식이 아닙니다", color: "red"} : undefined}
                        value={phoneNum}
                        onInput={handlePhoneChange}
                    />
                    <div className="flex flex-col gap-2 relative">
                        <InputField
                            placeholder={"비밀번호"}
                            dropdown={false}
                            notice={showLoginFail ? {detail: "비밀번호가 올바르지 않습니다", color: "red"} : undefined} //수정필요
                            value={password}
                            onInput={handlePasswordChange}
                            type={showPassword ? "text" : "password"}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-3 top-6 transform -translate-y-1/2"
                        >
                            <Icon name={showPassword ? "eye_close" : "eye_open"} size={24}/>
                        </button>
                    </div>
                </div>

                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex flex-col">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "계속하기", position: "none"}}
                        onClick={handleLogin}
                    />
                </div>
                <div className="absolute left-0 right-0 w-full flex flex-row gap-4 justify-center bottom-[295px]">
                    <CommonButton
                        size="mini"
                        isActive={true}
                        mode="text_no_line"
                        color="black"
                        detail={{label: "도와주세요!", position: "none"}}
                        onClick={() => navigate("/findpw")}
                    />
                    <CommonButton
                        size="mini"
                        isActive={true}
                        mode="text_no_line"
                        color="black"
                        detail={{label: "새롭게 시작할래요!", position: "none"}}
                        onClick={() => navigate("/join")}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Login;
