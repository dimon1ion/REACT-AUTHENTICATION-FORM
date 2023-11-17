import React, { useEffect, useRef } from "react";
import s from "./Modal.module.css";

function Modal({ isShow, handleModalClose, children }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleModalClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleModalClose]);

  return (
    <>
      {isShow && (
        <div className={s["modal"]}>
          <div className={s["modal-content"]} ref={modalRef}>
            <p>{children}</p>
            <button type="button" onClick={handleModalClose}>
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default React.memo(Modal);
