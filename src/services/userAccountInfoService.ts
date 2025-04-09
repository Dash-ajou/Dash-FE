import apiClient from "./apiClient";

export interface UserAccountInfoData {
    general_name: string;
    general_email: string;
    general_phone: string;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export const fetchUserAccountInfo = async () => {
    try {
        const response = await apiClient.get<ApiResponse<UserAccountInfoData>>(
            "/general/account"
        );
        console.log("user account info 응답:", response.data);

        // TO-DO; if 조건에 response.status === 200 조건 필요
        if (response.status === 200 && response.data?.data) {
            return { success: true, data: response.data.data };
        }
    } catch (error) {
        console.error("계정 정보 불러오기 실패", error);
    }
    return { success: false, data: null };
};
