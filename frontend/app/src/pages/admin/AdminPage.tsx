import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import poscoimg from "/assets/images/posco.png";
import EmployeeSearch from "../../components/admin/filter";
import Approve from "../../components/admin/approval";
import { useUserStore } from "../../store/userStore";

const today = new Date();
const year = today.getFullYear().toString().slice(-2);
const month = today.getMonth();

const LeftNav = styled.div`
  width: 20rem;
  height: 100vh;
  background-color: #035381;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-content: center;
  align-items: center;
  justify-items: center;
  justify-content: space-between;
  // 1024px 이하에서 너비 조정
  @media (max-width: 1024px) {
    width: 16rem; // 화면이 1024px 이하일 때 너비를 25vw로 변경
  }

  // 768px 이하에서 너비 조정
  @media (max-width: 768px) {
    width: 14rem; // 화면이 768px 이하일 때 너비를 33vw로 변경
  }

  // 480px 이하에서 너비 조정
  @media (max-width: 480px) {
    width: 10rem; // 화면이 480px 이하일 때 너비를 50vw로 변경
  }
`;

const RightSide = styled.div`
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
`;

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tabParam = query.get("tab");
  const empNo = useUserStore((state) => state.empNo);

  const [activeTab, setActiveTab] = useState<"확인" | "승인">(
    tabParam === "승인" ? "승인" : "확인"
  );

  const handleTabClick = (tab: "확인" | "승인") => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    useUserStore.getState().reset();
    navigate("/admin");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <LeftNav className="flex-auto">
        <div>
          <button
            className="font-hyemin-bold bg-[#F2F2F2] rounded-md mt-24
            p-4 px-10 text-[20px] sm:text-[20px] md:text-[22px] lg:text-[25px]
            w-48 sm:w-44 md:w-52 lg:w-full"
            onClick={() => handleTabClick("확인")}
          >
            확인
          </button>
          <button
            className="font-hyemin-bold bg-[#F2F2F2] rounded-md m-5 ml-0 
             p-4 text-[20px] sm:text-[20px] md:text-[22px] lg:text-[25px]
             w-44 sm:w-44 md:w-52 lg:w-full"
            onClick={() => handleTabClick("승인")}
          >
            승인
          </button>
        </div>
        <div>
          <div className=" font-hyemin-bold text-[18px] text-white">
            관리자 사번:{empNo}
          </div>
          <button
            className=" font-hyemin-bold text-[18px] bg-[#EFF7FF] text-black w-36 p-4 rounded-md m-5"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </LeftNav>
      <RightSide>
        <img src={poscoimg} alt="Login Logo" className="fixed top-3 right-4" />
        {/* 조회 탭 눌렀을 경우 */}
        {activeTab === "확인" && (
          <div
            style={{
              marginLeft: "23rem",
              marginTop: "1%",
            }}
          >
            <div className=" font-hyemin-bold text-[40px] mb-3">확인</div>
            <div className=" font-hyemin-bold text-[30px]">사원검색</div>
            <div className=" font-hyemin-bold ">
              <EmployeeSearch />
            </div>
          </div>
        )}
        {/* 결재 탭 눌렀을 경우 */}
        {activeTab === "승인" && (
          <div
            style={{
              marginLeft: "23rem",
              marginTop: "1%",
            }}
          >
            <div className=" font-hyemin-bold text-[40px]  mb-3">
              {year}년 {month}월 승인
            </div>
            <div className=" font-hyemin-bold text-[30px]">사원검색</div>
            <div className=" font-hyemin-bold">
              <Approve />
            </div>
          </div>
        )}
      </RightSide>
    </div>
  );
};

export default AdminPage;
