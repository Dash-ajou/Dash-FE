import React, { useEffect, useState } from "react"
import Layout from "../../components/layout/Layout.tsx"
import Block from "../../components/module/Block.tsx"
import { useNavigate } from "react-router-dom"
import { couponRequestList } from "../../services/vendorCouponRequestService"
import Icon from "../../components/common/icons/Icon.tsx"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store.ts"

const CouponRequestList: React.FC = () => {
    const navigate = useNavigate()
    const [requests, setRequests] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const userType = useSelector((state: RootState) => state.type.userType)
    const location = window.location
    const isUser = userType === "" ? location.pathname.startsWith("/user/") : userType === "GENERAL"

    useEffect(() => {
        const shouldFetch =
            userType !== "" ||
            (userType === "" &&
                (location.pathname.startsWith("/user/") ||
                    location.pathname.startsWith("/partner/")))

        if (!shouldFetch) return

        const fetchData = async () => {
            const response = await couponRequestList()
            if (response.success) {
                setRequests(response.data)
            } else {
                setRequests([])
            }
        }

        fetchData()
    }, [userType, location.pathname])

    return (
        <Layout>
            <div className="pb-24 h-full">
                <div className="w-full px-4 py-2 mt-3 mb-8 bg-white rounded-md outline outline-1 outline-zinc-300 flex items-center gap-3">
                    <Icon name="search_gray" size={18} />
                    <input
                        type="text"
                        placeholder={isUser ? "파트너명 검색" : "단체명 검색"}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full text-base text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    {Array.isArray(requests) &&
                        requests.map((item) => (
                            <Block
                                key={item.request_id}
                                type={"detail"}
                                title={isUser ? item.partner.partnerName : item.vendor.name}
                                statusType={
                                    item.status === "REQUESTED"
                                        ? "pending"
                                        : item.status === "APPROVED"
                                          ? "approved"
                                          : item.status === "DENIED"
                                            ? "rejected"
                                            : undefined
                                }
                                onNext={() =>
                                    navigate(
                                        isUser
                                            ? "/user/coupon/request/detail"
                                            : "/partner/request/detail",
                                        {
                                            state: item.request_id,
                                        }
                                    )
                                }
                            />
                        ))}
                </div>
            </div>

            {isUser && (
                <>
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
                    <button
                        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-blue-500 text-white text-3xl shadow-md z-20"
                        onClick={() => navigate("/user/coupon/request")}
                    >
                        +
                    </button>
                </>
            )}
        </Layout>
    )
}

export default CouponRequestList
