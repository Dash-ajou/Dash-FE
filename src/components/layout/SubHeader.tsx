import Icon from "../common/icons/Icon";
import { useLocation, useNavigate } from "react-router-dom";
import pageTitles from "../../constants/pageTitles";

const SubHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const pageTitle = pageTitles[location.pathname] || "페이지 없음"; // 없는 경우 기본값 설정

    return (
      <header className="w-full flex items-center px-6 py-5 bg-white">
        <Icon name="arrowicon_line_left" onClick={() => navigate(-1)} />
        <h1 className="ml-4 text-2xl font-bold text-black">{pageTitle}</h1>
      </header>
    );
  };

  export default SubHeader;
