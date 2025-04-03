export interface RecievedGift {
    coupon_id: number;
    coupon_name: string;
    partner_name: string;
    valid_until: string;
    coupon_status: "PENDING" | "ACCEPTED";
}

export const fetchRecivedGifts = async (): Promise<RecievedGift[]> => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/general/coupons/recieved`
        );
        const result = await response.json();
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
