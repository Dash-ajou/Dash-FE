import apiClient from "./apiClient";

type CancelCouponResponse = {
    apiVersion: string;
    clientVersion: string;
    status: "SUCCESS" | "FAILED";
    message?: string;
    data: {
        result: boolean;
        id: number;
        used_at: string;
        canceled_at: string;
    };
};

export const fetchPartnerCouponPaymentCancel = async (
    paymentId: number
): Promise<CancelCouponResponse> => {
    const response = await apiClient.post<CancelCouponResponse>("/coupon/payment/cancel", {
        payment_id: paymentId,
    });

    if (response.data.status !== "SUCCESS") {
        throw new Error(response.data.message || "사용 철회에 실패했습니다.");
    }

    return response.data;
};
