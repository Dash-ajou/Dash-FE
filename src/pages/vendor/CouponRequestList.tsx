import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.tsx";
import Block from "../../components/module/Block.tsx";
import {useNavigate} from "react-router-dom";
import { couponRequestList } from "../../services/vendorCouponRequestService";

const CouponRequestList: React.FC = () => {
    const navigate=useNavigate();
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await couponRequestList();
            if (response.success) {
                setRequests(response.data.data);
            }else {
                setRequests([]);
            }
        };
        fetchData();
    }, []);

    return (
        <Layout>
            <div className="pb-24 h-full">
                <div> 검색 창</div> {/*TODO*/}
                {Array.isArray(requests) && requests.map((item) => (
                    <Block
                        key={item.request_id}
                        type={"detail"}
                        title={item.partner.business_name}
                        statusType={
                          item.status === "REQUESTED"
                            ? "pending"
                            : item.status === "APPROVED"
                            ? "approved"
                            : item.status === "DENIED"
                            ? "rejected"
                            : undefined
                        }
                    />
                ))}
            </div>

            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />

            <button
                className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white text-3xl shadow-md z-20"
                onClick={() => navigate('/user/coupon/request')}
            >
                +
            </button>
        </Layout>
    )
}

export default CouponRequestList;
