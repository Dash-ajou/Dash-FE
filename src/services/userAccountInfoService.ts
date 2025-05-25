import apiClient from "./apiClient.ts";
import { store } from "../store/store";

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
    const response = await apiClient.get<ApiResponse<Omit<UserAccountInfoData, "general_name">>>(
        "/general/account"
    );

    if (response.status === 200 && response.data?.data) {
      const globalName = store.getState().user.name;

      return {
        success: true,
        data: {
          general_name: globalName,
          ...response.data.data,
        },
      };
    }

    return { success: false, data: null };
  } catch (error) {
    console.error("계정 정보 불러오기 실패", error);
    return { success: false, data: null };
  }
};