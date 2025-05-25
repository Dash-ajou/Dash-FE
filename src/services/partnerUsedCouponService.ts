import apiClient from "./apiClient";

interface UsedCoupon {
  redeem_id: number;
  payment_code: string;
  used_at: string;
  status: "USED" | "CANCELED";
  menu_name: string;
}

interface UsedCouponResponse {
  status: string;
  message: string;
  data: {
    page: number;
    size: number;
    count: number;
    data: UsedCoupon[];
  };
}

export interface UsedCouonQueryParams {
  redeem_id?: number;
  user_name?: string;
  page?: number;
  size?: number;
}

export const fetchPartnerUsedCoupon = async (
    params: UsedCouonQueryParams = {}
): Promise<UsedCoupon[]> => {
  const response = await apiClient.get<UsedCouponResponse>(
      '/coupon/redeem/log/list',
      { params }
  );
  if (response.data.status !== "SUCCESS"){
    throw new Error("사용된 쿠폰 목록 조회 실패");
  }
  return response.data.data.data;
};
