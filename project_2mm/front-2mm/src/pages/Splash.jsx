import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 30px auto;
  max-width: 375px;
  height: 740px;
  background: white;
  border: 1px solid gray;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 0rem;
    padding-right: 0rem;
  }
`;
const TextBox1 = styled.div`
  position: relative;
  margin-top: 100px;
  margin-left: 15px;
`;
const TextBox2 = styled.div`
  position: relative;
  margin-left: 15px;
`;
const CenterZone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 290px;
`;
const DesignImg = styled.div`
  position: absolute;
  bottom: 80px;
`;

const KakaoBtn = styled.div`
  position: relative;
  margin-bottom: 7px;
`;
const SignUpBtn = styled.div`
  position: relative;
  margin-bottom: 7px;
`;
const LoginBtn = styled.div`
  position: relative;
`;

const Splash = () => {
  const navigate = useNavigate();

  const gotoKakao = () => {
    // 추후 설정
    //navigate("/");
  };
  const gotoSignUp = () => {
    navigate("/Membership");
  };
  const gotoLogin = () => {
    navigate("/Login");
  };

  return (
    <Container>
      <TextBox1>
        <img src={`${process.env.PUBLIC_URL}/images/2mmexplain.svg`} />
      </TextBox1>
      <TextBox2>
        {" "}
        <img src={`${process.env.PUBLIC_URL}/images/2mm.svg`} />
      </TextBox2>
      <DesignImg>
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={`${process.env.PUBLIC_URL}/images/splashdesign.svg`}
        />
      </DesignImg>
      <CenterZone>
        <KakaoBtn onClick={gotoKakao}>
          <img src={`${process.env.PUBLIC_URL}/images/kakaobtn_s.svg`} />
        </KakaoBtn>
        <SignUpBtn onClick={gotoSignUp}>
          <img src={`${process.env.PUBLIC_URL}/images/signupbtn_s.svg`} />
        </SignUpBtn>
        <LoginBtn onClick={gotoLogin}>
          <img src={`${process.env.PUBLIC_URL}/images/loginbtn_s.svg`} />
        </LoginBtn>
      </CenterZone>
    </Container>
  );
};

export default Splash;
