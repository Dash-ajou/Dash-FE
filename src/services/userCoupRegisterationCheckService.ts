//TO-DO: mock데이터 삭제 후 실제 API 연결
// import apiClient from "./apiClient";

type PartnerInfo = {
    id: number;
    business_name: string;
    owner_name: string;
    owner_phone: string;
    address: string;
};

type RegisterInfo = {
    name: string;
    phone: string;
};

export type CouponRegistStatus = {
    id: number;
    partner: PartnerInfo;
    register: RegisterInfo | null;
    status: "USABLE" | "REGISTERABLE";
    registered_at?: string;
    expired_at: string;
};

const MOCK_DATA: CouponRegistStatus[] = [
    {
        id: 400011,
        partner: {
            id: 200021,
            business_name: "호시 타코야끼",
            owner_name: "나사장",
            owner_phone: "010-1234-1234",
            address: "경기도 수원시 영통구 월드컵로 206",
        },
        register: {
            name: "나유저",
            phone: "010-1234-1234",
        },
        status: "USABLE",
        registered_at: "2025-1-2 11:24:59",
        expired_at: "2025-12-25 23:59:59",
    },
    {
        id: 400012,
        partner: {
            id: 200021,
            business_name: "호시 타코야끼",
            owner_name: "나사장",
            owner_phone: "010-1234-1234",
            address: "경기도 수원시 영통구 월드컵로 206",
        },
        register: null,
        status: "REGISTERABLE",
        expired_at: "2025-12-25 23:59:59",
    },
];

/**
 * 쿠폰 등록 상태 조회 API 호출
 * @param issueId 발행 이슈 ID
 * @param couponId 사용자 쿠폰 ID
 * @returns CouponRegistStatus 객체
 */

/**
 * TO-DO: 실제 API 연결 시 아래 mock 반환부를 제거하고 API 호출 주석을 해제할 것
 */

export const fetchCouponRegistStatus = async (
    // issueId: number,
    couponId: number
): Promise<CouponRegistStatus> => {
    // try {
    //     const response = await apiClient.get(
    //         `/coupon/manage/${issueId}/${couponId}/register`
    //     );
    //     const resData = response.data;

    //     if (resData.status !== "SUCCEED") {
    //         throw new Error(
    //             resData.message || "쿠폰 등록 상태 정보를 불러오지 못했습니다."
    //         );
    //     }
    //     return resData.data as CouponRegistStatus;
    // } catch (error) {
    //     console.error("Failed to fetch coupon registration status:", error);
    //     throw error;
    // }
    const result = MOCK_DATA.find((item) => item.id === couponId);

    if (!result) {
        throw new Error(`Mock data for coupon ID ${couponId} not found`);
    }

    return result;
};
