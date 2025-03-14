import MainHeader from "../components/layout/MainHeader";
import UserMainQRButton from "../components/unit/user-main/UserMainQRButtons";
import UserMainButtons from "../components/unit/user-main/UserMainButtons";

const UserMain = () => {
  // 나중에 API에서 받아올 값 (현재는 임시값)
  const qrCount = 4;

  return (
    <div>
      <MainHeader />
      <div className="mt-9 mb-7">
        <h1 className="text-black text-xl font-semibold pl-8">이름님의 쿠폰</h1>
      </div>
      <div className="mx-6">
        <UserMainQRButton qrCount={qrCount} />
      </div>
      <div className="mt-6 px-6">
        <UserMainButtons />
      </div>
    </div>
  );
};

export default UserMain;
