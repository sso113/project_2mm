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

const InputGroupname = styled.input`
  position: relative;
  width: 300px;
  height: 50px;
  left: 22px;
  top: 55px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 20px;
  padding-left: 15px;

  ::placeholder {
    color: #7c7c7c;
  }
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

const OneContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  bottom: 480px;
  left: 30px;
  border-radius: 25px; /* 반지름을 width와 height의 절반으로 설정 */
  overflow: hidden;
`;

const OneImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const One_Name = styled.div`
  position: relative;
  width: 36px;
  height: 38px;
  bottom: 510px;
  left: 100px;
  color: #000;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const NextBtn = styled.div`
  position: relative;
  bottom: 350px;
  left: 22px;
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
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/group/${invitecode}`).then((response) => {
      setGroup(response.data);
      setPostLoading(false);
    });
  }, []);

  const groupdetail = ""; // 여기에서 groupdetail을 적절한 값으로 설정해주세요.
  const groupname = ""; // 여기에서 groupname을 적절한 값으로 설정해주세요.

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
        <ImageUpload>
          <img src={`${process.env.PUBLIC_URL}/images/image_upload.svg`} />
        </ImageUpload>
        <GroupName>{group && group.name}화목한 우리 가족</GroupName>
        <GroupDetail>{groupdetail}세상에서 제일 멋진 우리 집</GroupDetail>
        <OneContainer>
          <OneImage
            src={`${process.env.PUBLIC_URL}/images/one.svg`}
            alt="One"
          />
        </OneContainer>
        <One_Name>김서진</One_Name>
      </WhiteBox>
      <NextBtn onClick={handleNextClick}>
        <img src={`${process.env.PUBLIC_URL}/images/nextbtn.svg`} alt="Next" />
      </NextBtn>
    </Container>
  );
};

export default Signup2_old;
