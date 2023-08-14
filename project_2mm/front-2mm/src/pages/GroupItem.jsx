import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 물방울 이미지 수정 필요 (누끼)

const Box = styled.div`
  position: relative;
  margin: auto;
  margin-bottom: -60px;
`;
const SettingBtn = styled.button`
  position: relative;
  top: -100px;
  left: 300px;
  width: 30px;
  height: 30px;
  background: url("${process.env.PUBLIC_URL}/images/settingbtn.svg");
  background-size: cover;
  border: none;
`;
const GroupTitle = styled.div`
  position: relative;
  top: -60px;
  left: 10px;
  color: #fff;
  font-family: SUIT;
  font-size: 22.34px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Personnel = styled.div`
  position: relative;
  top: -50px;
  left: 10px;
  color: #fff;
  font-family: SUIT;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

// 해당 그룹의 이미지 불러오기.. get할때 그룹으로 get. 전체 말고
//postID는 전달받은 것
const GroupItem = ({ postID }) => {
  const navigate = useNavigate();

  const goGroupHome = () => {
    navigate(`/GroupHome`); // user_id, post_id read에 전달. 원래는 뒤에 ${postID}
  };
  const goGroupDetail = () => {
    navigate(`/GroupDetail`); // user_id, post_id read에 전달. 원래는 뒤에 ${postID}
  };

  return (
    <>
      <Box onClick={goGroupHome}>
        {" "}
        <img
          style={{
            display: "block",
            margin: "auto",
            width: "346px",
            height: "175px",
            "border-radius": "17.76px",
            filter: "brightness(60%)",
          }}
          src={`${process.env.PUBLIC_URL}/images/exPic.png`}
        />
        {/* <img
        src={post && post.image}
        style={{ display: "block", margin: "auto", width: "300px"  filter: "brightness(60%)"}}
      /> -> 이건 연동할 때 이미지 */}
      </Box>
      <SettingBtn onClick={goGroupDetail}></SettingBtn>
      <GroupTitle>화목한 우리 가족</GroupTitle>
      <Personnel>인원 {"3"}명</Personnel>
    </>
  );
};

export default GroupItem;
