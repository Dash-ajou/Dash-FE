// TO-DO: 주석 제거거

// import apiClient from "./apiClient";

// export const fetchPartnerCouponValidation = async (
//     coupon_number: string
// ) => {
//     const response = await apiClient.post("/coupon/redeem/validate", { coupon_number });
//     if (response.data.status !== "SUCCEED") {
//         throw new Error("쿠폰 유효성 검증 실패");
//     }
//     return response.data.data;
// };

export type PartnerCouponValidationResponse = {
    type: "REGISTER_CODE" | "PAYMENT_CODE";
    status: "REGISTERABLE" | "USABLE" | "USED";
    vendor: {
        name: string;
        email: string;
        phone: string;
    };
    partner: {
        id: number;
        business_name: string;
        owner_name: string;
        owner_phone: string;
        owner_email: string;
        address: string;
    };
    product: {
        product_id: number;
        partner_id: number;
        product_name: string;
        price: number;
    };
    redeem?: {
        redeem_id: number;
        payment_code: string;
        used_at: string;
    };
};

const MOCK_DATA: Record<string, PartnerCouponValidationResponse> = {
    "code-1": {
        type: "REGISTER_CODE",
        status: "REGISTERABLE",
        vendor: {
            name: "Bobby Gutkowski",
            email: "Assunta_Wehner35@yahoo.com",
            phone: "(415) 529-8392",
        },
        partner: {
            id: 84426258,
            business_name: "Al Rowe",
            owner_name: "Eduardo Bosco",
            owner_phone: "(301) 354-5571",
            owner_email: "Vivianne_Kiehn-Von30@hotmail.com",
            address:
                "Colorado Port Gisselle Lincoln County 592 Art Forge Apt. 845",
        },
        product: {
            product_id: 87542090,
            partner_id: 69952994,
            product_name: "Bespoke Bronze Shirt",
            price: 660,
        },
    },
    "code-2": {
        type: "PAYMENT_CODE",
        status: "USED",
        vendor: {
            name: "Miss Paula Gorczany",
            email: "Darion_Jaskolski97@gmail.com",
            phone: "(521) 974-1599",
        },
        partner: {
            id: 36975142,
            business_name: "Rhonda Pfannerstill",
            owner_name: "Dr. Shawn Schowalter",
            owner_phone: "(266) 332-8612",
            owner_email: "Tatum_Medhurst@gmail.com",
            address:
                "Kentucky Douglascester Henry County 57744 Ridge Road Suite 973",
        },
        product: {
            product_id: 58642611,
            partner_id: 39262490,
            product_name: "Small Concrete Salad",
            price: 225,
        },
        redeem: {
            redeem_id: 8765643,
            payment_code: "FJEIO54321D",
            used_at: "2025-01-07 03:46:19",
        },
    },
    "code-3": {
        type: "PAYMENT_CODE",
        status: "USABLE",
        vendor: {
            name: "Miss Paula Gorczany",
            email: "Darion_Jaskolski97@gmail.com",
            phone: "(521) 974-1599",
        },
        partner: {
            id: 36975142,
            business_name: "Rhonda Pfannerstill",
            owner_name: "Dr. Shawn Schowalter",
            owner_phone: "(266) 332-8612",
            owner_email: "Tatum_Medhurst@gmail.com",
            address:
                "Kentucky Douglascester Henry County 57744 Ridge Road Suite 973",
        },
        product: {
            product_id: 58642611,
            partner_id: 39262490,
            product_name: "Small Concrete Salad",
            price: 225,
        },
    },
};

export const fetchPartnerCouponValidation = async (
    coupon_number: string
): Promise<PartnerCouponValidationResponse> => {
    const data = MOCK_DATA[coupon_number];
    if (!data) throw new Error("등록되지 않은 쿠폰입니다.");
    return data;
};
