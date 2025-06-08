import apiClient from "./apiClient.ts"

export const CouponRegister = async (data: { coupon_number: string }) => {
    try {
        const response = await apiClient.post("/general/coupons/register", data)

        if (response.status === 201) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const CouponPaymentCode = async (coupon_id: number) => {
    try {
        const response = await apiClient.post(`/general/coupons/${coupon_id}/generate-qrcode`)

        if (response.status === 201) {
            return { success: true, data: response.data.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const DeleteCoupon = async (coupon_id: number) => {
    try {
        const response = await apiClient.delete(`/general/coupons/${coupon_id}`)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}
