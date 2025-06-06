import apiClient from "./apiClient.ts"

export interface UserAccountInfoData {
    generalName: string
    generalEmail: string
    generalPhone: string
}

export interface ApiResponse<T> {
    status: string
    message: string | null
    data: T
}

export const fetchUserAccountInfo = async () => {
    try {
        const response = await apiClient.get<ApiResponse<UserAccountInfoData>>("/general/account")

        const inner = response.data

        if (response.status === 200 && inner.status === "SUCCESS") {
            return { success: true, data: inner.data }
        }

        return { success: false }
    } catch (error) {
        console.error("계정 정보 불러오기 실패", error)
        return { success: false }
    }
}
