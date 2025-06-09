import apiClient from './apiClient.ts'

export type Partner = {
    id?: number;
    business_name: string;
    owner_name: string;
    owner_phone: string;
    owner_email: string | null;
    address: string;
};

export type Product = {
    product_id: number;
    partner_id: number;
    product_name: string;
    price: number;
};

export type Vendor = {
    vendor_name: string;
    president_name: string;
    president_phone: string;
};

export type RegisterUser = {
    name: string;
    email: string | null;
    phone: string;
};

export type CouponDetailResponse = {
    apiVersion: string;
    clientVersion: string;
    status: 'SUCCESS' | 'FAILED';
    message: string | null;
    data: {
        coupon_id: number;
        issue_id: number;
        status: 'REGISTERABLE' | 'USABLE' | 'USED' | 'EXPIRED' | 'DISABLED' | 'CANCELED';
        product: Product;
        partner: Partner;
        vendor: Vendor;
        register_code: string;
        register: RegisterUser;
        registered_at: string;
        expired_at: string;
        paid_qrimage?: string | null;
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

