import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import InputField from "../../components/common/InputField.tsx"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { useNavigate } from "react-router-dom"
import Icon from "../../components/common/icons/Icon.tsx"
import { useDispatch } from "react-redux"
import { setUserInfo } from "../../store/userSlice.ts"
import { login } from "../../services/authService.ts"
import { setUserType } from "../../store/typeSlice.ts"

const Login: React.FC = () => {
    const dispatch = useDispatch()

    const [phoneNum, setPhoneNum] = useState<string>("")
    const [showNotice, setShowNotice] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [showLoginFail, setShowLoginFail] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const navigate = useNavigate()

    const [bottomPosition, setBottomPosition] = useState(336)

    useEffect(() => {
        const updateBottom = () => {
            const windowHeight = window.innerHeight

            if (windowHeight >= 800) {
                setBottomPosition(336)
            } else {
                const decrease = 800 - windowHeight
                const newBottom = 336 - decrease
                setBottomPosition(Math.max(newBottom, 100))
            }
        }

        updateBottom()
        window.addEventListener("resize", updateBottom)
        return () => window.removeEventListener("resize", updateBottom)
    }, [])

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setPhoneNum(value)

        if (value.length > 0 && value.length !== 11) {
            setShowNotice(true)
        } else {
            setShowNotice(false)
        }
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleLogin = async () => {
        try {
            const response = await login({ user_phone: phoneNum, user_password: password })

            if (response.success) {
                const user = response.data
                dispatch(
                    setUserInfo({
                        name: user.user_name,
                        email: user.user_email,
                        phone: user.user_phone,
                    })
                )
                dispatch(setUserType(user.user_type))

                setShowLoginFail(false)
                if (user.user_type === "GENERAL") {
                    navigate("/user/main")
                } else if (user.user_type === "PARTNER") {
                    navigate("/partner/main")
                } else {
                    navigate("/")
                }
            } else {
                setShowLoginFail(true)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setShowLoginFail(true)
        }
    }

    return (
        <Layout>
            <div className="flex flex-col justify-center  w-full">
                <div className="mt-24 flex flex-col gap-12">
                    <InputField
                        placeholder={"전화번호"}
                        dropdown={false}
                        notice={
                            showNotice
                                ? { detail: "올바른 전화번호 형식이 아닙니다", color: "red" }
                                : undefined
                        }
                        value={phoneNum}
                        onInput={handlePhoneChange}
                    />
                    <div className="flex flex-col gap-2 relative">
                        <InputField
                            placeholder={"비밀번호"}
                            dropdown={false}
                            notice={
                                showLoginFail
                                    ? { detail: "비밀번호가 올바르지 않습니다", color: "red" }
                                    : undefined
                            }
                            value={password}
                            onInput={handlePasswordChange}
                            type={showPassword ? "text" : "password"}
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-6 transform -translate-y-1/2"
                        >
                            <Icon name={showPassword ? "eye_close" : "eye_open"} size={24} />
                        </button>
                    </div>
                </div>

                <div
                    className="absolute w-full px-6 left-0 right-0 flex flex-col"
                    style={{ bottom: `${bottomPosition}px` }}
                >
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{ label: "계속하기", position: "none" }}
                        onClick={handleLogin}
                    />
                </div>
                <div
                    className="absolute w-full px-6 left-0 right-0 flex flex-row gap-4 justify-center"
                    style={{ bottom: `${bottomPosition - 40}px` }}
                >
                    <CommonButton
                        size="mini"
                        isActive={true}
                        mode="text_no_line"
                        color="black"
                        detail={{ label: "도와주세요!", position: "none" }}
                        onClick={() => navigate("/findpw")}
                    />
                    <CommonButton
                        size="mini"
                        isActive={true}
                        mode="text_no_line"
                        color="black"
                        detail={{ label: "새롭게 시작할래요!", position: "none" }}
                        onClick={() => navigate("/join?step=roleSelect")}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default Login
