import { useNavigate } from "react-router-dom"
import CommonButton from "../../components/common/button/CommonButton"
import DetailBox from "../../components/common/DetailBox"
import Layout from "../../components/layout/Layout"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useDispatch } from "react-redux"
import { logout, partnerWithdraw } from "../../services/authService"
import { resetUserInfo } from "../../store/userSlice"
import BasicModal from "../../components/common/modal/BasicModal.tsx"
import { useState } from "react" // 파트너 정보 리셋 액션이 필요하다면 추가

const PartnerMypage = () => {
    const menus = {
        customerCenter: [
            // { title: "공지사항", url: "/support/notice" },
            // { title: "FAQ", url: "/support/faq" },
            // { title: "문의하기", url: "/support/contact" },
            { title: "공지사항", onClick: () => setIsDevNoticeModalOpen(true) },
            { title: "FAQ", onClick: () => setIsDevNoticeModalOpen(true) },
            { title: "문의하기", onClick: () => setIsDevNoticeModalOpen(true) },
        ],
        myInfo: [
            { title: "계정 정보", url: "/general/account" },
            { title: "비밀번호 변경", url: "/findpw" },
        ],
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isDevNoticeModalOpen, setIsDevNoticeModalOpen] = useState<boolean>(false)

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

    return (
        <Layout>
            <div className="text-black font-bold text-2xl mt-11 mb-4">
                <p>{partnerNameFromRedux}님 안녕하세요</p>
            </div>

            <div className="flex flex-col mt-7 gap-4">
                <DetailBox
                    mode="default"
                    title="내 정보"
                    leftstring={menus.myInfo.map((item) => item.title)}
                    linkurl={menus.myInfo.map((item) => item.url)}
                />
                <DetailBox
                    mode="default"
                    title="고객센터"
                    leftstring={menus.customerCenter.map((item) => item.title)}
                    onClicks={menus.customerCenter.map((item) => item.onClick)}
                />
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

            <BasicModal
                mode={"OnlyYes"}
                isOpen={isDevNoticeModalOpen}
                title={"개발중입니다."}
                onConfirm={() => setIsDevNoticeModalOpen(false)}
            />
        </Layout>
    )
}

export default PartnerMypage
