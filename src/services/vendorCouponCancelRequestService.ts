import apiClient from "./apiClient";

export const fetchcancelCouponRequest = async (issueId: number) => {
    const response = await apiClient.post(`/coupon/manage/${issueId}/cancel/request`);
    if (response.data.status !== "SUCCESS") {
        throw new Error("쿠폰 철회 요청 실패");
    }
    return response.data;
};

export const fetchCancelCoupon = async (
    issueId: number,
    verifyCode: string
) => {
    const body = new URLSearchParams();
    body.append("expire_status", "CANCEL");
    body.append("user_verify_code", verifyCode); // 선택이지만 현재는 포함한다고 가정

    const response = await apiClient.post(
        `/coupon/manage/${issueId}/cancel`,
        body,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );
    return response.data;
};
