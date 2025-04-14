import apiClient from "./apiClient.ts";

export const CouponRegister = async(data: {
    coupon_number: string;
}) => {
    try {
        const response = await apiClient.post('/general/coupons/register', data);

        if (response.status === 201) {
            return {success: true};
        } else {
            return {success: false};
        }
    } catch (error) {
        return {success: false, error};
    }
};
