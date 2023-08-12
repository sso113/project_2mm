import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

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

const Whitebox = styled.div`
  position: relative;
  top: 50px;
  left: 5px;
`;

const ImageUpload = styled.div`
  position: relative;
  width: 450px;
  height: 242px;
  bottom: 345px;
  left: 25px;
  flex-shrink: 0;
  border-radius: 16px;
`;

const GroupName = styled.div`
  position: relative;
  width: 127px;
  height: 22px;
  left: 41px;
  top: 424px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 100;
  font-size: 18px;
  line-height: 22px;
  color: #181818;
`;

const NextBtn = styled.button`
  position: relative;
  bottom: 90px;
  left: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Signup5_new = () => {
  const location = useLocation();
  const [groupname, setGroupname] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const groupnameFromLocation = location.state
      ? location.state.group_name
      : "";
    if (groupnameFromLocation) {
      setGroupname(groupnameFromLocation);
    }
  }, [location.state]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/signup4_new");
  };

  const handleClick = () => {
    navigate("/Home");
  };

  return (
    <Container>
      <Back onClick={handleBackClick}>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} alt="Back" />
      </Back>
      <SubTitle>
        <img
          src={`${process.env.PUBLIC_URL}/images/subtitle_group.svg`}
          alt="SubTitle"
        />
      </SubTitle>
      <Whitebox>
        <img
          src={`${process.env.PUBLIC_URL}/images/whitebox.svg`}
          alt="WhiteBox"
        />
        <ImageUpload>
          <label htmlFor="imageUploadInput">
            <img
              src={`${process.env.PUBLIC_URL}/images/image_upload.svg`}
              alt="ImageUpload"
            />
          </label>
          <input
            type="file"
            id="imageUploadInput"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
        </ImageUpload>
        <GroupName>{groupname}</GroupName>
      </Whitebox>
      <NextBtn onClick={handleClick}>
        <img src={`${process.env.PUBLIC_URL}/images/startbtn.svg`} alt="Next" />
      </NextBtn>
    </Container>
  );
};

export default Signup5_new;
