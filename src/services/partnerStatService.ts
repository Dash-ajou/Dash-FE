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
  console.log("[fetchPartnerStats] 요청 시작");
  console.log("현재 document.cookie:", document.cookie);

  try {
    const response = await apiClient.get("/partner/stats");

    console.log("[fetchPartnerStats] 응답 수신:", response);

    const { status, data } = response.data;

    if (status !== "SUCCESS") {
      console.error("[fetchPartnerStats] 응답 실패 상태:", status);
      throw new Error("파트너 통계 데이터 로딩 실패");
    }

    if (!data.data || !Array.isArray(data.data.detailedStats)) {
      console.warn("[fetchPartnerStats] detailedStats가 배열이 아님 또는 없음:", data.data);
    } else if (data.data.detailedStats.length === 0) {
      console.warn("[fetchPartnerStats] detailedStats가 빈 배열입니다");
    } else {
      console.log("[fetchPartnerStats] detailedStats 정상:", data.data.detailedStats);
    }

    return data.data;
  } catch (error) {
    console.error("[fetchPartnerStats] 요청 중 에러 발생:", error);
    throw error;
  }
};
