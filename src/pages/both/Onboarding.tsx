import React, { useEffect } from "react"
import Icon from "../../components/common/icons/Icon.tsx"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { useNavigate } from "react-router-dom"
import { getUserInfo } from "../../services/authService.ts"

const Onboarding: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        async function checkSession() {
            try {
                const response = await getUserInfo()

                if (response.success) {
                    if (response.data.userType === "GENERAL") {
                        navigate("/user/main")
                    } else {
                        navigate("/partner/main")
                    }
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                //stay onboarding page
            }
        }

        checkSession()
    }, [])

    return (
        <div className="relative w-full min-h-screen bg-white overflow-hidden">
            <Icon
                name="logoicon"
                size={400}
                className="absolute opacity-5 right-[-100px] top-[35%] z-0 pointer-events-none"
            />

            <div className="relative z-10 flex flex-col items-center justify-between min-h-screen py-12 px-6">
                <div className="text-left font-bold w-full text-xl mt-6">
                    <div className="mt-16 space-y-4 w-[50%]">
                        <div className="flex items-center justify-end w-full space-x-4">
                            <span className="text-blue-900 whitespace-nowrap">복잡하지 않게,</span>
                            <div className="h-0.5 bg-blue-900 flex-grow"></div>
                        </div>
                        <div className="flex items-center justify-end w-full space-x-4">
                            <span className="text-blue-700 whitespace-nowrap">번거롭지 않게,</span>
                            <div className="h-0.5 bg-blue-700 flex-grow"></div>
                        </div>
                        <div className="flex items-center justify-end w-full space-x-4">
                            <span className="text-blue-600 whitespace-nowrap">
                                잊어버리지 않게,
                            </span>
                            <div className="h-0.5 bg-blue-600 flex-grow w-1/2"></div>
                        </div>
                    </div>

                    <div className="mt-12 flex items-center space-x-2">
                        <Icon name="logoicon" size={36} />
                        <h1 className="text-4xl font-bold text-blue-600">D:ASH</h1>
                    </div>
                </div>

                <div className="w-full flex flex-col mt-12">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{ label: "시작하기", position: "none" }}
                        onClick={() => navigate("/login")}
                    />
                    <div className="w-full mt-2 flex flex-row gap-4 justify-center">
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
            </div>
        </div>
    )
}

export default Onboarding
