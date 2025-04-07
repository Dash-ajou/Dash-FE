import { useNavigate } from "react-router-dom";
import Icon from "../common/icons/Icon";

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between items-center bg-white pt-4">
      <span className="pl-8">
        <Icon name="logoicon" size={32} onClick={() => navigate("/usermain")} />
      </span>
      <div className="flex gap-4 pr-8">
        <Icon
          name="bellicon_fill"
          size={28}
          className="cursor-pointer"
          onClick={() => navigate("/usernotification")}
        />
        <Icon
          name="personicon_fill"
          size={25}
          className="cursor-pointer"
          onClick={() => navigate("/usermypage")}
        />
      </div>
    </header>
  );
};

export default MainHeader;
