import apiClient from "./apiClient"
import { AxiosError } from "axios"

export type RegisteredCouponItem = {
    couponId: number
    couponName: string
    partnerName: string
    validUntil: string
}

export const fetchRegisteredCouponList = async (): Promise<{
    success: boolean
    data: RegisteredCouponItem[] | null
}> => {
    try {
        const response = await apiClient.get("/general/coupons")

        if (response.status === 200 && Array.isArray(response.data.data)) {
            const coupons = response.data.data
            return {
                success: true,
                data: coupons,
            }
        }
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            // 에러 처리
        }
    }

    return {
        success: false,
        data: null,
    }
}
