// 발행 ID별 쿠폰목록 조회
//TO-DO: USE_MOCK = false로 사용하면 mock 데이터 제거 가능, 추후에 삭제
import apiClient from "./apiClient";

export type Product = {
    product_id: number;
    product_name: string;
};

export type PartnerDetail = {
    id: number;
    business_name: string;
    owner_name: string;
    owner_phone: string;
    address: string;
};

export type CouponByIssueID = {
    id: number;
    product: Product;
    partner: PartnerDetail;
    status:
        | "REGISTERABLE"
        | "USABLE"
        | "USED"
        | "EXPIRED"
        | "DISABLED"
        | "CANCELLED";
    expired_at: string;
};

export type CouponByIssueIDResponse = {
    page: number;
    size: number;
    count: number;
    data: CouponByIssueID[];
};

const USE_MOCK = true;

export const fetchCouponByIssueID = async (
    issueId: number
): Promise<CouponByIssueID[]> => {
    if (USE_MOCK) {
        console.log("fetchCouponByIssueId for issuId:", issueId);

        const mockMap: Record<number, CouponByIssueID[]> = {
            600001: Array.from({ length: 100 }).map((_, i) => ({
                id: 1000 + i,
                product: { product_id: 1, product_name: "타코야끼 15알" },
                partner: {
                    id: 201,
                    business_name: "호시 타코야끼",
                    owner_name: "홍사장",
                    owner_phone: "010-1111-1111",
                    address: "경기도 수원시 영통구",
                },
                status: i < 70 ? "USED" : "USABLE",
                expired_at: "2025-12-31 23:59:59",
            })),
            600002: Array.from({ length: 150 }).map((_, i) => ({
                id: 2000 + i,
                product: { product_id: 2, product_name: "불고기 버거" },
                partner: {
                    id: 202,
                    business_name: "맥도날드",
                    owner_name: "김사장",
                    owner_phone: "010-2222-2222",
                    address: "서울특별시 강남구",
                },
                status: i < 90 ? "USED" : "USABLE",
                expired_at: "2025-10-10 23:59:59",
            })),

            600003: Array.from({ length: 50 }).map((_, i) => ({
                id: 3000 + i,
                product: { product_id: 3, product_name: "아메리카노" },
                partner: {
                    id: 203,
                    business_name: "굿커피",
                    owner_name: "이사장",
                    owner_phone: "010-3333-3333",
                    address: "제주특별자치도 제주시",
                },
                status: i < 10 ? "USED" : "USABLE",
                expired_at: "2024-12-01 00:00:00",
            })),
        };

        return mockMap[issueId] || [];
    }
    try {
        const response = await apiClient.get(`/coupon/manage/${issueId}/list`);
        const resData = response.data;

        if (resData.status !== "SUCCEED") {
            throw new Error(
                resData.message || "쿠폰 상세 정보를 불러오지 못했습니다."
            );
        }
        const result: CouponByIssueIDResponse = resData.data;
        return result.data;
    } catch (error) {
        console.error("Failed to fetch coupon by issue ID:", error);
        throw error;
    }
};
