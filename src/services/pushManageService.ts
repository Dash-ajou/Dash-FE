import apiClient from "./apiClient";

export interface Notification {
  notification_id: number;
  message: string;
  sender_type: string;
  received_at: string;
  read_at?: string;
  readed: boolean;
  tag: "COUPON_EXPIRE_WARNING" | "COUPON_RECEIVED" | "COUPON_USED" | "REQUEST_RECEIVED" | "REQUEST_ISSUED";
}

export interface FetchPushNotificationParams {
  is_readed?: boolean;
  received_at_from?: string;
  received_at_to?: string;
}

export const fetchPushNotifications = async (
    params: FetchPushNotificationParams = {}
): Promise<{ success: boolean; data: Notification[] }> => {
  try {
    const response = await apiClient.get<{
      status: string;
      message: string;
      data: {
        page: number;
        size: number;
        count: number;
        data: Notification[];
      };
    }>("/push/list", { params });

    if (response.status === 200 && Array.isArray(response.data.data.data)){
      return { success: true, data: response.data.data.data};
    }
  } catch (error) {
    console.error("알림 데이터 불러오기 실패:", error);
  }
  return {success: false, data: []};
};

