import apiClient from "./apiClient";

type PartnerInfo = {
    id: number;
    business_name: string;
    owner_name: string;
    owner_phone: string;
    address: string;
};

export type CouponRegisterStatus = {
    id: number;
    partner: PartnerInfo;
    register: {
        name: string;
        phone: string;
    }  | null;
    status: "USABLE" | "REGISTERABLE";
    registered_at?: string;
    expired_at: string;
};

type ApiResponse = {
    status: string;
    message: string;
    data: CouponRegisterStatus;
};

export const fetchCouponRegistStatus = async (
    issueId: number,
    couponId: number
): Promise<CouponRegisterStatus> => {
    const response = await apiClient.get<ApiResponse>(
        `/coupon/manage/${issueId}/${couponId}`
    );
    if(response.data.status !== "SUCCEED") {
        throw new Error(
            response.data.message || "쿠폰 등록 상태 정보를 불러오지 못했습니다."
        );
    }
    return response.data.data;
};
