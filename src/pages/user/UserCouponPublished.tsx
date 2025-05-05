import { useEffect, useState } from "react";
import Icon from "../../components/common/icons/Icon";
import Layout from "../../components/layout/Layout";
import Block from "../../components/module/Block";
import {
    fetchPublishedCoupon,
    PublishedCoupon,
} from "../../services/userPublishedCouponService";
import { useNavigate } from "react-router-dom";

const UserCouponPublished = () => {
    const [coupons, setCoupons] = useState<PublishedCoupon[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadCoupons = async () => {
            try {
                const data = await fetchPublishedCoupon();
                setCoupons(data);
            } catch (err) {
                console.error(err, "실패");
            }
        };
        loadCoupons();
    }, []);

    const filteredCoupons = coupons.filter((coupon) =>
        coupon.partner.business_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <div className="w-full px-4 py-2 mt-3 mb-8 bg-white rounded-md outline outline-1 outline-zinc-300 flex items-center gap-3">
                <Icon name="search_gray" size={18} />
                <input
                    type="text"
                    placeholder="파트너명 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full text-base text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
                />
            </div>

            <div className="px-2 flex flex-col gap-4">
                {filteredCoupons.map((coupon) => (
                    <div
                        key={coupon.issue_id}
                        onClick={() =>
                            navigate("/user/coupon/published/detail", {
                                state: {
                                    businessName: coupon.partner.business_name,
                                    issueId: coupon.issue_id,
                                },
                            })
                        }
                    >
                        <Block
                            key={coupon.issue_id}
                            type="toggle"
                            title={coupon.partner.business_name}
                            subtitle={`사용 현황: ${coupon.used_count} / ${coupon.issue_count}`}
                            info={`유효 기간: ~yyyy.mm.dd`} //TO-DO: API 수정 필요
                            defaultToggle={coupon.status === "ENABLE"}
                        />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default UserCouponPublished;
