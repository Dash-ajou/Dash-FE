// 쿠폰 발행내역 조회 API
//TO-DO: USE_MOCK = false로 사용하면 mock 데이터 제거 가능, 추후에 삭제

import apiClient from "./apiClient";

export type Vendor = {
    vendor_name: string;
    president_name: string;
    president_phone: string;
};

export type Partner = {
    business_name: string;
    partner_phone: string;
};

export type PublishedCoupon = {
    request_id: number;
    vendor: Vendor;
    partner: Partner;
    issue_id: number;
    status: "ENABLE" | "DISABLE";
    issue_at: string;
    issue_count: number;
    used_count: number;
};

export type PublishedCouponResponse = {
    page: number;
    size: number;
    count: number;
    data: PublishedCoupon[];
};

//TO-DO: mock 데이터 비사용 시 false로 전환 혹은 삭제
const USE_MOCK = true;

export const fetchPublishedCoupon = async (): Promise<PublishedCoupon[]> => {
    if (USE_MOCK) {
        console.log("[Mock] fetchPublishedCoupon");
        return [
            {
                request_id: 1001,
                vendor: {
                    vendor_name: "아주대학교 총학생회",
                    president_name: "홍길동",
                    president_phone: "010-1234-5678",
                },
                partner: {
                    business_name: "호시 타코야끼",
                    partner_phone: "010-1111-1111",
                },
                issue_id: 600001,
                status: "ENABLE",
                issue_at: "2024-12-01 10:00:00",
                issue_count: 100,
                used_count: 70,
            },
            {
                request_id: 1002,
                vendor: {
                    vendor_name: "사이버보안학과",
                    president_name: "김보안",
                    president_phone: "010-2222-2222",
                },
                partner: {
                    business_name: "맥도날드",
                    partner_phone: "010-2222-2222",
                },
                issue_id: 600002,
                status: "DISABLE",
                issue_at: "2024-12-02 12:00:00",
                issue_count: 150,
                used_count: 90,
            },
            {
                request_id: 1003,
                vendor: {
                    vendor_name: "자율전공학부",
                    president_name: "이자율",
                    president_phone: "010-3333-3333",
                },
                partner: {
                    business_name: "굿커피",
                    partner_phone: "010-3333-3333",
                },
                issue_id: 600003,
                status: "ENABLE",
                issue_at: "2024-12-03 14:00:00",
                issue_count: 50,
                used_count: 10,
            },
        ];
    }
    try {
        const response = await apiClient.get("/coupon/manage/list");
        const resData = response.data;

        if (resData.status !== "SUCCED") {
            throw new Error(
                resData.message || "쿠폰 정보를 불러오지 못했습니다."
            );
        }

        const result: PublishedCouponResponse = resData.data;
        return result.data;
    } catch (error) {
        console.error("Failed to fetch published coupons:", error);
        throw error;
    }
};
