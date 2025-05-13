// TO-DO: 실제 API 연동 필요
// import apiClient from "./apiClient";

export interface CouponIssue {
    request_id: number;
    vendor: {
        vendor_name: string;
        president_name: string;
        president_phone: string;
    };
    partner: {
        business_name: string;
        partner_phone: string;
    };
    issue_id: number;
    status: "ENABLE" | "DISABLE";
    issue_at: string;
    issue_count: number;
    used_count: number;
}

export interface CouponIssueListResponse {
    status: string;
    message: string | null;
    data: {
        page: number;
        size: number;
        count: number;
        data: CouponIssue[];
    };
}

// 실제 API 호출 (주석 처리)
/*
export const fetchApprovedCouponIssues = async (): Promise<CouponIssueListResponse> => {
  const response = await apiClient.get<CouponIssueListResponse>('/coupon/manage/list');
  return response.data;
};
*/

//mock 데이터
export const fetchApprovedCouponIssues =
    async (): Promise<CouponIssueListResponse> => {
        return {
            status: "SUCCEED",
            message: null,
            data: {
                page: 1,
                size: 10,
                count: 5,
                data: [
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
                            business_name: "호시 타코야끼",
                            partner_phone: "010-1234-1234",
                        },
                        issue_id: 600028,
                        status: "DISABLE",
                        issue_at: "2024-12-26 12:35:12",
                        issue_count: 500,
                        used_count: 10,
                    },
                ],
            },
        };
    };
