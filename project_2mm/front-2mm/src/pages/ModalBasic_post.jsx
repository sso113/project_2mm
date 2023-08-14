import React from "react";
import PropTypes from "prop-types";
import styles from "./ModalBasic_post.module.css";
import { useNavigate } from "react-router-dom";

function ModalBasic({ setModalOpen }) {
  const navigate = useNavigate();

  // 모달 끄기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.rewrite}
        src={`${process.env.PUBLIC_URL}/images/rewrite.svg`}
        alt="rewrite"
      />
      <img
        className={styles.delete}
        src={`${process.env.PUBLIC_URL}/images/delete.svg`}
        alt="delete"
      />
      <img
        className={styles.cancel}
        src={`${process.env.PUBLIC_URL}/images/cancel.svg`}
        alt="cancel"
        onClick={closeModal} // 모달 닫기
      />
    </div>
  );
}

ModalBasic.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};

export default ModalBasic;
