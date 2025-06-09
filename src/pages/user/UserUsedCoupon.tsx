import Layout from "../../components/layout/Layout.tsx";
import { useEffect, useState } from 'react';
import Icon from "../../components/common/icons/Icon.tsx";
import ListBlock from "../../components/common/ListBlock.tsx";
import { fetchUsedCoupon, UsedCoupon } from '../../services/couponUsedService.ts'
import { fetchCouponDetailService } from '../../services/couponDetailService.ts';
import ReceiptModal from '../../components/common/modal/ReceiptModal.tsx';

export type ReceiptCouponData = {
    coupon_id: number;
    partner: { business_name: string; owner_phone: string };
    product: { product_name: string };
    register: { name: string; phone: string };
    registered_at: string;
    payment_code: string;
    payment_id: number;
};

const UserUsedCoupon = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userUsedCoupons, setUserUsedCoupons] = useState<UsedCoupon[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<ReceiptCouponData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUsedCoupon();
                setUserUsedCoupons(response);
            } catch (error) {
                console.error("사용자 사용 완료 쿠폰 조회 실패", error);
            }
        };
        fetchData();
    }, []);

    const handleUserCouponClick = async (coupon: UsedCoupon) => {
        try {
            const res = await fetchCouponDetailService(String(coupon.coupon_id));

            const formatted: ReceiptCouponData = {
                coupon_id: res.data.coupon_id,
                partner: {
                    business_name: res.data.partner.business_name,
                    owner_phone: res.data.partner.owner_phone,
                },
                product: {
                    product_name: res.data.product.product_name,
                },
                register: {
                    name: res.data.register.name,
                    phone: res.data.register.phone,
                },
                registered_at: res.data.registered_at,
                payment_id: coupon.payment_id,
                payment_code: coupon.payment_code,
            };

            setSelectedCoupon(formatted);
            setModalVisible(true);
        } catch (err) {
            console.error("쿠폰 상세 조회 실패", err);
        }
    };


    const filteredCoupons = userUsedCoupons.filter((coupon) =>
        coupon.coupon_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div>
                <div className="w-full px-4 py-2 mt-3 mb-8 bg-white rounded-md outline outline-1 outline-zinc-300 flex items-center gap-3">
                    <Icon name="search_gray" size={18} />
                    <input
                        type="text"
                        placeholder="쿠폰 검색"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full text-base text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
                    />
                </div>

                {filteredCoupons.length > 0 ? (
                    filteredCoupons.map((coupon) => (
                        <ListBlock
                            key={coupon.coupon_id}
                            type="datetimelist"
                            menuname={coupon.coupon_name}
                            datetime={new Date(coupon.used_at).toLocaleString("ko-KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                            onClick={() => handleUserCouponClick(coupon)}
                        />
                    ))
                ) : (
                    <div className="text-center text-sm text-gray-500">사용한 쿠폰이 없습니다.</div>
                )}
            </div>

            <ReceiptModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                coupon={selectedCoupon}
            />
        </Layout>
    );
};

export default UserUsedCoupon;
