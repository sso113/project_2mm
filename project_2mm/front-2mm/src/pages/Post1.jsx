import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ModalBasic_post from "./ModalBasic_post";

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

const ScrollBox = styled.div`
  height: 695px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    /* WebKit 브라우저의 스크롤바를 숨김 */
    width: 0;
    background: transparent;
  }
`;

const PostBox = styled.div`
  position: relative;
  height: 540px;
`;

const Profile = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 25px; /* 반지름을 width와 height의 절반으로 설정 */
  overflow: hidden; /* 이미지가 테두리를 넘어가지 않도록 설정 */
  top: 20px;
  left: 20px;
`;

const Name = styled.div`
  position: relative;
  top: -25px;
  left: 85px;
  color: #000;
  font-family: SUIT;
  font-size: 17px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
`;

const Date = styled.div`
  position: relative;
  top: -20px;
  left: 88px;
  color: #353535;
  font-family: SUIT;
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const More = styled.div`
  position: relative;
  top: -60px;
  left: 320px;
`;

const PostDetail = styled.div`
  position: relative;
  top: -25px;
  left: 20px;
  color: #353535;
  font-family: SUIT;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const PostImg = styled.div`
  position: relative;
  margin-top: -10px;
  width: 375px;
  height: 330px;
  overflow: hidden;
`;

const Heart = styled.div`
  position: relative;
  top: 20px;
  left: 10px;
  cursor: pointer;
`;

const Comment = styled.div`
  position: relative;
  top: -10px;
  left: 50px;
`;

const DivisionBar = styled.div`
  position: relative;
`;

const WriteBtn = styled.div`
  position: relative;
  margin-top: -140px;
  margin-left: 240px;
  z-index: 3; // 이미지가 다른 이미지들 위에 나타날 수 있도록 높은 값을 부여
`;

const Post1 = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const onClickBack = () => {
    navigate("/GroupHome");
  };

  const onClickBtn = () => {
    navigate("/Post2");
  };

  const onClickComment = () => {
    navigate("/Post3");
  };

  const onClickHeart = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <Container>
      <Back onClick={onClickBack}>
        <img src={`${process.env.PUBLIC_URL}/images/back_btn.svg`} alt="back" />
      </Back>
      <ScrollBox>
        <PostBox>
          <Profile>
            <img
              src={`${process.env.PUBLIC_URL}/images/imgupload_post1.svg`}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
            />
          </Profile>
          <Name>김서진</Name>
          <Date>7시간전</Date>
          <More onClick={() => setModalOpen(true)}>
            <img src={`${process.env.PUBLIC_URL}/images/more.svg`} alt="more" />
          </More>
          {modalOpen && (
            <>
              <div
                className="modal-overlay"
                onClick={() => setModalOpen(false)}
              />
              <ModalBasic_post
                setModalOpen={setModalOpen}
                closeModal={() => setModalOpen(false)}
              />
            </>
          )}
          <PostDetail>푸바오 실물 폼 미쳤다!!</PostDetail>
          <PostImg>
            <img
              src={`${process.env.PUBLIC_URL}/images/pubao.jpg`}
              alt="PostImg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
            />
          </PostImg>
          <Heart onClick={onClickHeart}>
            <img
              src={`${process.env.PUBLIC_URL}/images/${
                isLiked ? "heart.svg" : "empty_heart.svg"
              }`}
              alt={isLiked ? "heart" : "empty_heart"}
            />
          </Heart>
          <Comment onClick={onClickComment}>
            <img
              src={`${process.env.PUBLIC_URL}/images/comment.svg`}
              alt="comment"
            />
          </Comment>
          <DivisionBar>
            <img
              src={`${process.env.PUBLIC_URL}/images/division.svg`}
              alt="comment"
            />
          </DivisionBar>
        </PostBox>

        <PostBox>
          <Profile>
            <img
              src={`${process.env.PUBLIC_URL}/images/imgupload_post1.svg`}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
            />
          </Profile>
          <Name>김서진</Name>
          <Date>7시간전</Date>
          <More>
            <img src={`${process.env.PUBLIC_URL}/images/more.svg`} alt="more" />
          </More>
          <PostDetail>푸바오 실물 폼 미쳤다!!</PostDetail>
          <PostImg>
            <img
              src={`${process.env.PUBLIC_URL}/images/pubao.jpg`}
              alt="PostImg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
            />
          </PostImg>
          <Heart>
            <img
              src={`${process.env.PUBLIC_URL}/images/empty_heart.svg`}
              alt="empty_heart"
            />
          </Heart>
          <Comment>
            <img
              src={`${process.env.PUBLIC_URL}/images/comment.svg`}
              alt="comment"
            />
          </Comment>
          <DivisionBar>
            <img
              src={`${process.env.PUBLIC_URL}/images/division.svg`}
              alt="comment"
            />
          </DivisionBar>
        </PostBox>

        <PostBox>
          <Profile>
            <img
              src={`${process.env.PUBLIC_URL}/images/imgupload_post1.svg`}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
            />
          </Profile>
          <Name>김서진</Name>
          <Date>7시간전</Date>
          <More>
            <img src={`${process.env.PUBLIC_URL}/images/more.svg`} alt="more" />
          </More>
          <PostDetail>푸바오 실물 폼 미쳤다!!</PostDetail>
          <PostImg>
            <img
              src={`${process.env.PUBLIC_URL}/images/pubao.jpg`}
              alt="PostImg"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // 이미지 크기와 픽셀 사용 방식 설정
            />
          </PostImg>
          <Heart>
            <img
              src={`${process.env.PUBLIC_URL}/images/empty_heart.svg`}
              alt="empty_heart"
            />
          </Heart>
          <Comment>
            <img
              src={`${process.env.PUBLIC_URL}/images/comment.svg`}
              alt="comment"
            />
          </Comment>
          <DivisionBar>
            <img
              src={`${process.env.PUBLIC_URL}/images/division.svg`}
              alt="comment"
            />
          </DivisionBar>
        </PostBox>
      </ScrollBox>
      <WriteBtn onClick={onClickBtn}>
        <img
          src={`${process.env.PUBLIC_URL}/images/post1_btn.svg`}
          alt="post1_btn"
        />
      </WriteBtn>
    </Container>
  );
};

export default Post1;
