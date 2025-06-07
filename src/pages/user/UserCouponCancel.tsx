import Layout from "../../components/layout/Layout"
import InputField from "../../components/common/InputField"
import CommonButton from "../../components/common/button/CommonButton"
import BasicModal from "../../components/common/modal/BasicModal"
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import apiClient from "../../services/apiClient"

const UserCouponCancel = () => {
    const { issueId } = useParams<{ issueId: string }>()
    const navigate = useNavigate()
    const [verifyCode, setVerifyCode] = useState("")
    const [showNotice, setShowNotice] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("")

    const handleCancel = async () => {
        try {
            const res = await apiClient.post(
                `/coupon/manage/${issueId}/cancel`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            if (res.data.status === "SUCCEED") {
                setModalTitle("쿠폰발급 철회 및 쿠폰말소가 완료되었습니다")
            } else {
                setModalTitle("쿠폰 철회에 실패했습니다. 다시 시도해 주세요.")
            }
        } catch (err) {
            console.error(err)
            setModalTitle("서버 오류가 발생했습니다.")
        } finally {
            setIsModalOpen(true)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setVerifyCode(value)
        setShowNotice(false)
    }

    const handleConfirm = () => {
        if (verifyCode.length !== 6) {
            setShowNotice(true)
            return
        }
        handleCancel()
    }

    return (
        <>
            <Layout>
                <div className="w-full mx-auto mt-16 flex flex-col gap-6 px-6 pb-40">
                    <div className="text-black font-bold text-xl">
                        쿠폰 철회 인증번호를 입력해주세요
                    </div>
                    <InputField
                        label="인증번호를 입력해주세요"
                        dropdown={false}
                        value={verifyCode}
                        onInput={handleInputChange}
                        notice={
                            showNotice
                                ? { detail: "인증번호는 6자리여야 합니다", color: "red" }
                                : undefined
                        }
                    />
                </div>

                <div className="fixed bottom-0 left-0 right-0 w-full py-4 bg-white shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.10)] z-50">
                    <div className="flex px-9">
                        <CommonButton
                            size="large"
                            isActive={verifyCode.length === 6}
                            mode="fill"
                            color="blue"
                            detail={{ label: "계속하기", position: "none" }}
                            onClick={handleConfirm}
                        />
                    </div>
                </div>
            </Layout>

            <BasicModal
                mode="OnlyYes"
                isOpen={isModalOpen}
                title={modalTitle}
                onClose={() => {
                    setIsModalOpen(false)
                    if (modalTitle.includes("완료")) {
                        navigate("/user/coupon/published")
                    }
                }}
                onConfirm={() => {
                    setIsModalOpen(false)
                    if (modalTitle.includes("완료")) {
                        navigate("/user/coupon/published")
                    }
                }}
            />
        </>
    )
}

export default UserCouponCancel
