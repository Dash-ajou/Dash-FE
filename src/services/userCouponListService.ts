import apiClient from "./apiClient";
import { AxiosError } from "axios";

export type CouponItem = {
  couponId: number;
  couponName: string;
  partnerName: string;
  validUntil: string;
};

export const fetchCouponList = async (): Promise<{
  success: boolean;
  data: CouponItem[] | null;
}> => {
  try {
    console.log("Fetching coupon list...");
    const response = await apiClient.get("/general/coupons");
    console.log("Coupon list response:", response);

    if (response.status === 200 && Array.isArray(response.data.data.data)) {
      console.log("Coupon data:", response.data.data.data);
      return {
        success: true,
        data: response.data.data.data,
      };
    }
  } catch (error) {
    console.error("쿠폰 목록 조회 실패:", error);
    if (error instanceof AxiosError && error.response) {
      console.error("Error response:", error.response);
    }
  }

  return {
    success: false,
    data: null,
  };
};
