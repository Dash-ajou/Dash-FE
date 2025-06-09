import React, { useEffect } from "react"
import Layout from "../../components/layout/Layout.tsx"
import Icon from "../../components/common/icons/Icon.tsx"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { useNavigate } from "react-router-dom"

const RequestApproveFin: React.FC = () => {
    const navigate = useNavigate()

    const shouldBlock = true

    useEffect(() => {
        if (!shouldBlock) return

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault()
            event.returnValue = ""
        }

        const handlePopState = () => {
            if (window.confirm("이전 페이지로 이동할 수 없습니다. 메인으로 이동하시나요?")) {
                navigate("/partner/main", { replace: true })
            } else {
                window.history.forward()
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        window.addEventListener("popstate", handlePopState)

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload)
            window.removeEventListener("popstate", handlePopState)
        }
    }, [shouldBlock, navigate])

    return (
        <Layout>
            <div className="flex flex-col justify-center w-full">
                <div className="text-black font-bold text-xl mt-16">
                    요청이 승인되었습니다 <br />
                    자세한 사항은 통계 탭의 발행 단체별 사용현황에서 <br />
                    확인할 수 있습니다{" "}
                </div>

                <div className="flex w-full items-center justify-center mt-16">
                    <Icon name="logoicon" size={120} />
                </div>

                <div className="absolute bottom-[336px] px-6 left-0 right-0 w-full flex">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{ label: "계속하기", position: "none" }}
                        onClick={() => navigate("/partner/request/list")}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default RequestApproveFin
