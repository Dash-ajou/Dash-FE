// import apiClient from "./apiClient";

export type PartnerOrgDetail = {
    vendor_id: number;
    vendor_name: string;
    head_name: string;
    head_contact: string;
    details: {
        request_detail: string;
        request_count: number;
        total_price: string;
        approval_date: string;
    };
};

//TO-DO: 실제 API 연동
// export const fetchPartnerOrgDetailStat = async (vendor_id: number): Promise<PartnerOrgDetail> => {
//     const response = await apiClient.get<{ status: string; message: string; data: PartnerOrgDetail }>(
//         `/partner/stats/organization/${vendor_id}`
//     );
//
//     if (response.data.status !== "SUCCESS") {
//         throw new Error("발급 단체 상세 정보 로딩 실패");
//     }
//
//     return response.data.data;
// };

// ✅ Mock
const MOCK_DETAILS: Record<number, PartnerOrgDetail> = {
    1: {
        vendor_id: 1,
        vendor_name: "아주대학교 총학생회",
        head_name: "김총학생",
        head_contact: "010-1234-5678",
        details: {
            request_detail: "오리지널 타코야끼 10알",
            request_count: 150,
            total_price: "400,000원",
            approval_date: "2025-01-04 14:35",
        },
    },
    2: {
        vendor_id: 2,
        vendor_name: "아주대학교 사이버보안학과",
        head_name: "박소연",
        head_contact: "010-4321-8765",
        details: {
            request_detail: "초코파이 50박스",
            request_count: 200,
            total_price: "1,200,000원",
            approval_date: "2025-01-10 11:12",
        },
    },
    3: {
        vendor_id: 3,
        vendor_name: "삼성 라이온즈",
        head_name: "이승엽",
        head_contact: "010-8888-9999",
        details: {
            request_detail: "응원봉 300개",
            request_count: 300,
            total_price: "3,000,000원",
            approval_date: "2025-02-01 10:00",
        },
    },
};

export const fetchPartnerOrgDetailStat = async (
    vendor_id: number
): Promise<PartnerOrgDetail> => {
    console.log("Mock 요청 vendor_id:", vendor_id);
    const result = MOCK_DETAILS[vendor_id];
    if (!result) throw new Error("해당 vendor_id의 데이터가 없습니다.");
    return result;
};
