import apiClient from './apiClient.ts'

export type Partner = {
    business_name: string;
    owner_phone: string;
}

export type Product = {
    product_id: number;
    partner_id: number;
    product_name: string;
    price: number;
};

export type RegisterUser = {
    name: string;
    email: string | null;
    phone: string;
};

export type CouponDetailResponse = {
    status: 'SUCCEED';
    message: string | null;
    data: {
        coupon_id: number;
        issue_id: number;
        status: 'REGISTERABLE' | 'USABLE' | 'USED' | 'EXPIRED' | 'DISABLED' | 'CANCELED';
        product: Product;
        partner: Partner;
        register_code: string;
        register: RegisterUser;
        registered_at: string;
        expired_at: string;
    };
};

export const fetchCouponDetailService = async (
    couponId: string | number
): Promise<CouponDetailResponse> => {
    const res = await apiClient.get<CouponDetailResponse>(
        `/coupon/manage/coupon/${String(couponId)}`
    );
    return res.data;
};

