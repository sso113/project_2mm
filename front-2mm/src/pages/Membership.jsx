import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styled from "styled-components";

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

const Title = styled.div`
  position: relative;
  top: -23px;
  left: 150px;
`;

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const InputName = styled.input`
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

const NextBtn = styled.div`
  position: relative;
  top: 470px;
  left: 22px;
`;

const Membership = () => {
  const navigate = useNavigate();

  // back_btn 이동
  const onClickBtn = () => {
    navigate("/Membership2");
  };

  return (
    <Container>
      <Back>&nbsp;</Back>
      <Title>
        <img
          src={`${process.env.PUBLIC_URL}/images/title_text.svg`}
          alt="title"
        />
      </Title>
      <SubTitle>
        <img
          src={`${process.env.PUBLIC_URL}/images/subtitle_text.svg`}
          alt="subtitle"
        />
      </SubTitle>
      <InputName placeholder="홍길동"></InputName>
      <NextBtn onClick={onClickBtn}>
        <img src={`${process.env.PUBLIC_URL}/images/next_btn.svg`} alt="btn" />
      </NextBtn>
    </Container>
  );
};

export default Membership;
