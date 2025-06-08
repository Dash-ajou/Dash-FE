import apiClient from "./apiClient.ts"

export const ExportCSV = async (issue_id: string) => {
    try {
        const response = await apiClient.get(`/coupon/manage/${issue_id}/export/list`)

        if (response.data.status === "SUCCESS") {
            return { success: true, data: response.data.data.download_url }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, data: error }
    }
}

export const ExportImage = async (issue_id: string) => {
    try {
        const response = await apiClient.get(`/coupon/manage/${issue_id}/export/image`)

        if (response.data.status === "SUCCESS") {
            return { success: true, data: response.data.data.download_url }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, data: error }
    }
}
