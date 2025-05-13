//Account Domain > Partner Account API > 통계 조회 (메인 페이지)
//import apiClient from "./apiClient";
//TO-DO: mock데이터 삭제

export type MainVendorStat = {
    vendor_name: string;
    vendor_issued_count: number;
    vendor_used_count: number;
};

export type MainPartnerStats = {
    total_issued: number;
    total_used: number;
    total_remainder: number;
    usage_rate: number;
    detailed_stats: MainVendorStat[];
};

export const fetchPartnerStats = async (): Promise<MainPartnerStats> => {
    return {
        total_issued: 158,
        total_used: 60,
        total_remainder: 98,
        usage_rate: 38,
        detailed_stats: [
            {
                vendor_name: "아주대학교 총학생회",
                vendor_issued_count: 150,
                vendor_used_count: 10,
            },
            {
                vendor_name: "아주대학교 사이버보안학과",
                vendor_issued_count: 60,
                vendor_used_count: 32,
            },
            {
                vendor_name: "삼성 라이온즈",
                vendor_issued_count: 80,
                vendor_used_count: 31,
            },
        ],
    };

    // const response = await fetch("/api/partner/stats"); // 실제 API 엔드포인트
    // const json = await response.json();

    // if (json.status !== "SUCCESS") {
    //     throw new Error("파트너 통계 데이터 로딩 실패");
    // }

    // return json.data as MainPartnerStats;
};
