import apiClient from "./apiClient"

export type Vendor = {
    vendor_name: string
    president_name: string
    president_phone: string
}

export type Partner = {
    business_name: string
    partner_phone: string
}

export type PublishedCoupon = {
    request_id: number
    vendor: Vendor
    partner: Partner
    issue_id: number
    status: "ENABLE" | "DISABLE"
    issue_at: string
    issue_count: number
    used_count: number
}

export type PublishedCouponResponse = {
    page: number
    size: number
    count: number
    data: PublishedCoupon[]
}

type RequestParams = {
    vendor_name?: string
    president_name?: string
    business_name?: string
    include_completed?: boolean
    page?: number
    size?: number
}

export const fetchPublishedCoupon = async (
    params: RequestParams = {}
): Promise<PublishedCoupon[]> => {
    try {
        const response = await apiClient.get<{
            status: string
            message: string | null
            data: PublishedCouponResponse
        }>("/coupon/manage/list", { params })

        if (response.data.status !== "SUCCESS") {
            console.warn("쿠폰 정보 응답 실패:", response.data.message)
            return []
        }

        return response.data.data.data
    } catch (error) {
        console.error("쿠폰 정보 요청 실패:", error)
        return []
    }
}
