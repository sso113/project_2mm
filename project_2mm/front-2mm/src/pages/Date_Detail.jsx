import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  margin: 30px 0;
  max-width: 375px;
  height: 740px;
  background: white;
  border: 1px solid gray;
  margin: auto;

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

const Year = styled.div`
  position: relative;
  width: 45px;
  height: 18px;
  left: 172px;
  top: 30px;
`;

const Month = styled.div`
  position: relative;
  width: 45px;
  height: 18px;
  left: 172px;
  top: 40px;
`;

const Pass = styled.div`
  position: relative;
  width: 45px;
  height: 18px;
  left: 120px;
  top: 10px;
`;

const Next = styled.div`
  position: relative;
  width: 45px;
  height: 18px;
  left: 240px;
  bottom: 10px;
`;

const PlusBtn = styled.div`
  position: relative;
  width: 45px;
  height: 18px;
  left: 260px;
  top: 500px;
`;

const Date_Detail = () => {
  const navigate = useNavigate();

  const gotoNext = () => {
    navigate("/Schedule1");
  };

  return (
    <Container>
      <Back>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} />
      </Back>
      <Year>
        <img src={`${process.env.PUBLIC_URL}/images/year.svg`} />
      </Year>
      <Month>
        <img src={`${process.env.PUBLIC_URL}/images/month2.svg`} />
      </Month>
      <Pass>
        <img src={`${process.env.PUBLIC_URL}/images/pass.svg`} />
      </Pass>
      <Next>
        <img src={`${process.env.PUBLIC_URL}/images/next.svg`} />
      </Next>
      <PlusBtn onClick={gotoNext}>
        <img src={`${process.env.PUBLIC_URL}/images/plusbtn.svg`} />
      </PlusBtn>
    </Container>
  );
};

export default Date_Detail;
