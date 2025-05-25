import apiClient from "./apiClient";

export interface CouponIssue {
    request_id: number;
    vendor: {
        vendor_name: string;
        president_name: string;
        president_phone: string;
    };
    partner: {
        business_name: string;
        owner_phone: string;
    };
    issue_id: number;
    status: "ENABLE" | "DISABLE";
    issue_at: string;
    issue_count: number;
    used_count: number;
}

export interface CouponIssueListResponse {
    status: string;
    message: string | null;
    data: {
        page: number;
        size: number;
        count: number;
        data: CouponIssue[];
    };
}

export interface CouponIssueQueryParams {
    vendor_name?: string;
    president_name?: string;
    business_name?: string;
    include_completed?: boolean;
    page?: number;
    size?: number;
}

export const fetchApprovedCouponIssues = async (
    params: CouponIssueQueryParams = {}
): Promise<CouponIssueListResponse> => {
  const response = await apiClient.get<CouponIssueListResponse>(
      '/coupon/manage/list',
      { params }
  );
  return response.data;
};
