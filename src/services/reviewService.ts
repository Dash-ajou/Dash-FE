import apiClient from "./apiClient.ts"

export const rateReview = async (data: { rate: number }) => {
    try {
        const response = await apiClient.post("/rate", data)

        if (response.data.status === "SUCCESS") {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}
