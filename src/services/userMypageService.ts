import apiClient from "./apiClient"

export interface CouponStatus {
    usableCoupons: number
    usedCoupons: number
}

interface RawCouponStatus {
    usable_count: number
    used_count: number
}

export interface ApiResponse<T> {
    apiVersion?: string
    clientVersion?: string
    status: string
    message: string | null
    data: T
}

export const fetchUserCouponCount = async () => {
    try {
        const response =
            await apiClient.get<ApiResponse<RawCouponStatus>>("/general/coupons/status")

        if (response.data.status === "SUCCESS") {
            const rawData = response.data.data

            const couponStatus: CouponStatus = {
                usableCoupons: rawData.usable_count,
                usedCoupons: rawData.used_count,
            }

            return {
                success: true,
                data: couponStatus,
            }
        }

        return {
            success: false,
            data: null,
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            success: false,
            data: null,
        }
    }
}
