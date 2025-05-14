import Layout from "../../components/layout/Layout";
import { useState } from "react";
import Icon from "../../components/common/icons/Icon";
import ListBlock from "../../components/common/ListBlock";

const UserUsedCoupon = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Layout>
      <div>
        <div className="w-full px-4 py-2 mt-3 mb-8 bg-white rounded-md outline outline-1 outline-zinc-300 flex items-center gap-3">
          <Icon name="search_gray" size={18} />
          <input
            type="text"
            placeholder="쿠폰 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-base text-neutral-800 placeholder-neutral-400 bg-transparent focus:outline-none"
          />
        </div>
        <ListBlock type="datetimelist" />
      </div>
    </Layout>
  );
};

export default UserUsedCoupon;
