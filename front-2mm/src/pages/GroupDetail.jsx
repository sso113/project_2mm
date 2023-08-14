import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 30px 0;
  max-width: 375px;
  height: 740px;
  background: #fff;
  border: 1px solid gray;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0rem;
    padding-right: 0rem;
  }
`;
const GroupImage = styled.div`
  position: relative;
  margin-top: 0px;
  line-height: normal;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0px 0px 17.76px 17.76px;
  width: 375px;
  height: 200px;
`;
const GroupTitle = styled.div`
  position: absolute;
  margin-top: 80px;
  display: inline-block;
  color: #fff;
  font-family: SUIT;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  background: none;
  text-align: center;
`;

const StickyBox = styled.div`
  position: sticky;
  top: 0;
`;
const BoxZone = styled.div`
  position: relative;
  height: 370px;
  margin: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
`;

const Box = styled.div`
  position: relative;
  margin-bottom: 10px;
  width: 340px;
  height: 70px;
  display: flex;
  flex-direction: vertical;
  align-items: center;
  justify-content: left;
`;

const ProfileImg = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  width: 50px;
  height: 50px;
  border-radius: 25px; /* 반지름을 width와 height의 절반으로 설정 */
  overflow: hidden;
`;
const NameText = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  color: #000;
  font-family: Inter;
  font-size: 15.188px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const AddText = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  color: #0057ff;
  font-family: Inter;
  font-size: 15.188px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
  background: none;
`;
const DeleteBtn = styled.button`
  position: relative;
  display: flex;
  width: 330px;
  height: 78px;
  margin-bottom: 15px;
  padding: 27px 90px 26px 90px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  border: 2px solid #0057ff;
  color: #0057ff;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  background: none;
`;

// 가족 구성원 컴포넌트
const FamilyBox = () => {
  return (
    <Box>
      <ProfileImg>
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={`${process.env.PUBLIC_URL}/images/familypic.svg`}
        />
      </ProfileImg>
      <NameText>박소정</NameText>
    </Box>
  );
};

const GroupDetail = () => {
  // 이 페이지에서 수정 삭제 구현해야 함
  const navigate = useNavigate();

  const gotoAddMember = () => {
    // 멤버 추가하기 페이지로 이동 (임시)
    // 여기로 이동하고 끝이 맞나? 아님 추가 페이지를 하나 더 만들어야 됨?
    navigate("/Signup4_new");
  };

  return (
    <Container>
      <StickyBox>
        <GroupImage>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              "border-radius": "0px 0px 17.76px 17.76px",
              filter: "brightness(60%)",
            }}
            src={`${process.env.PUBLIC_URL}/images/exPic.png`}
          />
          <GroupTitle>화목한 우리 가족</GroupTitle>
        </GroupImage>
      </StickyBox>
      <BoxZone>
        <FamilyBox></FamilyBox>
        <FamilyBox></FamilyBox>
        <FamilyBox></FamilyBox>
        <FamilyBox></FamilyBox>
        <FamilyBox></FamilyBox>
        <FamilyBox></FamilyBox>
        <Box onClick={gotoAddMember}>
          <ProfileImg>
            <img
              src={`${process.env.PUBLIC_URL}/images/addcircle.svg`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </ProfileImg>
          <AddText onClick={gotoAddMember}>멤버 추가하기</AddText>
        </Box>
      </BoxZone>
      <DeleteBtn>모임 삭제하기</DeleteBtn>
    </Container>
  );
};

export default GroupDetail;
