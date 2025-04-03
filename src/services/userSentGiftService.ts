export interface SentGift {
    coupon_id: number;
    coupon_name: string;
    partner_name: string;
    valid_until: string;
    coupon_status: "CANCELLED" | "COMPLETED" | string;
}

export interface SentGiftResponse {
    status: string;
    message: string;
    data: SentGift[];
}

export const fetchSentGifts = async (): Promise<SentGift[]> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/general/coupons/sent`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }

        const result: SentGiftResponse = await response.json();
        // console.log("응답 내용:", result); //테스트용

        if (result.status !== "SUCCESS") {
            throw new Error(
                result.message || "보낸 선물함 데이터를 가져오지 못했습니다."
            );
        }

        return result.data;
    } catch (error) {
        console.error("보낸 선물함 api 오류:", error);
        return [];
    }
};
