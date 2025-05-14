// TO-DO: 주석 제거거
// import apiClient from "./apiClient";

interface UsedCoupon {
  redeem_id: number;
  payment_code: string;
  used_at: string;
  status: "USED" | "CANCELED";
  menu_name: string;
}

interface UsedCouponResponse {
  status: string;
  message: string;
  data: {
    page: number;
    size: number;
    count: number;
    data: UsedCoupon[];
  };
}

export const fetchPartnerUsedCoupon = async (): Promise<UsedCoupon[]> => {
  // const response = await apiClient.get<UsedCouponResponse>('/coupon/redeem/log/list');
  // const coupons = response.data.data.data;

  const mockData: UsedCouponResponse = {
    status: "SUCCEED",
    message: "API 별 안내 메세지를 전달합니다",
    data: {
      page: 1,
      size: 10,
      count: 10,
      data: [
        {
          redeem_id: 534231,
          payment_code: "REJIOJRHUONsjieofj",
          used_at: "2024-12-12 13:12:12",
          status: "USED",
          menu_name: "아메리카노",
        },
        {
          redeem_id: 534230,
          payment_code: "REJIOJRHUONsjieofj",
          used_at: "2024-12-12 13:12:12",
          status: "USED",
          menu_name: "카페라떼",
        },
        {
          redeem_id: 534229,
          payment_code: "REJIOJRHUONsjieofj",
          used_at: "2024-12-12 13:12:12",
          status: "USED",
          menu_name: "초코라떼",
        },
        {
          redeem_id: 534228,
          payment_code: "REJIOJRHUONsjieofj",
          used_at: "2024-12-12 13:12:12",
          status: "USED",
          menu_name: "녹차프라푸치노",
        },
      ],
    },
  };

  const filtered = mockData.data.data.filter((coupon) => coupon.status === "USED");
  return filtered;
};
