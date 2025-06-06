import apiClient from "./apiClient";

export const cancelCouponRequest = async (issueId: number) => {
    const response = await apiClient.post(`/coupon/manage/${issueId}/cancel/request`);
    if (response.data.status !== "SUCCESS") {
        throw new Error("쿠폰 철회 요청 실패");
    }
    return response.data;
};
