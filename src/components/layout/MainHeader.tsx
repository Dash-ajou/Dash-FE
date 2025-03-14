import Icon from "../common/icons/Icon";

const MainHeader = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white pt-4">
      <span className="pl-8">
        <Icon name="logoicon" size={32} />
      </span>
      <div className="flex gap-4 pr-8">
        <Icon name="bellicon_fill" size={28} />
        <Icon name="personicon_fill" size={25} />
      </div>
    </header>
  );
};

export default MainHeader;
