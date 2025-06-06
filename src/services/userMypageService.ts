import apiClient from "./apiClient"

export interface CouponStatus {
    usableCoupons: number
    usedCoupons: number
}

export interface MenuItem {
    title: string
    url: string
}

export interface Menus {
    myInfo: MenuItem[]
    customerCenter: MenuItem[]
}

export interface UserMyPageData {
    generalName: string
    couponStatus: CouponStatus
    menus: Menus
}

interface RawCouponStatus {
    usable_coupons: number
    used_coupons: number
}

interface RawUserMyPageData {
    generalName: string
    couponStatus: RawCouponStatus
    menus: Menus
}

export interface ApiResponse<T> {
    apiVersion?: string
    clientVersion?: string
    status: string
    message: string | null
    data: T
}

export const fetchUserMyPage = async () => {
    try {
        const response = await apiClient.get<ApiResponse<RawUserMyPageData>>("/general/mypage")

        if (response.data.status === "SUCCESS" && response.data.status === "SUCCESS") {
            const rawData = response.data.data

            const mappedData: UserMyPageData = {
                generalName: rawData.generalName,
                couponStatus: {
                    usableCoupons: rawData.couponStatus.usable_coupons,
                    usedCoupons: rawData.couponStatus.used_coupons,
                },
                menus: rawData.menus,
            }
            return {
                success: true,
                data: mappedData,
            }
        }

        console.warn("마이페이지 응답 실패:", response.data.message || response.data.message)
        return {
            success: false,
            data: null,
        }
    } catch (error) {
        console.error("마이페이지 조회 실패:", error)
        return {
            success: false,
            data: null,
        }
    }
}
