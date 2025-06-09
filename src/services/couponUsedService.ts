import apiClient from './apiClient';

export type UsedCoupon = {
    coupon_id: number;
    coupon_name: string;
    partner_name: string;
    used_at: string;
    payment_code: string;
    payment_id: number;
};

export const fetchUsedCoupon = async (): Promise<UsedCoupon[]> => {
    const res = await apiClient.get<{
        status: string;
        message: string;
        data: {
            couponId: number;
            couponName: string;
            partnerName: string;
            usedAt: string;
            paymentCode: string;
            paymentId: number;
        }[];
    }>("/general/coupons/used");

    return res.data.data.map((item): UsedCoupon => ({
        coupon_id: item.couponId,
        coupon_name: item.couponName,
        partner_name: item.partnerName,
        used_at: item.usedAt,
        payment_code: item.paymentCode,
        payment_id: item.paymentId,
    }));
};
