import apiClient from "./apiClient";

export type MenuVendorStat = {
  vendor_name: string;
  vendor_issued: number;
  vendor_used: number;
  vendor_remainder: number;
  usable_status: string;
};

export type PartnerMenuDetailStat = {
  menu_name: string;
  menu_vendors: number;
  vendors: MenuVendorStat[];
};

export const fetchPartnerMenuDetailStat = async (
  menu_name: string,
): Promise<PartnerMenuDetailStat> => {
  const response = await apiClient.get<{
    status: string;
    message: string;
    data: PartnerMenuDetailStat;
  }>(`/partner/stats/menu/${encodeURIComponent(menu_name)}/vendors`);

  if (response.data.status !== "SUCCESS") {
    throw new Error("메뉴별 벤더 목록 조회 실패");
  }

  return response.data.data;
};
