import apiClient from "./apiClient";

export type CouponItem = {
    coupon_id: number;
    coupon_name: string;
    partner_name: string;
    valid_until: string;
};

export const fetchCouponList = async (): Promise<{
    success: boolean;
    data: CouponItem[] | null;
}> => {
    try {
        const response = await apiClient.get("/general/coupons");

        if (response.status === 200 && Array.isArray(response.data.data)) {
            return {
                success: true,
                data: response.data.data,
            };
        }
    } catch (error) {
        console.error("쿠폰 목록 조회 실패:", error);
    }

    return {
        success: false,
        data: null,
    };
};
