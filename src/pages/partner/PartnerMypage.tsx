import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import CommonButton from "../../components/common/button/CommonButton"
import DetailBox from "../../components/common/DetailBox"
import Layout from "../../components/layout/Layout"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useDispatch } from "react-redux"
import { logout, partnerWithdraw } from "../../services/authService"
import { resetUserInfo } from "../../store/userSlice" // 파트너 정보 리셋 액션이 필요하다면 추가

import { fetchPartnerMyPage, PartnerMyPageData } from "../../services/partnerMyPageService"

const PartnerMypage = () => {
    const [partnerData, setPartnerData] = useState<PartnerMyPageData | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const partnerNameFromRedux = useSelector((state: RootState) => state.user.name)

    const handleLogOut = async () => {
        const res = await logout()
        if (res.success) {
            dispatch(resetUserInfo())
            navigate("/login")
        } else {
            alert("로그아웃에 실패했습니다.")
        }
    }

    const handleWithdraw = async () => {
        const res = await partnerWithdraw()
        if (res.success) {
            dispatch(resetUserInfo())
            navigate("/")
        } else {
            alert("회원탈퇴에 실패했습니다.")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetchPartnerMyPage()
            if (res.success && res.data) {
                // res.data가 null이 아닐 때만 설정
                setPartnerData(res.data)
            } else {
                console.error("파트너 마이페이지 데이터 로드 실패")
                navigate("/login")
            }
        }
        fetchData()
    }, [])

    if (!partnerData) {
        return <div className="text-center mt-10">불러오는 중</div>
    }

    const myInfoSection = partnerData.menus.find((menu) => menu.section === "내 정보")
    const customerCenterSection = partnerData.menus.find((menu) => menu.section === "고객센터")

    return (
        <Layout>
            <div className="text-black font-bold text-2xl mt-11 mb-4">
                <p>{partnerData.ownerName || partnerNameFromRedux}님 안녕하세요</p>
            </div>

            <div className="flex flex-col mt-7 gap-4">
                {myInfoSection && (
                    <DetailBox
                        mode="default"
                        title={myInfoSection.section} // "내 정보"
                        leftstring={myInfoSection.items.map((item) => item.title)}
                        linkurl={myInfoSection.items.map((item) => item.url)}
                    />
                )}
                {customerCenterSection && (
                    <DetailBox
                        mode="default"
                        title={customerCenterSection.section} // "고객센터"
                        leftstring={customerCenterSection.items.map((item) => item.title)}
                        linkurl={customerCenterSection.items.map((item) => item.url)}
                    />
                )}
            </div>

            <div className="flex flex-col items-center justify-center mt-7">
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="black"
                    detail={{ label: "로그아웃", position: "none" }}
                    onClick={handleLogOut}
                />
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="red"
                    detail={{ label: "회원 탈퇴", position: "none" }}
                    onClick={handleWithdraw}
                />
            </div>
        </Layout>
    )
}

export default PartnerMypage
