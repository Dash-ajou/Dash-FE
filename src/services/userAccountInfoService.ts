//TO-DO: mock데이터 제거
//import apiClient from "./apiClient";

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
        // 실제 API 호출 주석 처리
        // const response = await apiClient.get<ApiResponse<UserAccountInfoData>>("/general/account");
        // console.log("user account info 응답:", response.data);
        // if (response.status === 200 && response.data?.data) {
        //     return { success: true, data: response.data.data };
        // }

        //TO-DO: 이름은 전역변수에서
        const mockResponse: UserAccountInfoData = {
            general_name: "김김김",
            general_email: "등록된 이메일이 없습니다.",
            general_phone: "01012345678",
        };

        return { success: true, data: mockResponse };
    } catch (error) {
        console.error("계정 정보 불러오기 실패", error);
    }

    return { success: false, data: null };
};
