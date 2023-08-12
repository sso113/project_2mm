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
`;

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const Detail = styled.div`
  position: relative;
  top: 80px;
  left: 25px;
`;

const InputGroupcode = styled.input`
  position: relative;
  width: 300px;
  height: 50px;
  left: 22px;
  top: 70px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 20px;
  padding-left: 15px;

  ::placeholder {
    color: #7c7c7c;
  }
`;

const CopyBtn = styled.div`
  position: relative;
  top: 100px;
  left: 60px;
`;

const NextBtn = styled.button`
  position: relative;
  top: 400px;
  left: 22px;
  background: transparent;
  border: none;
`;

const Signup4_new = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup3_new"); // Go back to the previous page
  };

  const handleNextClick = () => {
    navigate("/signup5_new"); // Use navigate to transition to another page
  };
  return (
    <Container>
      <Back onClick={handleBackClick}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} alt="Back" />
      </Back>
      <Detail>
        <img src={`${process.env.PUBLIC_URL}/images/detail_code.svg`} />
      </Detail>
      <SubTitle>
        <img src={`${process.env.PUBLIC_URL}/images/subtitle_invite2.svg`} />
      </SubTitle>
      <InputGroupcode placeholder="여기에 초대코드 뜸"></InputGroupcode>
      <CopyBtn>
        <img src={`${process.env.PUBLIC_URL}/images/copybtn.svg`} />
      </CopyBtn>
      <NextBtn onClick={handleNextClick}>
        {" "}
        {/* Call handleNextClick */}
        <img src={`${process.env.PUBLIC_URL}/images/nextbtn.svg`} />
      </NextBtn>
    </Container>
  );
};

export default Signup4_new;
