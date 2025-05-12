import apiClient from "./apiClient";

export interface Notification {
  notification_id: number;
  message: string;
  sender_type: string;
  received_at: string;
  read_at?: string;
  readed: boolean;
}

export const fetchPushNotifications = async () => {
  try {
    const { status, data } = await apiClient.get("/push/list");

    console.log("🔍 API 응답 data:", data);

    // ✅ `data.data.data`가 실제 배열인지 확인 후 반환
    if (status === 200 && Array.isArray(data?.data?.data)) {
      return { success: true, data: data.data };
    }
  } catch (error) {
    console.error("❌ 알림 데이터 불러오기 실패:", error);
  }

  return { success: false, data: [] }; // ✅ 실패 시 빈 배열 반환
};
