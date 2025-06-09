import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Layout from "../../components/layout/Layout.tsx"
import InputField from "../../components/common/InputField.tsx"
import SlideUpModal from "../../components/common/modal/SlideUpModal.tsx"
import { format } from "date-fns"
import DateSelector from "../../components/unit/partner-payment-detail/DateSelector.tsx"
import CommonButton from "../../components/common/button/CommonButton.tsx"
import { ko } from "date-fns/locale"
import TimeSelector from "../../components/unit/partner-payment-detail/TimeSelector.tsx"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { RequestSign } from "../../services/partnerRequestManage.ts"

interface ProductInfo {
    menu_name: string
    menu_id: number
    count: number
}

interface ProductWithPrice extends ProductInfo {
    price: string
}

const PaymentInfo: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { request_id, products } = location.state || {}
    const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [isDateSelector, setIsDateSelector] = useState(true)
    const [menuItems, setMenuItems] = useState<ProductWithPrice[]>(
        (products || []).map((p: ProductInfo) => ({
            menu_name: p.menu_name,
            menu_id: p.menu_id,
            count: p.count,
            price: "",
        }))
    )
    const [discount, setDiscount] = useState<string>("")
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [isCheckModalOpen, setIsCheckModalOpen] = useState<boolean>(false)
    const [isFailModalOpen, setIsFailModalOpen] = useState<boolean>(false)

    React.useEffect(() => {
        const sum = menuItems.reduce((acc, item) => {
            const price = parseInt(item.price, 10) || 0
            return acc + price * item.count
        }, 0)
        const discountValue = parseInt(discount, 10) || 0
        setTotalPrice(sum - discountValue)
    }, [menuItems, discount])

    const handleDateChange = (date: Date) => {
        setSelectedDate(date)
    }

    const handleOpen = () => {
        setIsSlideUpModalOpen(true)
        setIsDateSelector(true)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDiscount(event.target.value)
    }

    const handleNext = () => {
        setIsCheckModalOpen(true)
    }

    const handleConfirm = async () => {
        try {
            const paid_at = format(selectedDate, "yyyy-MM-dd HH:mm")
            const prices = menuItems.map((item) => ({
                product_id: item.menu_id,
                price: parseInt(item.price, 10) || 0,
            }))

            const discountValue = parseInt(discount, 10) || 0

            const resposne = await RequestSign(request_id, {
                status: "APPROVED",
                payment: {
                    paid_at,
                    prices,
                    discount: discountValue,
                },
            })

            if (resposne.success) {
                navigate("/partner/request/approve")
            }
        } catch (error) {
            console.error("반려 처리 중 오류가 발생했습니다.", error)
            setIsFailModalOpen(true)
        }
    }

    return (
        <Layout>
            <div className="flex flex-col gap-8">
                <div className="text-black font-bold text-xl mt-16">
                    결제 일시를 선택하고 <br />
                    메뉴 별 가격 및 할인 금액을 입력해주세요
                </div>

                <InputField
                    label="결제 일시를 선택해주세요"
                    placeholder="yyyy-mm-dd hh:mm"
                    dropdown={false}
                    value={selectedDate ? format(selectedDate, "yyyy-MM-dd HH:mm") : ""}
                    onFocus={() => handleOpen()}
                />
                <SlideUpModal
                    isOpen={isSlideUpModalOpen}
                    height="auto"
                    onClose={() => setIsSlideUpModalOpen(false)}
                >
                    {isDateSelector ? (
                        <div className={`flex flex-col gap-8 ${isDateSelector ? "" : "hidden"}`}>
                            <DateSelector
                                initialDate={selectedDate}
                                onDateChange={handleDateChange}
                            />
                            <CommonButton
                                size="large"
                                isActive={true}
                                mode="fill"
                                color="blue"
                                detail={{
                                    label: selectedDate
                                        ? format(selectedDate, "yyyy년 MM월 dd일 (EEE) 선택", {
                                              locale: ko,
                                          })
                                        : "날짜 선택",
                                    position: "none",
                                }}
                                onClick={() => setIsDateSelector(false)}
                            />
                        </div>
                    ) : (
                        <div className={`flex flex-col gap-8 ${isDateSelector ? "hidden" : ""}`}>
                            <TimeSelector
                                selectedDate={selectedDate}
                                onTimeChange={handleDateChange}
                                onDateClick={() => setIsDateSelector(true)}
                            />

                            <CommonButton
                                size="large"
                                isActive={true}
                                mode="fill"
                                color="blue"
                                detail={{
                                    label: selectedDate
                                        ? format(selectedDate, "MM월 dd일 (EEE) aa h시 mm분 선택", {
                                              locale: ko,
                                          })
                                        : "시 선택",
                                    position: "none",
                                }}
                                onClick={() => setIsSlideUpModalOpen(false)}
                            />
                        </div>
                    )}
                </SlideUpModal>

                <div className="flex flex-col w-full gap-4">
                    <p className="text-black text-base">메뉴 별 가격을 입력해주세요</p>

                    {menuItems.map((menu, index) => (
                        <div key={index} className="flex flex-row gap-4 items-center">
                            <InputField
                                placeholder={menu.menu_name}
                                dropdown={false}
                                value={menu.price}
                                onChange={(e) => {
                                    const updatedItems = [...menuItems]
                                    updatedItems[index].price = e.target.value
                                    setMenuItems(updatedItems)
                                }}
                            />
                            <p className="text-black text-base whitespace-nowrap">
                                x {menu.count} EA
                            </p>
                        </div>
                    ))}
                </div>

                <InputField
                    label="할인 금액이 있다면 입력해주세요"
                    dropdown={false}
                    value={discount}
                    onInput={handleChange}
                />

                <div className="flex flex-row justify-between text-black text-base font-bold">
                    <span>총 결제금액</span>
                    <span>{totalPrice.toLocaleString()}원</span>
                </div>

                <div className="flex w-full mt-12">
                    <CommonButton
                        size="large"
                        isActive={true}
                        mode="fill"
                        color="blue"
                        detail={{ label: "계속하기", position: "none" }}
                        onClick={handleNext}
                    />
                </div>
            </div>

            <BasicModal
                mode="YesNo"
                isOpen={isCheckModalOpen}
                title={`총 결제금액이 ${totalPrice.toLocaleString()}원이 맞으신가요?`}
                onClose={() => setIsCheckModalOpen(false)}
                onConfirm={handleConfirm}
            />

            <BasicModal
                mode="OnlyYes"
                isOpen={isFailModalOpen}
                title={"요청 승인에 실패했어요"}
                onConfirm={() => setIsFailModalOpen(false)}
            />
        </Layout>
    )
}

export default PaymentInfo
