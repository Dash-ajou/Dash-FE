import apiClient from './apiClient.ts'

export type UsedCoupon = {
    coupon_id: number;       // ← snake_case로 통일
    coupon_name: string;
    partner_name: string;
    used_at: string;
    payment_code: string;
};

export type UsedCouponResponse = {
    status: string;
    message: string;
    data: UsedCoupon[];
};

export const fetchUsedCoupon = async (): Promise<UsedCouponResponse> => {
    const res = await apiClient.get<UsedCouponResponse>(
        "/general/coupons/used"
    );
    return res.data;
};
