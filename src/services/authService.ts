import apiClient from "./apiClient.ts";

export const generalJoin = async(data: {
    name: string;
    phone: number;
    password: string;
    confirmPassword: string;
}) => {
    try {
        const response = await apiClient.post('/signup/general', data);

        if (response.status === 201) {

            return {success: true};
        }
    } catch (error) {
        return {success: false, error};
    }
};

export const partnerJoin = async(data: {
    name: string;
    phone: number;
    address: string;
    storeName: string;
    password: string;
    confirmPassword: string;
}) => {
    try {
        const response = await apiClient.post('/signup/partner', data);

        if (response.status === 201) {

            return {success: true};
        }
    } catch (error) {
        return {success: false, error};
    }
};

export const updatePhone = async(data: {
    general_new_phone: string;
    general_verify_code: string;
}) => {
    try {
        const response = await apiClient.patch('/general/account/phone', data);

        if (response.status === 200) {
            return {success: true};
        }
    } catch (error) {
        return {success: false, error};
    }
}
