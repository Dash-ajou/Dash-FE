import apiClient from "./apiClient";
import { AxiosError } from "axios";

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
    const url = `/coupon/manage/${issueId}/list`;
    const response = await apiClient.get<{
      apiVersion: string;
      clientVersion: string;
      status: string;
      message: string | null;
      data: CouponByIssueIDResponse;
    }>(url, { params });

    if (response.data.status !== "SUCCESS") {
      throw new Error(response.data.message || "쿠폰 상세 정보를 불러오지 못했습니다.");
    }

    const responseData = response.data.data;
    if (!responseData || !Array.isArray(responseData.data)) {
      return [];
    }

    return responseData.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
