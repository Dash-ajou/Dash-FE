import apiClient from "./apiClient";

export type MenuUsageStat = {
  menuName: string;
  menuIssued: number;
  menuUsed: number;
  menuUsageRage: {
    source: string;
    parsedValue: number;
  };
};

export type MainVendorStat = {
  vendorId: number;
  vendorName: string;
  vendorIssued: number;
  vendorUsed: number;
  vendorUsageRate: {
    source: string;
    parsedValue: number;
  };
};

export type MainPartnerStats = {
  totalIssued: number;
  totalUsed: number;
  totalRemainder: number;
  usageRate: number;
  detailedStats: MainVendorStat[];
  menuUsage?: MenuUsageStat[];
};

export const fetchPartnerStats = async (): Promise<MainPartnerStats> => {
  try {
    const response = await apiClient.get("/partner/stats");
    const { status, data } = response.data;

    if (status !== "SUCCESS") {
      throw new Error("파트너 통계 데이터 로딩 실패");
    }

    if (!data || !Array.isArray(data.detailedStats)) {
      console.warn("[fetchPartnerStats] detailedStats가 배열이 아님 또는 없음:", data.data);
    } else if (data.detailedStats.length === 0) {
      console.warn("[fetchPartnerStats] detailedStats가 빈 배열입니다");
    } else {
      console.log("[fetchPartnerStats] detailedStats 정상:", data.detailedStats);
    }

    return data;
  } catch (error) {
    console.error("[fetchPartnerStats] 요청 중 에러 발생:", error);
    throw error;
  }
};
