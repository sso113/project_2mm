import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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

const Back = styled.button`
  position: relative;
  margin-top: 17px;
  margin-left: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const InputDetail = styled.input`
  position: relative;
  width: 300px;
  height: 161px;
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

const NextBtn = styled.button`
  position: relative;
  top: 330px;
  left: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Signup3_new = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup2_new");
  };

  const groupdetail = "여기에 그룹 설명을 입력하세요.";

  const handleNextClick = () => {
    navigate("/signup4_new", { state: { groupdetail } }); // groupdetail을 Signup4_new 페이지로 전달
  };

  return (
    <Container>
      <Back onClick={handleBackClick}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} alt="Back" />
      </Back>
      <SubTitle>
        <img
          src={`${process.env.PUBLIC_URL}/images/subtitle_detail.svg`}
          alt="SubTitle"
        />
      </SubTitle>
      <InputDetail placeholder="예)어쩌고저쩌고"></InputDetail>
      <NextBtn onClick={handleNextClick}>
        <img src={`${process.env.PUBLIC_URL}/images/nextbtn.svg`} alt="Next" />
      </NextBtn>
    </Container>
  );
};

export default Signup3_new;
