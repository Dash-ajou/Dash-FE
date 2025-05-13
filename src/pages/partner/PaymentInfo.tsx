import React, {useState} from "react";
import Layout from "../../components/layout/Layout.tsx";
import InputField from "../../components/common/InputField.tsx";
import SlideUpModal from "../../components/common/modal/SlideUpModal.tsx";
import {format} from "date-fns";
import DateSelector from "../../components/unit/partner-payment-detail/DateSelector.tsx";
import CommonButton from "../../components/common/button/CommonButton.tsx";
import {ko} from "date-fns/locale";
import TimeSelector from "../../components/unit/partner-payment-detail/TimeSelector.tsx";

// id랑 menu들의 개수, 메뉴명, 메뉴별 주문 개수

const PaymentInfo: React.FC = () => {
    const [isSlideUpModalOpen, setIsSlideUpModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isDateSelector, setIsDateSelector] = useState(true)

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    const handleOpen = () => {
        setIsSlideUpModalOpen(true)
        setIsDateSelector(true)
    }

    return (
        <Layout>
            <div className="flex flex-col gap-6">
                <div className="text-black font-bold text-xl mt-16">
                    결제 일시를 선택하고 <br/>메뉴 별 가격 및 할인 금액을 입력해주세요
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
                    {isDateSelector ?
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
                                    label: selectedDate ? format(selectedDate, "yyyy년 MM월 dd일 (EEE) 선택", {locale: ko}) : "날짜 선택",
                                    position: "none"
                                }}
                                onClick={() => setIsDateSelector(false)}
                            />
                        </div>
                        :
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
                                    label: selectedDate ? format(selectedDate, "MM월 dd일 (EEE) aa h시 mm분 선택", {locale: ko}) : "시 선택",
                                    position: "none"
                                }}
                                onClick={() => setIsSlideUpModalOpen(false)}
                            />
                        </div>
                    }
                </SlideUpModal>

                <div className="flex flex-row gap-4">
                    <InputField
                        label="메뉴 별 가격을 입력해주세요"
                        placeholder="메뉴명1" //TODO - state로 받아오기
                        dropdown={false}
                        value={menu.price}
                    />
                    <span>x {menu.count} EA</span>
                </div>
                {/*메뉴 개수만큼 생성*/}

                <InputField
                    label="할인 금액이 있다면 입력해주세요"
                    dropdown={false}
                    value={discount}
                />

                <div className="flex flex-row justify-between">
                    <span>총 결제금액</span>
                    <span>{totalPrice}</span>
                </div>
            </div>
        </Layout>
    )
}

export default PaymentInfo;
