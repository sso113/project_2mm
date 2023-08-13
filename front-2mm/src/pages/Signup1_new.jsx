import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const SubTitle = styled.div`
  position: relative;
  top: 25px;
  left: 25px;
`;

const InputGroupname = styled.input`
  position: relative;
  width: 300px;
  height: 50px;
  left: 22px;
  top: 55px;
  border-radius: 7px;
  border: 1.5px solid #0085ff;
  font-size: 20px;
  padding-left: 15px;

  ::placeholder {
    color: #7c7c7c;
  }
`;

const NextBtn = styled.button`
  position: relative;
  top: 470px;
  left: 22px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Signup1_new = () => {
  const navigate = useNavigate(); // useNavigate 초기화
  const [name, setName] = useState("");

  console.log(localStorage.getItem("token"));

  const onSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        "http://127.0.0.1:8000/update-password/",
        { name: name },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      console.log("Data:", response.data);

      navigate("/signup2_new");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePasswdChange = (e) => {
    setName(e.target.value);
  };

  return (
    <Container>
      <Back>
        <img src={`${process.env.PUBLIC_URL}/images/backbtn.svg`} />
      </Back>
      <SubTitle>
        <img src={`${process.env.PUBLIC_URL}/images/subtitle_groupname.svg`} />
      </SubTitle>
      <InputGroupname
        placeholder="예)화목한 우리 가족"
        value={name}
        onChange={handlePasswdChange}
      />
      <NextBtn onClick={onSubmit}>
        {" "}
        <img src={`${process.env.PUBLIC_URL}/images/nextbtn.svg`} />
      </NextBtn>
    </Container>
  );
};

export default Signup1_new;
