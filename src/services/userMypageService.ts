//TO-DO: mock데이터 제거 및 주석 제거
//import apiClient from "./apiClient";

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
        // 실제 API 호출 주석처리
        // const response = await apiClient.get<ApiResponse<UserMyPageData>>("/general/mypage");
        // if (response.status === 200 && response.data?.data) {
        //     return { success: true, data: response.data.data };
        // }

        // TO-DO: 이름은 전역변수에서 받아올 것
        const mockResponse: UserMyPageData = {
            general_name: "김김김",
            coupon_status: {
                usable_coupons: 1,
                used_coupons: 0,
            },
            menus: {
                my_info: [
                    {
                        title: "계정 정보",
                        url: "/general/account",
                    },
                    {
                        title: "비밀번호 변경하기",
                        url: "/auth/password-reset/request",
                    },
                ],
                customer_center: [
                    {
                        title: "공지사항",
                        url: "/support/notice",
                    },
                    {
                        title: "FAQ",
                        url: "/support/faq",
                    },
                    {
                        title: "문의하기",
                        url: "/support/contact",
                    },
                ],
            },
        };

        return { success: true, data: mockResponse };
    } catch (error) {
        console.error("정보 불러오기 실패", error);
    }

    return { success: false, data: null };
};
