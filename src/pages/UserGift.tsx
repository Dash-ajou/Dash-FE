import { useEffect, useState } from "react";
import Block from "../components/module/Block";
import StatusButton from "../components/unit/user-gift/StatusButton";
import Tabs from "../components/unit/user-gift/Tabs";
import { fetchSentGifts, SentGift } from "../services/userSentGiftService";
import {
    fetchRecivedGifts,
    RecievedGift,
} from "../services/userRecivedGiftService";

const UserGift = () => {
    const [sentGifts, setSentGifts] = useState<SentGift[]>([]);
    const [recivedGifts, setRecivedGifts] = useState<RecievedGift[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGifts = async () => {
            setLoading(true);
            const [sent, recieved] = await Promise.all([
                fetchSentGifts(),
                fetchRecivedGifts(),
            ]);
            setSentGifts(sent);
            setRecivedGifts(recieved);
            setLoading(false);
        };

        loadGifts();
    }, []);

    return (
        <div className="relative min-h-screen pb-[80px]">
            <Tabs tabs={["받은 선물함", "보낸 선물함"]}>
                {/* 받은 선물함 */}
                <div className="relative">
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : recivedGifts.length === 0 ? (
                        <p>받은 선물이 없습니다.</p>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {recivedGifts.map((gift) => (
                                <Block
                                    key={gift.coupon_id}
                                    type="button"
                                    title={gift.coupon_name}
                                    subtitle={gift.partner_name}
                                    info={`유효기간 ~${gift.valid_until}`}
                                    action={
                                        gift.coupon_status === "PENDING" ? (
                                            <StatusButton
                                                label="수락"
                                                available
                                            />
                                        ) : (
                                            <StatusButton
                                                label="완료"
                                                available={false}
                                            />
                                        )
                                    }
                                    statusType={
                                        gift.coupon_status === "PENDING"
                                            ? "pending"
                                            : "approved"
                                    }
                                />
                            ))}

                            <div className="text-center">
                                <p className="text-black text-sm font-semibold opacity-30">
                                    선물은 7일 동안 수락 가능해요
                                </p>
                            </div>
                            {/* 다른 받은 선물들도 여기에 렌더링되겠지 */}
                        </div>
                    )}
                </div>
                {/* 보낸 선물함 */}
                <div>
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : sentGifts.length === 0 ? (
                        <p>보낸 선물이 없습니다.</p>
                    ) : (
                        sentGifts.map((gift) => (
                            <Block
                                key={gift.coupon_id}
                                type="button"
                                title={gift.coupon_name}
                                subtitle={gift.partner_name}
                                info={`유효기간 ~${gift.valid_until}`}
                                action={
                                    <StatusButton
                                        label={
                                            gift.coupon_status === "CANCELLED"
                                                ? "취소됨"
                                                : "완료"
                                        }
                                        available={
                                            gift.coupon_status !== "CANCELLED"
                                        }
                                    />
                                }
                                statusType={
                                    gift.coupon_status === "CANCELLED"
                                        ? "rejected"
                                        : "approved"
                                }
                            />
                        ))
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default UserGift;
