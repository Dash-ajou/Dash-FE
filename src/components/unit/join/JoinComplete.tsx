import React from "react"
import Icon from "../../common/icons/Icon.tsx"
import CommonButton from "../../common/button/CommonButton.tsx"
import { useNavigate } from "react-router-dom"

type JoinCompleteProps = {
    bottomPosition: string
}

const JoinComplete: React.FC<JoinCompleteProps> = ({ bottomPosition }) => {
    const navigate = useNavigate()

    const handleNext = () => {
        navigate("/login")
    }

    return (
        <div className="flex flex-col justify-center w-full">
            <div className="text-black font-bold text-xl mt-16">
                회원가입이 완료되었어요 <br />
                로그인을 진행해 주세요
            </div>

            <div className="flex w-full items-center justify-center mt-16">
                <Icon name="logoicon" size={120} />
            </div>

            <div
                className="absolute w-full px-6 left-0 right-0 flex"
                style={{ bottom: `${bottomPosition}px` }}
            >
                <CommonButton
                    size="large"
                    isActive={true}
                    mode="fill"
                    color="blue"
                    detail={{ label: "로그인", position: "none" }}
                    onClick={handleNext}
                />
            </div>
        </div>
    )
}

export default JoinComplete
