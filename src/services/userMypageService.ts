import apiClient from "./apiClient";

export interface CouponStatus {
    usable_coupons: number;
    used_coupons: number;
}

export interface MenuItem {
    title: string;
    url: string;
}

export interface Menus {
    my_info: MenuItem[];
    customer_center: MenuItem[];
}

export interface UserMyPageData {
    general_name: string;
    coupon_status: CouponStatus;
    menus: Menus;
}

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}

export const fetchUserMyPage = async () => {
    try {
        const response = await apiClient.get<ApiResponse<UserMyPageData>>(
            "/general/mypage"
        );

        console.log("api 응답:", response.data);

        if (response.status === 200 && response.data?.data) {
            return { success: true, data: response.data.data };
        }
    } catch (error) {
        console.error("정보 불러오기 실패", error);
    }
    return { success: false, data: null };
};
