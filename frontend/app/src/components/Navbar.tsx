import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";

import bbapimg from "/assets/images/bbap.png";
import bbaphomeimg from "/assets/images/bbaphome.png";
import bell from "/assets/images/bell.png";

import useNoticeStore from "../store/noticeStore";

interface NavBarProps {
  goBack: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ goBack }) => {
  const { noticeList } = useNoticeStore();
  const location = useLocation();

  // MainPage에서만 타이틀과 알람 표시
  const isMainPage = location.pathname === "/main";

  // NavBar의 높이 상태를 저장하기 위한 state
  const [navBarHeight, setNavBarHeight] = useState(0);
  const navBarRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    // NavBar의 실제 높이를 측정하여 상태를 업데이트
    if (navBarRef.current) {
      setNavBarHeight(navBarRef.current.clientHeight);
    }
  }, []);

  return (
    <>
      <div
        ref={navBarRef}
        className="fixed top-0 left-0 right-0 z-10 bg-primary-color text-black p-3 flex justify-between items-center overflow-hidden"
      >
        <div className="text-left flex items-center space-x-4">
          {/* MainPage가 아닐 때 뒤로가기와 홈 버튼 표시 */}
          {!isMainPage && (
            <>
              <button onClick={goBack}>
                <FiArrowLeft className="text-3xl cursor-pointer text-white" />
              </button>
              <Link to="/main">
                <img
                  src={bbaphomeimg}
                  className="text-2xl cursor-pointer h-8"
                />
              </Link>
            </>
          )}
        </div>
        <div
          className="text-3xl font-hyemin-bold text-white"
          style={{ transform: `translateX(${isMainPage ? "12px" : "-28px"})` }} // 이 부분을 수정하여 MainPage 여부에 따라 위치 조정
        >
          <img src={bbapimg} className="h-8" />
        </div>

        <div className="text-right">
          <Link to="/notification">
            {" "}
            <img src={bell} className="text-2xl cursor-pointer h-8" />
            {noticeList.length > 0 && (
              <span className="absolute top-4 right-3.5 block h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
            )}
          </Link>
        </div>
      </div>
      {/* 빈 div를 사용하여 NavBar 아래에 공간을 생성 */}
      <div style={{ height: `${navBarHeight}px` }}></div>
    </>
  );
};

export default NavBar;
