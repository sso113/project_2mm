import React from "react";
import PropTypes from "prop-types";
import styles from "./ModalBasic_date.module.css";

function ModalBasic({ setModalOpen }) {
  // 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  // 모달 밖을 클릭할 때 모달 닫기
  const handleOverlayClick = () => {
    closeModal();
  };

  // 모달 내부를 클릭해도 모달이 닫히지 않도록 처리
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.container} onClick={handleModalClick}>
        <img
          className={styles.rewrite}
          src={`${process.env.PUBLIC_URL}/images/rewrite (2).svg`}
          alt="rewrite"
        />
        <img
          className={styles.delete}
          src={`${process.env.PUBLIC_URL}/images/delete (3).svg`}
          alt="delete"
        />
        <img
          className={styles.cancel}
          src={`${process.env.PUBLIC_URL}/images/cancel (2).svg`}
          alt="cancel"
          onClick={closeModal} // 모달 닫기
        />
      </div>
    </div>
  );
}

ModalBasic.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
};

export default ModalBasic;
