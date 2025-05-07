// TO-DO: 주석 제거 및 MOCK데이터 제거
// import apiClient from "./apiClient";

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

// export const fetchPartnerMenuDetailStat = async (menu_name: string): Promise<PartnerMenuDetailStat> => {
//     const response = await apiClient.get<{ status: string; message: string; data: fetchPartnerMenuDetailStat}>(
//         `/partner/stats/menu/${menu_name}/vendors`
//     );

//     if (response.data.status !== "SUCCESS") {
//         throw new Error ("메뉴별 벤더 목록 조회 실패");
//     }

//     return response.data.data;
// };

const MOCK_MENU_STATS: Record<string, PartnerMenuDetailStat> = {
    "오리지널 타코야끼": {
        menu_name: "오리지널 타코야끼",
        menu_vendors: 3,
        vendors: [
            {
                vendor_name: "아주대학교 총학생회",
                vendor_issued: 150,
                vendor_used: 10,
                vendor_remainder: 150,
                usable_status: "사용 가능",
            },
            {
                vendor_name: "아주대학교 사이버보안학과",
                vendor_issued: 60,
                vendor_used: 32,
                vendor_remainder: 28,
                usable_status: "사용 완료",
            },
            {
                vendor_name: "아주대학교 경영학과",
                vendor_issued: 300,
                vendor_used: 250,
                vendor_remainder: 50,
                usable_status: "사용 가능",
            },
        ],
    },
};

export const fetchPartnerMenuDetailStat = async (
    menu_name: string
): Promise<PartnerMenuDetailStat> => {
    console.log("Mock 요청 menu_name:", menu_name);
    const result = MOCK_MENU_STATS[menu_name];
    if (!result) throw new Error("해당 menu_name의 데이터가 없습니다.");
    return result;
};
