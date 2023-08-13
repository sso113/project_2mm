import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Container = styled.div`
  position: relative;
  margin: 30px 0;
  max-width: 375px;
  height: 740px;
  background: white;
  border: 1px solid gray;
  margin: 30px auto;

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
`;

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const WhiteBox = styled.div`
  position: relative;
  top: 25px;
  left: 5px;
`;

const ImageUpload = styled.div`
  position: relative;
  width: 318px;
  height: 242px;
  bottom: 530px;
  left: 25px;
  flex-shrink: 0;
  border-radius: 16px;
`;

const GroupName = styled.div`
  position: relative;
  width: 200px;
  height: 22px;
  left: 41px;
  bottom: 500px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #181818;
`;

const GroupDetail = styled.div`
  position: relative;
  width: 300px;
  height: 22px;
  left: 41px;
  bottom: 490px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 22px;
  color: #181818;
`;

const NextBtn = styled.div`
  position: relative;
  bottom: 440px;
  left: 22px;
`;
const BoxZone = styled.div`
  position: relative;
  bottom: 490px;
  width: 300px;
  height: 170px;
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
  height: 45px;
  display: flex;
  flex-direction: vertical;
  align-items: center;
  justify-content: left;
`;

const ProfileImg = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px; /* 반지름을 width와 height의 절반으로 설정 */
  overflow: hidden;
`;
const NameText = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 10px;
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Signup2_old = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup1_old");
  };

  const handleNextClick = () => {
    navigate("/signup3_old");
  };

  const location = useLocation();
  // 이전 페이지에서 전달된 초대코드
  const { invitecode } = location.state;
  console.log(invitecode);

  const [group, setGroup] = useState(null);
  const [users, setUsers] = useState([]); // 추가
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/group/${invitecode}`).then((response) => {
      setGroup(response.data);
      setUsers(response.data.user); // users배열에 저장 추가
      setPostLoading(false);
    });
  }, []);

  return (
    <Container>
      <Back onClick={handleBackClick}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} alt="Back" />
      </Back>
      <SubTitle>
        <img
          src={`${process.env.PUBLIC_URL}/images/subtitle_ask.svg`}
          alt="Subtitle"
        />
      </SubTitle>
      <WhiteBox>
        <img
          src={`${process.env.PUBLIC_URL}/images/whitebox2.svg`}
          alt="WhiteBox"
        />
        {/* 여기에 모임 이미지 떠야 함 */}
        <ImageUpload>
          <img src={group && group.profile} />
        </ImageUpload>
        <GroupName>{group && group.name} 하이</GroupName>
        <GroupDetail>{group && group.info} 하하이</GroupDetail>
        <BoxZone>
          {/* 사용자 목록 출력 */}
          {users.map((userObj) => (
            <Box key={userObj.user}>
              <ProfileImg>
                <img
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  src={userObj.profile}
                  alt={`Profile of ${userObj.user}`}
                />
              </ProfileImg>
              <NameText>{userObj.user}</NameText>
            </Box>
          ))}
        </BoxZone>
      </WhiteBox>
      <NextBtn onClick={handleNextClick}>
        <img src={`${process.env.PUBLIC_URL}/images/nextbtn.svg`} alt="Next" />
      </NextBtn>
    </Container>
  );
};

export default Signup2_old;
