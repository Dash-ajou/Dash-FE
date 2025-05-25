import apiClient from "./apiClient";

export type DetailedVendorStat = {
    vendor_id: number;
    vendor_name: string;
    vendor_issued_count: number;
    vendor_used_count: number;
    vendor_usage_rate: number;
};

export type MenuUsageStat = {
    menu_name: string;
    menu_issued_count: number;
    menu_used_count: number;
    menu_usage_rate: number;
};

type ApiResponse = {
    status: string;
    message: string;
    data: {
        usage_rate: number;
        total_issued: number;
        total_used: number;
        total_remainder: number;
        vendors: DetailedVendorStat[];
        menu_usage: MenuUsageStat[];
    };
};

export const fetchPartnerStats = async (): Promise<ApiResponse['data']> => {
    const response = await apiClient.get<ApiResponse>("/partner/stats/detailed");

    if (response.data.status !== "SUCCESS") {
        throw new Error("파트너 통계 데이터 로딩 실패");
    }

    return response.data.data;
};
