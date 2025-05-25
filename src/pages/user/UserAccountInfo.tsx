import Layout from "../../components/layout/Layout";
import { useState, useEffect } from "react";
import DetailBox from "../../components/common/DetailBox";
import { fetchUserAccountInfo, UserAccountInfoData } from "../../services/userAccountInfoService";

const UserAccountInfo = () => {
  const [data, setData] = useState<UserAccountInfoData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchUserAccountInfo();
      if (res.success) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div className="text-center mt-10">불러오는 중...</div>;
  }

  return (
    <Layout>
      <div className="mt-8">
        <DetailBox
          mode="setting"
          title="계정 정보"
          leftstring={["이름", "이메일", "전화번호"]}
          rightstring={[
            data.general_name || "이름 없음",
            data.general_email,
            data.general_phone.replace(/\D/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
          ]}
          linkurl={[
            "", // 이름은 클릭 불가
            "/mypage/update/email",
            "/mypage/update/phone",
          ]}
        />
      </div>
    </Layout>
  );
};

export default UserAccountInfo;
