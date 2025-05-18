import React, {useCallback, useMemo, useState} from "react";
import InputField from "../../common/InputField.tsx";
import CommonButton from "../../common/button/CommonButton.tsx";
import Icon from "../../common/icons/Icon.tsx";

type PasswordInputProps = {
    onNext: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({onNext}) => {
    const [password, setPassword] = useState<string>("");
    const [verifyPassword, setVerifyPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState({ first: false, second: false });

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    const isValidPassword = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && password.length >= 8 && password.length <= 20;

    const isPasswordSame = useMemo(() => password === verifyPassword, [password, verifyPassword]);
    const isPasswordValid = isValidPassword && isPasswordSame;

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const handleAuthChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setVerifyPassword(event.target.value);
    }, []);

    const togglePasswordVisibility = useCallback((field: "first" | "second") => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    }, []);

    const handleNext = useCallback(() => {
        // 회원가입 처리 로직
        onNext();
    }, [onNext]);

    return (
        <div className="flex flex-col justify-center gap-6 w-full">
            <div className="text-black font-bold text-xl mt-16">비밀번호 입력</div>

            <div className="flex flex-col gap-2 relative">
                <InputField
                    placeholder={"영문 대소문자, 숫자, 특수문자를 포함한 8-20자"}
                    dropdown={false}
                    value={password}
                    onInput={handleChange}
                    type={showPassword.first ? "text" : "password"}
                />
                <button
                    type="button"
                    onClick={() => togglePasswordVisibility("first")}
                    className="absolute right-3 top-6 transform -translate-y-1/2"
                >
                    <Icon name={showPassword.first ? "eye_close" : "eye_open"} size={24}/>
                </button>
                <div className="text-sm">
                    <span className={hasUpperCase ? "text-green-500" : "text-red-500"}>영문 대문자,</span>
                    <span className={hasLowerCase ? "text-green-500" : "text-red-500"}> 영문 소문자,</span>
                    <span className={hasNumber ? "text-green-500" : "text-red-500"}> 숫자,</span>
                    <span className={hasSpecialChar ? "text-green-500" : "text-red-500"}> 특수문자</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 relative">
                <InputField
                    label={"비밀번호를 다시 한번 입력해주세요"}
                    dropdown={false}
                    notice={isPasswordSame ? undefined : {detail: "비밀번호가 일치하지 않습니다", color: "red"}}
                    value={verifyPassword}
                    onInput={handleAuthChange}
                    type={showPassword.second ? "text" : "password"}
                />
                <button
                    type="button"
                    onClick={() => togglePasswordVisibility("second")}
                    className="absolute right-3 top-12 transform -translate-y-1/2"
                >
                    <Icon name={showPassword.second ? "eye_close" : "eye_open"} size={24}/>
                </button>
            </div>

            {isPasswordValid && (
                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{label: "완료하기", position: "none"}}
                        onClick={handleNext}
                    />
                </div>
            )}
        </div>
    )
}

export default PasswordInput;
