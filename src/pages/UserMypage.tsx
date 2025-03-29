import CommonButton from "../components/common/button/CommonButton";
import DetailBox from "../components/common/DetailBox";
import CouponCount from "../components/unit/user-mypage/CouponCount";

const UserMypage = () => {
    return (
        <div className="mx-7">
            <div className="text-black font-bold text-2xl mt-11 mb-4">
                <p>ㅇㅇ님 안녕하세요</p>
            </div>
            <div className="flex justify-center gap-3">
                <div className="w-full">
                    <CouponCount type="available" />
                </div>
                <div className="w-full">
                    <CouponCount type="used" />
                </div>
            </div>
            <div className="flex flex-col mt-7 gap-4">
                <DetailBox
                    mode="setting"
                    title="내 정보"
                    leftstring={["계정 정보", "비밀번호 변경하기"]}
                />
                <DetailBox
                    mode="setting"
                    title="고객센터"
                    leftstring={["공지사항", "FAQ", "문의하기"]}
                />
            </div>
            <div className="flex flex-col items-center justify-center mt-7">
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="black"
                    detail={{ label: "로그아웃", position: "none" }}
                />
                <CommonButton
                    size="mini"
                    isActive={true}
                    mode="text"
                    color="red"
                    detail={{ label: "회원 탈퇴", position: "none" }}
                />
            </div>
        </div>
    );
};

export default UserMypage;
