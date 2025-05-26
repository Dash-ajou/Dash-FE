import apiClient from "./apiClient";
import { PartnerInfo, ProductInfo } from "../types/CouponRedeemTypes.ts";

export type CouponStatus =
  | "REGISTERABLE"
  | "USABLE"
  | "USED"
  | "EXPIRED"
  | "DISABLED"
  | "CANCELLED";

export type CouponByIssueID = {
  coupon_id: number;
  issue_id: number;
  product_id: number;
  status: string;
  expired_at: string;
  register_code: string;
};

export type CouponByIssueIDResponse = {
  page: number;
  size: number;
  count: number;
  data: CouponByIssueID[];
};

export type CouponByIssueIDQuery = {
  user_name?: string;
  coupon_status?: CouponStatus;
  page?: number;
  size?: number;
};

export const fetchCouponByIssueID = async (
  issueId: number,
  params: CouponByIssueIDQuery = {},
): Promise<CouponByIssueID[]> => {
  try {
    console.log("Making API request to:", `/coupon/manage/${issueId}/list`);
    const response = await apiClient.get<{
      apiVersion: string;
      clientVersion: string;
      status: string;
      message: string | null;
      data: CouponByIssueIDResponse;
    }>(`/coupon/manage/${issueId}/list`, { params });

    console.log("API Response:", response.data);
    console.log("API Response data structure:", {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });

    if (response.data.status !== "SUCCESS") {
      throw new Error(response.data.message || "쿠폰 상세 정보를 불러오지 못했습니다.");
    }

    // API 응답 구조에 맞게 데이터 접근
    const responseData = response.data.data;
    console.log("Response data:", responseData);

    if (!responseData || !Array.isArray(responseData.data)) {
      console.error("Invalid response structure:", responseData);
      return [];
    }

    const couponData = responseData.data;
    console.log("Extracted coupon data:", couponData);

    return couponData;
  } catch (error) {
    console.error("Failed to fetch coupon by issue ID:", error);
    return Promise.reject(error);
  }
};
