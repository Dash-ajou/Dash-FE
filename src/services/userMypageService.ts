// TO-DO: 이름은 전역변수에서 받아올 것
import apiClient from "./apiClient";

export interface CouponStatus {
  usableCoupons: number;
  usedCoupons: number;
}

export interface MenuItem {
  title: string;
  url: string;
}

export interface Menus {
  myInfo: MenuItem[];
  customerCenter: MenuItem[];
}

export interface UserMyPageData {
  generalName: string;
  couponStatus: CouponStatus;
  menus: Menus;
}

export interface ApiResponse<T> {
  apiVersion?: string;
  clientVersion?: string;
  status: string;
  message: string | null;
  data: T;
}

export const fetchUserMyPage = async () => {
  try {
    const response =
      await apiClient.get<ApiResponse<ApiResponse<UserMyPageData>>>("/general/mypage");

    if (response.data.status === "SUCCESS" && response.data.data.status === "SUCCESS") {
      return {
        success: true,
        data: response.data.data.data,
      };
    }

    console.warn("마이페이지 응답 실패:", response.data.message || response.data.data.message);
    return {
      success: false,
      data: null,
    };
  } catch (error) {
    console.error("마이페이지 조회 실패:", error);
    return {
      success: false,
      data: null,
    };
  }
};
