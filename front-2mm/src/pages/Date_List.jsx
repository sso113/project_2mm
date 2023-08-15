import React, { useState } from "react";
import styled from "styled-components";
import ModalBasic_date from "./ModalBasic_date";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  margin: 30px 0;
  max-width: 375px;
  height: 740px;
  background: white;
  border: 1px solid gray;
  margin: 30px auto;
  overflow-y: scroll; /* 세로 스크롤 유지 */
  overflow-x: hidden; /* 가로 스크롤 숨김 */

  /* 스크롤바 스타일 지정 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
    border-radius: none;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Back = styled.div`
  position: relative;
  margin-top: 17px;
  margin-left: 15px;
  background-color: transparent;
  border: none;
`;

const Year = styled.div`
  position: relative;
  width: 45px;
  height: 18px;
  left: 172px;
  top: 30px;
`;

const Month = styled.div`
  position: relative;
  width: 60px;
  height: 38px;
  left: 172px;
  top: 40px;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 700;
  font-size: 30px;
  line-height: 38px;
  color: #0057ff;
`;

const Pass = styled.button`
  position: relative;
  width: 45px;
  height: 18px;
  left: 120px;
  top: 10px;
  background-color: transparent;
  border: none;
`;

const Next = styled.button`
  position: relative;
  width: 45px;
  height: 18px;
  left: 180px;
  top: 10px;
  background-color: transparent;
  border: none;
`;

const Date_Whitebox = styled.div`
  position: relative;
  width: 350px;
  height: 138px;
  left: calc(50% - 350px / 2);
  top: 30px;

  background: #ffffff;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
`;

const DateText = styled.div`
  position: relative;
  width: 200px;
  height: 18px;
  left: 20px;
  top: 17px;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 18px;

  color: #000000;
`;

const TitleLink = styled(Link)`
  position: relative;
  width: 200px;
  height: 44px;
  left: 18px;
  top: 30px;
  display: block;
  text-decoration: none;
  color: #0057ff;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  line-height: 44px;
`;

const Memo = styled.div`
  position: relative;
  width: 180px;
  height: 18px;
  left: 18px;
  top: 40px;

  font-family: "SUIT";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;

  color: #202020;
`;

const More = styled.div`
  position: relative;
  top: -60px;
  left: 300px;
`;

const DateItemLink = styled(Link)`
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: inherit;
`;

const DateItemWhitebox = styled(Date_Whitebox)`
  margin-top: 20px;
`;

const PlusBtn = styled.div`
  position: absolute;
  width: 45px;
  height: 18px;
  left: 260px;
  top: 630px;
`;

const Date_List = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMonth = parseInt(queryParams.get("month")) || 7;
  const newDate = queryParams.get("newDate");

  // 기존에 저장된 일정 리스트 데이터 (데이터가 없다면 빈 배열로 초기화)
  const existingDateList = [
    {
      id: 1,
      date: "7월 12일 수요일",
      title: "가족 모임",
      memo: "장소: 잠실 석촌호수",
    },
    // 기존에 저장된 리스트 아이템들 추가
  ];

  const gotoBack = () => {
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    navigate(`/Date_List?month=${prevMonth}`);
  };

  const gotoNext = () => {
    navigate("/Schedule1");
  };

  // 추가된 일정을 query parameter에서 추출하여 리스트에 추가
  const updatedDateList = newDate
    ? [
        ...existingDateList,
        {
          id: existingDateList.length + 1,
          date: newDate,
          title: "추가된 일정",
          memo: "장소: 추가된 장소",
        },
      ]
    : existingDateList;

  return (
    <Container>
      <Back onClick={gotoBack}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} alt="Back" />
      </Back>
      <Year>
        <img src={`${process.env.PUBLIC_URL}/images/year.svg`} alt="Year" />
      </Year>
      <Month>{`${currentMonth}월`}</Month>
      <Pass>
        <img src={`${process.env.PUBLIC_URL}/images/pass.svg`} alt="Pass" />
      </Pass>
      <Next>
        <img src={`${process.env.PUBLIC_URL}/images/next.svg`} alt="Next" />
      </Next>
      {/* 기존의 일정 Whitebox */}
      <Date_Whitebox>
        <DateText>{existingDateList[0].date}</DateText>
        <TitleLink to="/Date_Detail/1">가족 모임</TitleLink>
        <Memo>장소: 잠실 석촌호수</Memo>
        <More onClick={() => setModalOpen(true)}>
          <img src={`${process.env.PUBLIC_URL}/images/more.svg`} alt="More" />
        </More>
        {modalOpen && (
          <>
            <div
              className="modal-overlay"
              onClick={() => setModalOpen(false)}
            />
            <ModalBasic_date
              setModalOpen={setModalOpen}
              closeModal={() => setModalOpen(false)}
            />
          </>
        )}
      </Date_Whitebox>
      {/* 추가된 리스트 아이템들 */}
      {/* 추가된 리스트 아이템들 */}
      {updatedDateList.map((item) => (
        <DateItemLink key={item.id} to={`/Date_Detail/${item.id}`}>
          <DateItemWhitebox>
            <DateText>{item.date}</DateText>
            <TitleLink>{item.title}</TitleLink>
            <Memo>{item.memo}</Memo>
            <More onClick={() => setModalOpen(true)}>
              <img
                src={`${process.env.PUBLIC_URL}/images/more.svg`}
                alt="More"
              />
            </More>
            {modalOpen && (
              <>
                <div
                  className="modal-overlay"
                  onClick={() => setModalOpen(false)}
                />
                <ModalBasic_date
                  setModalOpen={setModalOpen}
                  closeModal={() => setModalOpen(false)}
                />
              </>
            )}
          </DateItemWhitebox>
        </DateItemLink>
      ))}
      <PlusBtn onClick={gotoNext}>
        <img src={`${process.env.PUBLIC_URL}/images/plusbtn.svg`} />
      </PlusBtn>
    </Container>
  );
};

export default Date_List;
