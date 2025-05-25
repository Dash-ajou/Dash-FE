import apiClient from "./apiClient.ts"

export const login = async (data: { user_phone: string; user_password: string }) => {
    try {
        const response = await apiClient.post("/auth/login", data)

        if (response.status === 200) {
            return { success: true, data: response.data.data.data.user }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const logout = async () => {
    try {
        const response = await apiClient.post("/auth/logout")

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const generalJoin = async (data: {
    general_name: string
    password: string
    password_confirm: string
    user_type: string
    general_phone: string
    // general_email: string TODO
}) => {
    try {
        const response = await apiClient.post("/signup/unified", data)

        if (response.status === 201) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const partnerJoin = async (data: {
    user_type: string
    partner_name: string
    partner_address: string
    owner_name: string
    owner_phone: string
    //owner_email: string TODO
    password: string
    password_confirm: string
}) => {
    try {
        const response = await apiClient.post("/signup/partner/details", data)

        if (response.status === 201) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const PhoneVerifyRequest = async (data: { user_pone: string }) => {
    try {
        const response = await apiClient.post("/auth/phone/request", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { sucess: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const PhoneVerify = async (data: { user_phone: string; user_verify_code: string }) => {
    try {
        const response = await apiClient.post("/general/account/phone", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false, data: response.data.message }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const updatePhone = async (data: {
    general_new_phone: string
    general_verify_code: string
}) => {
    try {
        const response = await apiClient.patch("/general/account/phone", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const passwordReset_phoneVerifyRequest = async (data: { user_pone: string }) => {
    try {
        const response = await apiClient.post("/auth/password-reset/request", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { sucess: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const passwordReset_phoneVerify = async (data: {
    user_phone: string
    pw_verify_code: string
}) => {
    try {
        const response = await apiClient.post("/auth/password-reset/verify", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false, data: response.data.message }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const passwordReset = async (data: {
    user_phone: string
    new_password: string
    new_password_confirm: string
}) => {
    try {
        const response = await apiClient.post("/auth/password-reset/complete", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}
