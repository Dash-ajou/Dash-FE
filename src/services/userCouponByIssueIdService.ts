import apiClient from "./apiClient";
import { PartnerInfo, ProductInfo } from '../types/CouponRedeemTypes.ts'

export type CouponStatus =
    | "REGISTERABLE"
    | "USABLE"
    | "USED"
    | "EXPIRED"
    | "DISABLED"
    | "CANCELLED";

export type CouponByIssueID = {
    id: number;
    issue_id: number;
    status: CouponStatus;
    expired_at: string;
    product: ProductInfo;
    partner: PartnerInfo;
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
    params: CouponByIssueIDQuery = {}
): Promise<CouponByIssueIDResponse> => {
    try {
        const response = await apiClient.get<{
            status: string;
            message: string;
            data: CouponByIssueIDResponse;
        }>(`/coupon/manage/${issueId}/list`, { params });

        if (response.data.status !== "SUCCEED") {
            throw new Error(
                response.data.message || "쿠폰 상세 정보를 불러오지 못했습니다."
            );
        }
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch coupon by issue ID:", error);
        return Promise.reject(error);
    }
};
