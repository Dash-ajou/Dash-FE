import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

export interface ReceivedGift {
  coupon_id: number;
  coupon_name: string;
  partner_name: string;
  valid_until: string;
  coupon_status: "PENDING" | "ACCEPTED";
}

export interface ApiResponse<T> {
  apiVersion?: string;
  clientVersion?: string;
  status: string;
  message: string | null;
  data: T;
}

export const fetchReceivedGifts = async (): Promise<ReceivedGift[]> => {
  try {
    const response: AxiosResponse<ApiResponse<ApiResponse<ReceivedGift[]>>> = await apiClient.get(
      "/general/coupons/recieved",
    );
    const outer = response.data;
    const inner = outer.data;

    if (outer.status === "SUCCESS" && inner.status === "SUCCESS") {
      return inner.data;
    } else {
      console.error("API 응답 실패:", outer.message || inner.message);
      return [];
    }
  } catch (error) {
    console.error("받은 쿠폰 목록 가져오기 실패:", error);
    return [];
  }
};
