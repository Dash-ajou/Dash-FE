import apiClient from "./apiClient";

export interface SentGift {
  coupon_id: number;
  coupon_name: string;
  partner_name: string;
  valid_until: string;
  coupon_status: "CANCELLED" | "COMPLETED" | string;
}

export interface ApiResponse<T> {
  apiVersion?: string;
  clientVersion?: string;
  status: string;
  message: string | null;
  data: T;
}

export const fetchSentGifts = async (): Promise<SentGift[]> => {
  try {
    const response =
      await apiClient.get<ApiResponse<ApiResponse<SentGift[]>>>("/general/coupons/sent");

    const outer = response.data;
    const inner = outer.data;

    if (outer.status === "SUCCESS" && inner.status === "SUCCESS") {
      return inner.data;
    }
    console.error("보낸 쿠폰 목록 조회 실패:", outer.message || inner.message);
    return [];
  } catch (error) {
    console.error("보낸 선물함 API 오류:", error);
    return [];
  }
};
