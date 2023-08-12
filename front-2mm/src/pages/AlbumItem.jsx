// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";

// const PicBox = styled.div`
//   position: relative;
//   //   width: 170px;
//   //   height: 170px;
//   margin-left: 7px;
//   margin-bottom: 3px;
//   border-radius: 6px;
//   background: gray;
//   display: inline-block;
// `;

// // 해당 그룹의 이미지 불러오기.. get할때 그룹으로 get. 전체 말고
// //postID는 전달받은 것
// const AlbumItem = ({ postID }) => {
//   const navigate = useNavigate();

//   const goAlbumDetail = () => {
//     navigate(`/AlbumDetail`); // user_id, post_id read에 전달. 원래는 뒤에 ${postID}
//   };
//   return (
//     <>
//       <PicBox onClick={goAlbumDetail}>
//         {" "}
//         <img
//           style={{ width: "170px", height: "170px", objectFit: "cover" }}
//           src={`${process.env.PUBLIC_URL}/images/familypic.svg`}
//         />
//         {/* <img
//         src={post && post.image}
//         style={{ display: "block", margin: "auto", width: "300px"  filter: "brightness(60%)"}}
//       /> -> 이건 연동할 때 이미지 */}
//         ,
//       </PicBox>
//     </>
//   );
// };

// export default AlbumItem;
