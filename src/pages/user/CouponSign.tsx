import React, { useState, useRef, useEffect } from "react"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { CouponRegister, couponRegisterSignUpload } from "../../services/userCoupManageService.ts"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { useNavigate, useParams } from "react-router-dom"
import SignatureCanvas from "react-signature-canvas"
import Layout from "../../components/layout/Layout.tsx"
import Icon from "../../components/common/icons/Icon.tsx"

const CouponSign: React.FC = () => {
    const navigate = useNavigate()
    const [alarmModalOpen, setAlarmModalOpen] = useState<boolean>(false)
    const [modalTitle, setModalTitle] = useState<string>("")
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
    const sigCanvasRef = useRef<SignatureCanvas>(null)
    const [canvasWidth, setCanvasWidth] = useState<number>(window.innerWidth * 0.9)
    const [canvasHeight, setCanvasHeight] = useState<number>(window.innerHeight * 0.6)
    const { couponNum } = useParams<{ couponNum: string }>()

    useEffect(() => {
        const handleResize = () => {
            setCanvasWidth(window.innerWidth * 0.9)
            setCanvasHeight(window.innerHeight * 0.6)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const handleCouponSignRegister = async (couponNum: string) => {
        try {
            if (!sigCanvasRef.current || sigCanvasRef.current.isEmpty()) {
                throw new Error("서명 데이터가 없습니다.")
            }

            const dataUrl = sigCanvasRef.current.getCanvas().toDataURL("image/png")

            const dataUrlToFile = (dataUrl: string, fileName: string): File => {
                const arr = dataUrl.split(",")
                const mime = arr[0].match(/:(.*?);/)![1]
                const bstr = atob(arr[1])
                let n = bstr.length
                const u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], fileName, { type: mime })
            }

            const signatureFile = dataUrlToFile(dataUrl, "signature.png")

            const formData = new FormData()
            formData.append("sign", signatureFile)
            formData.append("register_code", couponNum)

            const result = await couponRegisterSignUpload(formData)

            if (result.success) {
                const registerResult = await handleCouponRegister(couponNum)
                if (registerResult) {
                    setModalTitle("등록이 완료되었습니다")
                    setIsSuccess(true)
                } else {
                    setModalTitle("등록에 실패했습니다. 다시 시도해주세요.")
                    setIsSuccess(false)
                }
            } else {
                setModalTitle("등록에 실패했습니다. 다시 시도해주세요.")
                setIsSuccess(false)
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Coupon 등록 에러:", error)

            setModalTitle("알 수 없는 오류가 발생했습니다.")
            setIsSuccess(false)
        } finally {
            setAlarmModalOpen(true)
        }
    }

    const handleCouponRegister = async (couponNum: string): Promise<boolean> => {
        try {
            const result = await CouponRegister({
                coupon_number: couponNum,
            })

            return result.success
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return false
        }
    }

    const handleConfirm = () => {
        if (isSuccess) {
            navigate("/user/main")
        } else {
            setAlarmModalOpen(false)
        }
    }

    return (
        <Layout>
            <div className="flex flex-col justify-center w-full mt-4">
                <div className="text-black font-bold text-xl mb-4">
                    쿠폰 등록을 위해 서명을 해주세요
                </div>

                <div className="relative border border-gray-400 rounded-[48px] p-4 mb-6 bg-white">
                    <SignatureCanvas
                        penColor="black"
                        canvasProps={{
                            width: canvasWidth,
                            height: canvasHeight,
                            className: "sigCanvas",
                        }}
                        ref={sigCanvasRef}
                    />
                    <button
                        className="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-red-500 text-white text-3xl shadow-md z-20 flex items-center justify-center"
                        onClick={() => sigCanvasRef.current?.clear()}
                    >
                        <Icon name={"trashicon_white"} size={36} />
                    </button>
                </div>
                <CommonButton
                    size={"large"}
                    mode={"fill"}
                    color={"blue"}
                    isActive={true}
                    detail={{ label: "쿠폰 등록하기", position: "none" }}
                    onClick={() => {
                        if (couponNum) {
                            handleCouponSignRegister(couponNum)
                        } else {
                            alert("쿠폰 번호가 없습니다.")
                        }
                    }}
                />

                <BasicModal
                    mode={"OnlyYes"}
                    isOpen={alarmModalOpen}
                    title={modalTitle}
                    onConfirm={handleConfirm}
                />
            </div>
        </Layout>
    )
}

export default CouponSign
