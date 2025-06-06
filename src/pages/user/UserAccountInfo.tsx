import Layout from "../../components/layout/Layout"
import { useState, useEffect } from "react"
import DetailBox from "../../components/common/DetailBox"
import {
    fetchPartnerAccountInfo,
    fetchUserAccountInfo,
} from "../../services/userAccountInfoService"
import { RootState } from "../../store/store.ts"
import { useSelector } from "react-redux"

type userInfo = {
    name: string
    phone: string
    email: string
}

const UserAccountInfo = () => {
    const [data, setData] = useState<userInfo>({
        name: "",
        phone: "",
        email: "",
    })
    const userType = useSelector((state: RootState) => state.type.userType) // 예시: "GENERAL" 또는 "PARTNER"

    useEffect(() => {
        const fetchData = async () => {
            let res
            if (userType === "GENERAL") {
                res = await fetchUserAccountInfo()
                if (res?.success && res.data) {
                    setData({
                        name: res.data.generalName,
                        email: res.data.generalEmail,
                        phone: res.data.generalPhone,
                    })
                }
            } else if (userType === "PARTNER") {
                res = await fetchPartnerAccountInfo()
                if (res?.success && res.data) {
                    setData({
                        name: res.data.owner_name,
                        email: res.data.owner_email,
                        phone: res.data.owner_phone,
                    })
                }
            }
        }
        fetchData()
    }, [userType])

    if (!data) {
        return <div className="text-center mt-10">불러오는 중...</div>
    }

    return (
        <Layout>
            <div className="mt-8">
                <DetailBox
                    mode="setting"
                    title="계정 정보"
                    leftstring={["이름", "이메일", "전화번호"]}
                    rightstring={[
                        data.name ?? "이름 없음",
                        data.email ?? "이메일 없음",
                        (data.phone ?? "")
                            .replace(/\D/g, "")
                            .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
                    ]}
                    linkurl={[
                        "", // 이름은 클릭 불가
                        "/mypage/update/email",
                        "/mypage/update/phone",
                    ]}
                />
            </div>
        </Layout>
    )
}

export default UserAccountInfo
