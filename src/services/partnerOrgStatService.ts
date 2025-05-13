//TO-DO: 주석 해제하고 실제 API 연동
//import apiClient from "./apiClient";

export type DetailedVendorStat = {
    vendor_id: number;
    vendor_name: string;
    vendor_issued_count: number;
    vendor_used_count: number;
    vendor_usage_rate: number;
};

export type MenuUsageStat = {
    menu_name: string;
    menu_issued_count: number;
    menu_used_count: number;
    menu_usage_rate: number;
};

export type DetailedPartnerStats = {
    total_issued: number;
    total_used: number;
    total_remainder: number;
    usage_rate: number;
    detailed_stats: DetailedVendorStat[];
    menu_usage: MenuUsageStat[];
};

export const fetchPartnerOrgStat = async (): Promise<DetailedPartnerStats> => {
    return {
        total_issued: 158,
        total_used: 60,
        total_remainder: 98,
        usage_rate: 38,
        detailed_stats: [
            {
                vendor_id: 1,
                vendor_name: "아주대학교 총학생회",
                vendor_issued_count: 150,
                vendor_used_count: 10,
                vendor_usage_rate: 6.7,
            },
            {
                vendor_id: 2,
                vendor_name: "아주대학교 사이버보안학과",
                vendor_issued_count: 60,
                vendor_used_count: 32,
                vendor_usage_rate: 53.3,
            },
            {
                vendor_id: 3,
                vendor_name: "삼성 라이온즈",
                vendor_issued_count: 80,
                vendor_used_count: 40,
                vendor_usage_rate: 50,
            },
        ],
        menu_usage: [
            {
                menu_name: "오리지널 타코야끼",
                menu_issued_count: 100,
                menu_used_count: 80,
                menu_usage_rate: 80,
            },
            {
                menu_name: "초코파이",
                menu_issued_count: 50,
                menu_used_count: 30,
                menu_usage_rate: 60,
            },
            {
                menu_name: "붕어빵",
                menu_issued_count: 70,
                menu_used_count: 55,
                menu_usage_rate: 78.6,
            },
        ],
    };
};

/* type ApiResponse = {
    status: string;
    message: string;
    data: {
      total_issued: number;
      total_used: number;
      total_remainder: number;
      usage_rate: number;
      vendors: {
        vendor_id: number;
        vendor_name: string;
        vendor_issued_count: number;
        vendor_used_count: number;
        vendor_usage_rate: number;
      }[];
      menu_usage: MenuUsageStat[];
    };
  };
  
  export const fetchPartnerStats = async (): Promise<PartnerStats> => {
    const response = await apiClient.get<ApiResponse>("/partner/stats/detailed");
  
    if (response.data.status !== "SUCCESS") {
      throw new Error("파트너 통계 데이터 로딩 실패");
    }
  
    const { data } = response.data;
  
    return {
      total_issued: data.total_issued,
      total_used: data.total_used,
      total_remainder: data.total_remainder,
      usage_rate: data.usage_rate,
      detailed_stats: data.vendors.map((v) => ({
        vendor_name: v.vendor_name,
        vendor_issued_count: v.vendor_issued_count,
        vendor_used_count: v.vendor_used_count,
        vendor_usage_rate: v.vendor_usage_rate,
      })),
      menu_usage: data.menu_usage,
    };
  };
  */
