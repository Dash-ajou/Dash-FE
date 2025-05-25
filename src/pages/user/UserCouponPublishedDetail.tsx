//TO-DO: 쿠폰 철회하기 눌렀을 때 로직 추가 필요
//TO-DO: 다운로드 API 연동 필요
//TO-DO: 필터 기능 연동 필요
//TO-DO: 스크롤 수정

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/module/Statistics";
import FilterGroup from "../../components/unit/user-coupon-detail/FilterGroup";
import ListBlock from "../../components/common/ListBlock";
import CommonButton from "../../components/common/button/CommonButton";
import SlideUpModal from "../../components/common/modal/SlideUpModal";
import BasicModal from "../../components/common/modal/BasicModal";
import { fetchCouponByIssueID, CouponByIssueID } from "../../services/userCouponByIssueIdService";

const UserCouponPublishedDetail = () => {
  const location = useLocation();
  const { issueId } = location.state || {};

  const [couponList, setCouponList] = useState<CouponByIssueID[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("전체");

  useEffect(() => {
    const fetchCouponDetailByIssueId = async () => {
      if (!issueId) return;

      try {
        const data = await fetchCouponByIssueID(issueId);
        setCouponList(data.data);
      } catch (err) {
        console.error("쿠폰 상세 정보 조회 실패", err);
      }
    };
    fetchCouponDetailByIssueId();
  }, [issueId]);

  const statusToText = (status: string): "Issued" | "Registered" | "Used" | undefined => {
    switch (status) {
      case "REGISTERABLE":
        return "Issued";
      case "USABLE":
        return "Registered";
      case "USED":
        return "Used";
      case "EXPIRED":
        return "Used";
      default:
        return undefined;
    }
  };

  const filteredCoupons = couponList.filter((coupon) => {
    if (selectedFilter === "전체") return true;
    if (selectedFilter === "사용완료")
      return coupon.status === "USED" || coupon.status === "EXPIRED";
    if (selectedFilter === "등록완료") return coupon.status === "USABLE";
    if (selectedFilter === "미등록") return coupon.status === "REGISTERABLE";
    return true;
  });

  return (
    <>
      <Layout>
        <div className="relative w-full max-w-[430px] mx-auto min-h-screen">
          <div className=" mt-2 mb-12">
            <Statistics
              mode="detailstat"
              published={couponList.length}
              registered={couponList.filter((c) => c.status === "USABLE").length}
              used={couponList.filter((c) => c.status === "USED").length}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="text-black text-xl font-bold leading-normal">필터</div>
              <FilterGroup
                onFilterClick={() => setIsFilterOpen(true)}
                onDownloadClick={() => setIsModalOpen(true)}
              />
            </div>
            <div className="w-full h-0 mx-auto outline outline-1 outline-offset-[-0.50px] outline-gray-300" />
          </div>

          <div
            className="flex flex-col overflow-y-auto scrollbar-none px-5 mt-3"
            style={{ maxHeight: "calc(100vh - 415px)" }}>
            {filteredCoupons.map((coupon) => (
              <ListBlock
                key={coupon.id}
                type="coupstatuslist"
                coupnum={`#${coupon.id}`}
                coupstatus={statusToText(coupon.status)}
                name={coupon.partner.business_name}
              />
            ))}
          </div>
        </div>
      </Layout>

      <div className="absolute bottom-1 w-full py-4 bg-white shadow-[0px_-2px_4px_0px_rgba(0,0,0,0.10)]">
        <div className="flex px-9">
          <CommonButton
            size="large"
            isActive
            mode="fill"
            color="red"
            detail={{
              label: "쿠폰 철회하기",
              position: "left",
              icon: "trashicon_white",
            }}
            onClick={() => setIsBasicModalOpen(true)}
          />
        </div>
      </div>

      <BasicModal
        mode="YesNo"
        isOpen={isBasicModalOpen}
        title="미등록 쿠폰을 철회할까요?"
        onClose={() => setIsBasicModalOpen(false)}
        onConfirm={() => {
          // TO-DO: 철회 로직 추가
          setIsBasicModalOpen(false);
        }}
      />

      <SlideUpModal isOpen={isModalOpen} height="auto" onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4">
          <CommonButton
            size="large"
            isActive
            mode="fill"
            color="blue"
            detail={{ label: "csv 다운로드", position: "none" }}
          />
          <CommonButton
            size="large"
            isActive
            mode="fill"
            color="blue"
            detail={{ label: "png 다운로드", position: "none" }}
          />
        </div>
      </SlideUpModal>

      <SlideUpModal isOpen={isFilterOpen} height="auto" onClose={() => setIsFilterOpen(false)}>
        <div>
          <p className="text-black text-base font-bold mb-6">사용상태</p>
        </div>
        <div className="flex flex-wrap gap-4 mb-10">
          {["전체", "사용완료", "등록완료", "미등록"].map((label) => (
            <div
              key={label}
              className={`cursor-pointer px-2 py-1 text-xs font-normal rounded-3xl border ${
                selectedFilter === label
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-black border-gray-200"
              }`}
              onClick={() => setSelectedFilter(label)}>
              {label}
            </div>
          ))}
        </div>

        <div className="flex w-full justify-between gap-4">
          <CommonButton
            size="large"
            isActive
            mode="line"
            color="blue"
            detail={{ label: "초기화", position: "none" }}
            onClick={() => setSelectedFilter("전체")}
          />
          <CommonButton
            size="large"
            isActive
            mode="fill"
            color="blue"
            detail={{ label: "필터 적용", position: "none" }}
            onClick={() => setIsFilterOpen(false)}
          />
        </div>
      </SlideUpModal>
    </>
  );
};

export default UserCouponPublishedDetail;
