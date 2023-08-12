import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  left: 130px;
`;

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const InputDate = styled.input`
  position: relative;
  width: 300px;
  height: 108px;
  left: 22px;
  top: 35px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 20px;
  padding-left: 15px;

  ::placeholder {
    color: #7c7c7c;
  }
`;

const SubTitle2 = styled.div`
  position: relative;
  top: 70px;
  left: 25px;
`;

const InputDate2 = styled.input`
  position: relative;
  width: 300px;
  height: 108px;
  left: 22px;
  top: 80px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 20px;
  padding-left: 15px;

  ::placeholder {
    color: #7c7c7c;
  }
`;

const NewBtn = styled.div`
  position: relative;
  top: 260px;
  left: 22px;
`;

const Date_Write = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/Date_List");
  };

  return (
    <Container>
      <Back>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} />
      </Back>
      <Title>
        <img src={`${process.env.PUBLIC_URL}/images/date_plus.svg`} />
      </Title>
      <SubTitle>
        <img src={`${process.env.PUBLIC_URL}/images/subtitle_ask (2).svg`} />
      </SubTitle>
      <InputDate></InputDate>
      <SubTitle2>
        <img src={`${process.env.PUBLIC_URL}/images/subtitle_write.svg`} />
      </SubTitle2>
      <InputDate2></InputDate2>
      <NewBtn onClick={onClick}>
        <img src={`${process.env.PUBLIC_URL}/images/newbtn.svg`} />
      </NewBtn>
    </Container>
  );
};

export default Date_Write;
