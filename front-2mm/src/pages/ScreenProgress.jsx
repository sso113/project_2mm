import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  margin: 30px auto;
  max-width: 375px;
  height: 740px;
  background: white;
  border: 1px solid gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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

const ButtonContainer = styled.div`
  position: absolute;
  margin-top: 600px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StartBtn = styled.button`
  position: relative;
  display: flex;
  width: 154px;
  height: 78px;
  padding: 25px 35px 23px 35px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ started }) =>
    started
      ? "#d6d6d6"
      : "linear-gradient(180deg, #388afc 0%, #4552e5 100%)"}; /*started 상태에 따라 배경색 변경 */
  color: ${({ started }) => (started ? "#3D3D3D" : "#fff")};
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
`;

const StopBtn = styled.button`
  position: relative;
  display: flex;
  width: 154px;
  height: 78px;
  padding: 25px 35px 23px 35px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${({ started }) =>
    started
      ? "linear-gradient(180deg, #388afc 0%, #4552e5 100%)"
      : "#d6d6d6"}; /* started 상태에 따라 배경색 변경 */
  color: ${({ started }) =>
    started ? "#fff" : "#3d3d3d"}; /*started 상태에 따라 글자색 변경 */
  font-family: SUIT;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: none;
`;

const ScreenProgress = () => {
  const navigate = useNavigate();

  const gotoBack = () => {
    navigate("/Screenshare");
  };
  const videoElem = useRef(null);
  const logElem = useRef(null);
  const [displayMediaStream, setDisplayMediaStream] = useState(null);

  //화면 공유 시작 상태
  // 버튼 색상 변경을 위한 state
  const [started, setStarted] = useState(false);

  const displayMediaOptions = {
    video: {
      cursor: "always",
    },
    audio: false,
  };

  const startCapture = async () => {
    logElem.current.innerHTML = "";
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      videoElem.current.srcObject = stream;
      videoElem.current.onloadedmetadata = () => {
        videoElem.current.play();
      };
      setDisplayMediaStream(stream);
      setStarted(true); /*화면 공유 시작 상태 설정 */
    } catch (err) {
      if (err.name === "NotAllowedError") {
        console.error("User denied permission");
      } else {
        console.error("Error: " + err);
      }
    }
  };

  const stopCapture = () => {
    if (displayMediaStream) {
      const tracks = displayMediaStream.getTracks();
      tracks.forEach((track) => track.stop());
      videoElem.current.srcObject = null;
      setDisplayMediaStream(null);
      dumpOptionsInfo();
      setStarted(false); /*화면 공유 종료 상태 설정 */
    }
  };

  const dumpOptionsInfo = () => {
    if (displayMediaStream) {
      const videoTrack = displayMediaStream.getVideoTracks()[0];
      console.info("Track settings:");
      console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
      console.info("Track constraints:");
      console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
    }
  };

  return (
    <Container>
      <Back onClick={gotoBack}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} />
      </Back>
      <video ref={videoElem} autoPlay width="375px" height="740px"></video>
      <br />
      <ButtonContainer>
        <StartBtn onClick={startCapture} started={started}>
          시작하기
        </StartBtn>{" "}
        {/*started 상태 전달 */}
        <StopBtn onClick={stopCapture} started={started}>
          종료하기
        </StopBtn>{" "}
        {/*started 상태 전달 */}
      </ButtonContainer>
      <br />
      <pre ref={logElem}></pre>
    </Container>
  );
};

export default ScreenProgress;
