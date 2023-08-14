import { useState, useRef } from "react";
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
  left: 150px;
`;

const Subtitle1 = styled.div`
  position: relative;
  top: 15px;
  left: 24px;
`;

const ImgUpload = styled.div`
  position: relative;
  top: 30px;
  left: 22px;
  width: 332px;
  height: 210px;
  cursor: pointer; /* 마우스 커서를 손가락 모양으로 변경 */
`;

const UploadInput = styled.input`
  display: none; /* 실제 파일 업로드 인풋을 숨김 */
`;

const Subtitle2 = styled.div`
  position: relative;
  top: 55px;
  left: 24px;
`;

const InputText = styled.textarea`
  position: relative;
  width: 313px;
  height: 90px;
  left: 22px;
  top: 67px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 20px;
  padding-left: 15px;
  padding-top: 5px;
`;

const NextBtn = styled.div`
  position: relative;
  top: 150px;
  left: 24px;
`;

const Post2 = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const inputRef = useRef(null);

  // back_btn 이동
  const onClickBack = () => {
    navigate("/Post1");
  };

  // 글 작성 완성해서 다음 페이지로 넘어감
  const onClickBtn = () => {
    navigate("/Post1");
  };

  const handleImageClick = () => {
    inputRef.current.click(); // 파일 업로드 인풋 클릭
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0]; // 선택한 파일 가져오기
    if (file) {
      const imageUrl = URL.createObjectURL(file); // 선택한 파일을 이미지 URL로 변환
      setSelectedImage(imageUrl); // 이미지 URL 설정
    }
  };

  return (
    <Container>
      <Back onClick={onClickBack}>
        <img src={`${process.env.PUBLIC_URL}/images/back_btn.svg`} alt="back" />
      </Back>
      <Title>
        <img
          src={`${process.env.PUBLIC_URL}/images/post2_title.svg`}
          alt="title"
        />
      </Title>
      <Subtitle1>
        <img
          src={`${process.env.PUBLIC_URL}/images/post2_subtitle.svg`}
          alt="Subtitle1"
        />
      </Subtitle1>
      <ImgUpload onClick={handleImageClick}>
        {/* 선택한 이미지가 있다면 해당 이미지를 보여줌 */}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          /* 선택한 이미지가 없다면 업로드 이미지 보여줌 */
          <img
            src={`${process.env.PUBLIC_URL}/images/imgupload_post2.svg`}
            alt="ImgUpload"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </ImgUpload>
      <UploadInput
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
      />
      <Subtitle2>
        <img
          src={`${process.env.PUBLIC_URL}/images/post2_subtitle2.svg`}
          alt="Subtitle2"
        />
      </Subtitle2>
      <InputText></InputText>
      <NextBtn onClick={onClickBtn}>
        <img
          src={`${process.env.PUBLIC_URL}/images/post2_btn.svg`}
          alt="NextBtn"
        />
      </NextBtn>
    </Container>
  );
};

export default Post2;
