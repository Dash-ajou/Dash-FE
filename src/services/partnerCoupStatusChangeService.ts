import apiClient from "./apiClient";
import { ProductInfo, VendorInfo } from '../types/CouponRedeemTypes.ts'

export type UseCouponResponse = {
    result: boolean;
    id: number;
    used_at: string;
    vendor: VendorInfo;
    product: ProductInfo;
};

export type CancelCouponResponse = {
    result: boolean;
    id: number;
    used_at: string;
    canceled_at: string;
};

export const fetchCouponUse = async (
    payment_code: string
    // scan_img: File // 현재 이미지 전송 제외
): Promise<UseCouponResponse> => {
    const formData = new FormData();
    formData.append("payment_code", payment_code);
    // formData.append("scan_img", scan_img);

    const response = await apiClient.post("/coupon/redeem/use", formData);

    if (response.data.status !== "SUCCEED") {
        throw new Error("쿠폰 사용 처리 실패");
    }
    return response.data.data;
};

export const fetchCouponCancel = async (
    payment_code: string,
    redeem_id: number
): Promise<CancelCouponResponse> => {
    const response = await apiClient.post("/coupon/redeem/cancel", {
        payment_code,
        redeem_id,
    });
    if (response.data.status !== "SUCCEED") {
        throw new Error("쿠폰 사용 취소 실패");
    }
    return response.data.data;
};
