//TO-DO: 쿠폰 철회하기 눌렀을 때 로직 추가 필요
//TO-DO: 다운로드 API 연동 필요
//TO-DO: 필터 기능 연동 필요
//TO-DO: 스크롤 수정

import { useMemo } from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Layout from "../../components/layout/Layout";
import Statistics from "../../components/module/Statistics";
import FilterGroup from "../../components/unit/user-coupon-detail/FilterGroup";
import ListBlock from "../../components/common/ListBlock";
import CommonButton from "../../components/common/button/CommonButton";
import SlideUpModal from "../../components/common/modal/SlideUpModal";
import BasicModal from "../../components/common/modal/BasicModal";
import { fetchCouponByIssueID, CouponByIssueID } from "../../services/userCouponByIssueIdService";
import { fetchPublishedCoupon, PublishedCoupon } from '../../services/userPublishedCouponService'
import { cancelCouponRequest } from '../../services/VendorCouponCancleRequestService.ts'

const UserCouponPublishedDetail = () => {
  const { issueId } = useParams<{ issueId: string }>();
  const numericIssueId = Number(issueId);
  const navigate = useNavigate();

  const [couponList, setCouponList] = useState<CouponByIssueID[]>([]);
  const [publishedCoupon, setPublishedCoupon] = useState<PublishedCoupon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [basicModalConfig, setBasicModalConfig] = useState ({ mode: "YesNo", title: "미등록 쿠폰을 철회할까요?",});

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const coupons = await fetchCouponByIssueID(numericIssueId);
        if (isMounted) setCouponList(coupons);

        const publishedList = await fetchPublishedCoupon({ issue_id: numericIssueId });
        const matched = publishedList.find(p => p.issue_id === numericIssueId);
        if (matched) setPublishedCoupon(matched);

      } catch (err) {
        console.error("쿠폰 상세 정보 조회 실패", err);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [numericIssueId]);


  const statistics = useMemo(() => {
    const issued = couponList.length;
    const registered = couponList.filter((c) => c.status === "USABLE").length;
    const unregistered = couponList.filter((c) => c.status === "REGISTERABLE").length;
    const used = couponList.filter((c) => c.status === "USED" || c.status === "EXPIRED").length;
    const published = publishedCoupon?.issue_count || issued;
    const remaining = published - used;

    return { published, registered, unregistered, used, remaining };
  }, [couponList, publishedCoupon]);

  const filteredCoupons = useMemo(() => {
    return couponList.filter((coupon) => {
      if (selectedFilter === "전체") return true;
      if (selectedFilter === "사용완료") return coupon.status === "USED" || coupon.status === "EXPIRED";
      if (selectedFilter === "등록완료") return coupon.status === "USABLE";
      if (selectedFilter === "미등록") return coupon.status === "REGISTERABLE";
      return true;
    });
  }, [couponList, selectedFilter]);

  const statusToText = (status: string): "Issued" | "Registered" | "Used" | undefined => {
    switch (status) {
      case "REGISTERABLE": return "Issued";
      case "USABLE": return "Registered";
      case "USED":
      case "EXPIRED": return "Used";
      default: return undefined;
    }
  };

  return (
    <>
      <Layout>
        <div className="relative w-full max-w-[430px] mx-auto min-h-screen">
          <div className=" mt-2 mb-12">
            <Statistics
              mode="detailstat"
              published={statistics.published}
              registered={statistics.registered}
              used={statistics.used}
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
                key={coupon.coupon_id}
                type="coupstatuslist"
                coupnum={`#${coupon.coupon_id}`}
                coupstatus={statusToText(coupon.status)}
                name={"알 수 없음"}
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
            onClick={() => {
              if (publishedCoupon?.status === "ENABLE") {
                  setIsBasicModalOpen(true);
                  setBasicModalConfig({ mode: "OnlyYes", title: "먼저 쿠폰을 일시정지 처리해 주세요."});
            } else {
                setIsBasicModalOpen(true);
                setBasicModalConfig({
                  mode: "YesNo",
                  title: "미등록 쿠폰을 철회할까요?"
                });
              }
            }
            }
          />
        </div>
      </div>

      <BasicModal
        mode={basicModalConfig.mode as "YesNo" | "OnlyYes"}
        isOpen={isBasicModalOpen}
        title={basicModalConfig.title}
        onClose={() => setIsBasicModalOpen(false)}
        onConfirm={async () => {
          if (basicModalConfig.mode === "YesNo") {
            try {
              const response = await cancelCouponRequest(numericIssueId);

              if (response.status === "SUCCESS") {
                navigate(`/user/coupon/published/${numericIssueId}/cancel`);
              } else {
                throw new Error("쿠폰 철회 요청 실패");
              }
            } catch (err) {
              console.log("쿠폰 철회 요청 실패:", err);
              setBasicModalConfig({
                mode: "OnlyYes",
                title: "쿠폰 철회 요청에 실패했습니다. 다시 시도해 주세요.",
              });
              }
            } else {
            setIsBasicModalOpen(false);
          }
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
