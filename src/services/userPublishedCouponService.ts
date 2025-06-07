import apiClient from "./apiClient";

export type Vendor = {
  vendor_name: string;
  president_name: string;
  president_phone: string;
};

export type Partner = {
  business_name: string;
  partner_phone: string;
};

export type PublishedCoupon = {
  request_id: number;
  vendor: Vendor;
  partner: Partner;
  issue_id: number;
  status: "ENABLE" | "DISABLE";
  issue_at: string;
  issue_count: number;
  used_count: number;
};

export type PublishedCouponResponse = {
  page: number;
  size: number;
  count: number;
  data: PublishedCoupon[];
};

type RequestParams = {
  vendor_name?: string;
  president_name?: string;
  business_name?: string;
  include_completed?: boolean;
  status?: boolean;
  page?: number;
  size?: number;
  issue_id?: number;
};

export const fetchPublishedCoupon = async (
  params: RequestParams = {},
): Promise<PublishedCoupon[]> => {
  try {
    const response = await apiClient.get<{
      status: string;
      message: string | null;
      data: PublishedCouponResponse;
    }>("/coupon/manage/list", { params });

    if (response.data.status !== "SUCCESS") {
      return [];
    }

    const coupons = response.data.data.data;
    const validCoupons = coupons.filter(
      (coupon) => coupon && coupon.partner && typeof coupon.partner.business_name === "string",
    );

    return validCoupons;
  } catch (error) {
    return [];
  }
};
