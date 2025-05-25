import apiClient from "./apiClient";

export type MainVendorStat = {
  vendor_name: string;
  vendor_issued: number;
  vendor_used: number;
};

export type MainPartnerStats = {
  total_issued: number;
  total_used: number;
  total_remainder: number;
  usage_rate: number;
  detailed_stats: MainVendorStat[];
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

    if (!data || !Array.isArray(data.detailed_stats)) {
      console.warn("[fetchPartnerStats] detailed_stats가 배열이 아님 또는 없음:", data);
    } else if (data.detailed_stats.length === 0) {
      console.warn("[fetchPartnerStats] detailed_stats가 빈 배열입니다");
    } else {
      console.log("[fetchPartnerStats] detailed_stats 정상:", data.detailed_stats);
    }

    return data;
  } catch (error) {
    console.error("[fetchPartnerStats] 요청 중 에러 발생:", error);
    throw error;
  }
};
