import Icon from "../common/icons/Icon";

const MainHeader = () => {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-white shadow-md">
        <span className="pl-8"><Icon name="logoicon"/></span>
      <div className="flex gap-4">
        <Icon name="bellicon_fill"/>
        <Icon name="personicon_fill"/>
      </div>
    </header>
  );
};

export default MainHeader;
