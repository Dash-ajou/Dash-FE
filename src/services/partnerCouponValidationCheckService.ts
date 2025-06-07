import apiClient from "./apiClient"
import { PartnerInfo, ProductInfo, VendorInfo } from "../types/CouponRedeemTypes.ts"
// TO-DO: 소속단체명 string으로 필요
export type PartnerCouponValidationResponse = {
    type: "REGISTER_CODE" | "PAYMENT_CODE"
    status: "REGISTERABLE" | "USABLE" | "USED"
    vendor: VendorInfo
    partner: PartnerInfo
    product: ProductInfo
    redeem?: {
        redeem_id: number
        payment_code: string
        used_at: string
    }
}

export const fetchPartnerCouponValidation = async (coupon_number: string) => {
    const response = await apiClient.post(
        "/coupon/payment/validate",
        { code: coupon_number },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    if (response.data.status !== "SUCCESS") {
        throw new Error("쿠폰 유효성 검증 실패")
    }
    return response.data.data
}
