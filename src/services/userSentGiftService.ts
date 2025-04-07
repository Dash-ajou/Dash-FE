import apiClient from "./apiClient";

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
        const response = await apiClient.get<SentGiftResponse>(
            "/general/coupons/sent"
        );
        const result = response.data;

        if (result.status !== "SUCCESS") {
            throw new Error(
                result.message || "보낸 선물함 데이터를 가져오지 못했습니다."
            );
        }

        return result.data;
    } catch (error) {
        console.error("보낸 선물함 API 오류:", error);
        return [];
    }
};
