import React from "react";
import Layout from "../../components/layout/Layout.tsx";
import Block from "../../components/module/Block.tsx";
import {useNavigate} from "react-router-dom";

const CouponRequestList: React.FC = () => {
    const navigate=useNavigate();

    return (
        <Layout>
            <div className="pb-24 h-full">
                <div> 검색 창</div>
                <Block type={"detail"} title={"호시타코야끼"} statusType={"approved"} />
                <Block type={"detail"} title={"호시타코야끼"} statusType={"rejected"} />
                <Block type={"detail"} title={"호시타코야끼"} statusType={"pending"} />
                <Block type={"detail"} title={"호시타코야끼"} statusType={"approved"} />
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
