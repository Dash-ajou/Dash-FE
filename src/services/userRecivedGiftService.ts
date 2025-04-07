import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export interface ReceivedGift {
    coupon_id: number;
    coupon_name: string;
    partner_name: string;
    valid_until: string;
    coupon_status: "PENDING" | "ACCEPTED";
}

export const fetchReceivedGifts = async (): Promise<ReceivedGift[]> => {
    try {
        const response: AxiosResponse = await apiClient.get(
            "/general/coupons/recieved"
        );
        const result = response.data;
        console.log("응답 내용:", result); //테스트용

        if (result.status === "SUCCESS") {
            return result.data;
        } else {
            console.error("API 응답 실패:", result.message);
            return [];
        }
    } catch (error) {
        console.error("받은 쿠폰 목록 가져오기 실패:", error);
        return [];
    }
};
