import apiClient from "./apiClient.ts"

export const couponRequest = async (data: {
    vendor: {
        vendor_name: string
        president_name: string
        president_phone: string
    }
    partner: {
        business_name: string
        owner_phone: string
    }
    products: {
        product_id?: number
        product_name?: string
        count: number
        is_new?: boolean
    }[]
}) => {
    try {
        const response = await apiClient.post("/coupon/issue/request", data)

        if (response.status === 200) {
            return { success: true, request_id: response.data.data.request_id }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const couponRequestDetail = async (request_id: number) => {
    try {
        const response = await apiClient.get(`/coupon/issue/${request_id}`)

        if (response.status === 200) {
            return { success: true, data: response.data.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const couponRequestList = async () => {
    try {
        const response = await apiClient.get("/coupon/issue/list")

        if (response.status === 200) {
            return { success: true, data: response.data.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}
