import apiClient from "./apiClient.ts"

export const RequestSign = async (
    request_id: string,
    data: {
        status: string
        payment?: {
            paid_at: string
            prices: {
                product_id: number
                price: number
            }[]
            discount: number
        }
    }
) => {
    try {
        const response = await apiClient.post(`/coupon/issue/${request_id}/sign`, data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}
