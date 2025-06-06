import apiClient from './apiClient';

export type CouponStatus = 'ENABLE' | 'DISABLE';

interface UpdateCouponStatusParams {
    issueId: string;
    status: CouponStatus;
}

interface UpdateCouponStatusResponse {
    status: string;
    message: string;
    data: {
        issue_id: number;
        issue_count: number;
        deactive_count?: number;
        active_count?: number;
    };
}

export const updateCouponStatus = async ({
    issueId,
    status,
}: UpdateCouponStatusParams): Promise<UpdateCouponStatusResponse> => {
    const response = await apiClient.patch<UpdateCouponStatusResponse>(
        `/coupon/manage/${issueId}/status`,
        { status }
    );
    return response.data;
};