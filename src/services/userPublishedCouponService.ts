//TO-DO: 주석 제거, 하드코딩 응답 제거
// import apiClient from "./apiClient";

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

export const fetchPublishedCoupon = async (): Promise<PublishedCoupon[]> => {
    // try {
    //     const response = await apiClient.get("/coupon/manage/list");
    //     const resData = response.data;

    //     if (resData.status !== "SUCCED") {
    //         throw new Error(
    //             resData.message || "쿠폰 정보를 불러오지 못했습니다."
    //         );
    //     }

    //     const result: PublishedCouponResponse = resData.data;
    //     return result.data;
    // } catch (error) {
    //     console.error("Failed to fetch published coupons:", error);
    //     throw error;
    // }
    return [
        {
            request_id: 28501424,
            vendor: {
                vendor_name: "아주대학교 총학생회",
                president_name: "나발행",
                president_phone: "010-1234-5678",
            },
            partner: {
                business_name: "호시 타코야끼",
                partner_phone: "010-1234-1234",
            },
            issue_id: 600021,
            status: "ENABLE",
            issue_at: "2024-12-26 12:35:12",
            issue_count: 200,
            used_count: 180,
        },
        {
            request_id: 28501426,
            vendor: {
                vendor_name: "아주대학교 총학생회",
                president_name: "나발행",
                president_phone: "010-1234-5678",
            },
            partner: {
                business_name: "굿커피",
                partner_phone: "010-1234-1234",
            },
            issue_id: 600028,
            status: "DISABLE",
            issue_at: "2024-12-26 12:35:12",
            issue_count: 500,
            used_count: 10,
        },
    ];
};
