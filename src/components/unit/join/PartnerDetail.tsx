import React from "react"
import CommonButton from "../../common/button/CommonButton.tsx"

type PartnerInfoProps = {
    onNext: () => void
    bottomPosition: number
}

const PartnerDetail: React.FC<PartnerInfoProps> = ({ onNext, bottomPosition }) => {
    return (
        <div className="flex flex-col justify-center gap-4 w-full">
            <div className="font-bold text-black text-xl mt-16">파트너 회원은요</div>
            <div className="text-black text-xl">
                {" "}
                지류쿠폰을 발급하는 주체로, 벤더의 발급 요청을 관리하고 쿠폰에 해당하는 상품을
                제공합니다.
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
                    detail={{ label: "파트너 회원으로 계속하기", position: "none" }}
                    onClick={onNext}
                />
            </div>
        </div>
    )
}

export default PartnerDetail
