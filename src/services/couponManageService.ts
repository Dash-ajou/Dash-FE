import apiClient from "./apiClient";

export const fetchCouponStatus = async () => {
  try {
    const result = await apiClient.get("/general/coupons/status");

    if (result.status === 200) {
      return { success: true, data: result.data.data };
    }
  } catch (error) {
    console.error("쿠폰 데이터 불러오기 실패:", error);
  }
  return { success: false, data: null };
};
