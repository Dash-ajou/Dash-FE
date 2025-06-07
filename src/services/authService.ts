import apiClient from "./apiClient.ts"

export const login = async (data: { user_phone: string; user_password: string }) => {
    try {
        const response = await apiClient.post("/auth/login", data)

        if (response.status === 200) {
            console.log(response)
            return { success: true, data: response.data.data.user }
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
    general_email?: string
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
    partner_name: string
    partner_address: string
    owner_name: string
    owner_phone: string
    owner_email?: string
    password: string
    password_confirm: string
}) => {
    try {
        const response = await apiClient.post("/signup/partner/details", data)

        if (response.status === 201) {
            return { success: true }
        } else {
            return { success: false, data: response.data.message }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const PhoneVerifyRequest = async (data: { user_phone: string }) => {
    try {
        const response = await apiClient.post("/auth/phone/request", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const PhoneVerify = async (data: { user_phone: string; user_verify_code: string }) => {
    try {
        const response = await apiClient.post("/auth/phone/verify", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false, data: response.data.message }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const userUpdatePhone = async (data: {
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

export const partnerUpdatePhone = async (data: {
    owner_new_phone: string
    owner_verify_code: string
}) => {
    try {
        const response = await apiClient.patch("/partner/account/phone", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const emailVerify = async (data: { new_email: string }) => {
    try {
        const response = await apiClient.post("/general/account/email-verify/request", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const emailChange = async (data: { new_email: string; email_verify_code: string }) => {
    try {
        const response = await apiClient.post("/general/account/email-verify/confirm", data)

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const passwordReset_phoneVerifyRequest = async (data: { user_phone: string }) => {
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
    user_verify_code: string
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

export const googleOAuth = async (data: { google_access_token: string }) => {
    try {
        const response = await apiClient.post("/auth/google", data)

        if (response.status === 200) {
            return { success: true, data: response.data.data.userEmail }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const getUserInfo = async () => {
    try {
        const response = await apiClient.get("/account/session-info")

        if (response.status === 200) {
            return { success: true, data: response.data.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const userWithdraw = async () => {
    try {
        const response = await apiClient.delete("/general/account/delete")

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const partnerWithdraw = async () => {
    try {
        const response = await apiClient.delete("/partner/account/delete")

        if (response.status === 200) {
            return { success: true }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}
