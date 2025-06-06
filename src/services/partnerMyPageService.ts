import apiClient from "./apiClient"

export interface MenuItem {
    title: string
    url: string
}

export interface PartnerMyPageData {
    ownerName: string
    menus: {
        section: string
        items: MenuItem[]
    }[]
}

interface OuterApiResponse<T> {
    apiVersion?: string
    clientVersion?: string
    status: string
    message: string | null
    data: T
}

interface RawPartnerMyPageData {
    ownerName: string
    menus: {
        section: string
        items: MenuItem[]
    }[]
}

export const fetchPartnerMyPage = async (): Promise<{
    success: boolean
    data: PartnerMyPageData | null
}> => {
    try {
        const response =
            await apiClient.get<OuterApiResponse<RawPartnerMyPageData>>("/partner/mypage")

        if (response.data.status === "SUCCESS" && response.data.status === "SUCCESS") {
            const rawData = response.data.data // 실제 필요한 데이터가 있는 위치

            const mappedData: PartnerMyPageData = {
                ownerName: rawData.ownerName,
                menus: rawData.menus, // 그대로 사용
            }

            return {
                success: true,
                data: mappedData,
            }
        }

        console.warn("파트너 마이페이지 응답 실패:", response.data.message || response.data.message)
        return {
            success: false,
            data: null,
        }
    } catch (error) {
        console.error("파트너 마이페이지 조회 실패:", error)
        return {
            success: false,
            data: null,
        }
    }
}
