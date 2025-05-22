import apiClient from "./apiClient.ts"

export const couponRequest = async () => {
    // try {
    //     const response = await apiClient.post('/coupon/issue/request');
    //
    //     if (response.status === 201) {
    //         return {success: true};
    //     } else {
    //         return {success: false};
    //     }
    // } catch (error) {
    //     return {success: false, error};
    // }

    return { success: true }
}

export const couponRequestDetail = async (request_id: number) => {
    try {
        const response = await apiClient.get(`/coupon/issue/${request_id}`)

        if (response.status === 200) {
            return { success: true, data: response.data.data }
        } else {
            return { success: false }
        }
    } catch (error) {
        return { success: false, error }
    }
}

export const couponRequestList = async () => {
    // try {
    //     const response = await apiClient.get('/coupon/issue/list');
    //
    //     if (response.status === 200) {
    //         return {success: true, data: response.data.data};
    //     } else {
    //         return {success: false};
    //     }
    // } catch (error) {
    //     return {success: false, error};
    // }

    return {
        success: true,
        data: {
            page: 1,
            size: 10,
            count: 3,
            data: [
                {
                    request_id: 8675432,
                    created_at: "2025-01-05 01:00:00",
                    status: "REQUESTED",
                    vendor: {
                        vendor_name: "아주대학교 총학생회",
                        president_name: "나대표",
                        president_phone: "01012341243",
                    },
                    partner: {
                        business_name: "호시 타코야끼",
                        owner_name: "나사장",
                        owner_phone: "01056785678",
                    },
                },
                {
                    request_id: 8671432,
                    created_at: "2025-01-05 01:00:00",
                    status: "APPROVED",
                    vendor: {
                        vendor_name: "아주대학교 사이버보안학과 학생회",
                        president_name: "나대표",
                        president_phone: "01012341243",
                    },
                    partner: {
                        business_name: "호시 타코야끼",
                        owner_name: "나사장",
                        owner_phone: "01056785678",
                    },
                },
                {
                    request_id: 8624432,
                    created_at: "2025-01-05 01:00:00",
                    status: "DENIED",
                    vendor: {
                        vendor_name: "아주대학교 총학생회",
                        president_name: "나대표",
                        president_phone: "01012341243",
                    },
                    partner: {
                        business_name: "호시 타코야끼",
                        owner_name: "나사장",
                        owner_phone: "01056785678",
                    },
                },
            ],
        },
    }
}
