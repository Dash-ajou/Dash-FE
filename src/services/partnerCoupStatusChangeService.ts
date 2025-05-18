// TO-DO: 주석 제거거
// import apiClient from "./apiClient";

export type VendorInfo = {
    general_id: number;
    general_name: string;
    general_email: string | null;
    general_phone: string;
    vendor_group_id: number;
    department_id: number;
    joined_at: string;
    general_new_phone?: string;
    general_verify_code?: string;
    new_email?: string;
    email_verify_code?: string;
};

export type ProductInfo = {
    product_id: number;
    partner_id: number;
    product_name: string;
    price: number;
};

export type UseCouponResponse = {
    result: boolean;
    id: number;
    used_at: string;
    vendor: VendorInfo;
    product: ProductInfo;
};

export type CancelCouponResponse = {
    result: boolean;
    id: number;
    used_at: string;
    canceled_at: string;
};

export const fetchCouponUse = async (
    payment_code: string
    // scan_img: File // 현재 이미지 전송 제외
): Promise<UseCouponResponse> => {
    /*
    const formData = new FormData();
    formData.append("payment_code", payment_code);
    formData.append("scan_img", scan_img);

    const response = await apiClient.post("/coupon/redeem/use", formData);

    if (response.data.status !== "SUCCEED") {
        throw new Error("쿠폰 사용 처리 실패");
    }

    return response.data.data;
    */

    if (payment_code === "used-123") {
        throw new Error("이미 사용된 쿠폰입니다.");
    }

    return {
        result: true,
        id: 10101,
        used_at: "2025-05-13 15:30:00",
        vendor: {
            general_id: 1,
            general_name: "Bobby Gutkowski",
            general_email: "Assunta_Wehner35@yahoo.com",
            general_phone: "(415) 529-8392",
            vendor_group_id: 11,
            department_id: 22,
            joined_at: "2022-01-01T10:00:00Z",
        },
        product: {
            product_id: 87542090,
            partner_id: 69952994,
            product_name: "Bespoke Bronze Shirt",
            price: 660,
        },
    };
};

export const fetchCouponCancel = async (
    payment_code: string,
    redeem_id: number
): Promise<CancelCouponResponse> => {
    // 실제 API 요청은 주석 처리
    /*
    const response = await apiClient.post("/coupon/redeem/cancel", {
        payment_code,
        redeem_id,
    });

    if (response.data.status !== "SUCCEED") {
        throw new Error("쿠폰 사용 취소 실패");
    }

    return response.data.data;
    */

    return {
        result: true,
        id: redeem_id,
        used_at: "2025-05-13 15:30:00",
        canceled_at: "2025-05-13 16:45:00",
    };
};
