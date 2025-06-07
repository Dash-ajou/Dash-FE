import apiClient from "./apiClient";

export type PartnerOrgDetail = {
    vendor_name: string;
    head_name: string;
    head_contact: string;
    details: {
        request_detail: string;
        request_count: number;
        total_price: string;
        approval_date: string;
    }[];
};

export const fetchPartnerOrgDetailStat = async (
    vendor_id: number
): Promise<PartnerOrgDetail> => {
    const response = await apiClient.get<{ status: string; message: string; data: PartnerOrgDetail }>(
        `/partner/stats/organization/${vendor_id}`
    );

    if (response.data.status !== "SUCCESS") {
        throw new Error("발급 단체 상세 정보 로딩 실패");
    }

    return response.data.data;
};


