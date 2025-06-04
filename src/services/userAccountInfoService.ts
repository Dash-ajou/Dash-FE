import apiClient from "./apiClient.ts";

export interface UserAccountInfoData {
  general_name: string;
  general_email: string;
  general_phone: string;
}

export interface ApiResponse<T> {
  status: string;
  message: string | null;
  data: T;
}

export const fetchUserAccountInfo = async () => {
  try {
    const response = await apiClient.get<ApiResponse<ApiResponse<UserAccountInfoData>>>(
        "/general/account"
    );

    const inner = response.data.data;

    if (response.status === 200 && inner.status === "SUCCESS") {
      return { success: true, data: inner.data };
    }

    return { success: false, data: null };
  } catch (error) {
    console.error("계정 정보 불러오기 실패", error);
    return { success: false, data: null };
  }
};
