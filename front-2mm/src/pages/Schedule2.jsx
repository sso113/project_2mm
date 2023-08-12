import React, { useState, useRef } from "react";
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
  left: 140px;
`;

const SubTitle = styled.div`
  position: relative;
  left: 20px;
  top: 15px;
`;

const VoiceBtn = styled.div`
  position: relative;
  top: 40px;
`;

const InputText = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 50px;
  width: 260px;
  padding: 30px 21px 80px 21px;
  border-radius: 6px;
  border: 1px solid #0057ff;
  top: 70px;
  left: 35px;

  color: #0057ff;
  font-family: SUIT;
  font-size: 50px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  text-align: center;
`;

const NextBtn = styled.div`
  position: relative;
  top: 310px;
  left: 20px;
`;

const Schedule2 = () => {
  const navigate = useNavigate();

  // back_btn 이동
  const onClickBack = () => {
    navigate("/Schedule1");
  };

  const onClickPost = () => {
    navigate("/Date_Write");
  };

  const [recognizedText, setRecognizedText] = useState(""); // 음성으로 변환된 텍스트 상태
  const [isRecognizing, setIsRecognizing] = useState(false); // 음성 인식 중 여부 상태
  const recognitionRef = useRef(null);

  // 음성 인식 코드
  const handleSpeechToText = () => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.lang = "ko-KR";
      recognitionRef.current.interimResults = false;
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        setIsRecognizing(true);
      };

      recognitionRef.current.onspeechend = () => {
        setIsRecognizing(false);
      };

      recognitionRef.current.onresult = (event) => {
        const recognizedText = event.results[0][0].transcript;
        setRecognizedText(recognizedText);
      };

      recognitionRef.current.start();
    } else {
      console.log("음성인식을 지원하지 않는 브라우저입니다.");
    }
  };

  const handleVoiceBtnClick = () => {
    handleSpeechToText();
  };

  return (
    <Container>
      <Back onClick={onClickBack}>
        <img src={`${process.env.PUBLIC_URL}/images/back_btn.svg`} alt="back" />
      </Back>
      <Title>
        <img
          src={`${process.env.PUBLIC_URL}/images/schedule1_title.svg`}
          alt="title"
        />
      </Title>
      <SubTitle>
        <img
          src={`${process.env.PUBLIC_URL}/images/schedule2_subtitle.svg`}
          alt="title"
        />
      </SubTitle>
      <VoiceBtn onClick={handleVoiceBtnClick}>
        <img
          src={`${process.env.PUBLIC_URL}/images/post3_btn.svg`}
          alt="post3_btn"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </VoiceBtn>
      <InputText
        value={recognizedText} // 음성으로 변환된 텍스트를 input 값으로 설정
        onChange={(event) => setRecognizedText(event.target.value)} // input 값이 변경될 때마다 상태 업데이트
      />
      <NextBtn onClick={onClickPost}>
        <img
          src={`${process.env.PUBLIC_URL}/images/schedule1_btn.svg`}
          alt="title"
        />
      </NextBtn>
    </Container>
  );
};

export default Schedule2;
