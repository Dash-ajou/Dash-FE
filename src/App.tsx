import React from 'react';
import MenuButton from './components/unit/user-main/MenuButton'; // MenuButton 컴포넌트 경로에 맞게 수정 필요

const App: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 p-4 bg-gray-100 min-h-screen">
      {/* 각 type에 맞는 MenuButton 렌더링 */}
      <MenuButton type="newcoup" />
      <MenuButton type="gift" />
      <MenuButton type="couprequest" />
      <MenuButton type="couplist" />
    </div>
  );
};

export default App;
