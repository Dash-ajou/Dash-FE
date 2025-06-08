import apiClient from "./apiClient"
import { ProductInfo, VendorInfo } from "../types/CouponRedeemTypes.ts"

export type UseCouponResponse = {
    result: boolean
    id: number
    used_at: string
    vendor: VendorInfo
    product: ProductInfo
}

export type CancelCouponResponse = {
    result: boolean
    id: number
    used_at: string
    canceled_at: string
}

export const fetchCouponUse = async (
    payment_code: string
): Promise<UseCouponResponse> => {
    const response = await apiClient.post(
        "/coupon/payment/use",
        { code: payment_code },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    if (response.data.status !== "SUCCESS") {
        throw new Error("쿠폰 사용 처리 실패");
    }
    return response.data.data;
};

export const fetchCouponCancel = async (
    payment_code: string,
    redeem_id: number
): Promise<CancelCouponResponse> => {
    const response = await apiClient.post("/coupon/payment/cancel", {
        payment_code,
        redeem_id,
    });

    if (response.data.status !== "SUCCESS") {
        throw new Error("쿠폰 사용 취소 실패");
    }

    return response.data.data;
};


