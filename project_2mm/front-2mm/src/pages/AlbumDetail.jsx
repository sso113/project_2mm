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
  left: 165px;
`;

const BoxZone = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  position: relative;
  width: 375px;
  height: 390px;
  margin-top: 20px;
  margin-bottom: 30px;
`;
const DownloadBtn = styled.button`
  position: relative;
  width: 330px;
  height: 100px;
  background: none;
  border: none;
`;

const AlbumDetail = () => {
  const navigate = useNavigate();

  const gotoBack = () => {
    navigate("/Album");
  };

  return (
    <Container>
      <Back onClick={gotoBack}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} />
      </Back>
      <Title>
        <img src={`${process.env.PUBLIC_URL}/images/albumtitle.svg`} />
      </Title>
      <BoxZone>
        {/* 불러온 이미지 넣어줘야 함 */}
        <Box>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={`${process.env.PUBLIC_URL}/images/familypic.svg`}
          />
        </Box>
        {/* 다운로드 버튼 누르면 다운로드 정보 post로 넘겨줘야 함 */}
        <DownloadBtn>
          {" "}
          <img src={`${process.env.PUBLIC_URL}/images/downbtn.svg`} />
        </DownloadBtn>
      </BoxZone>
    </Container>
  );
};

export default AlbumDetail;
