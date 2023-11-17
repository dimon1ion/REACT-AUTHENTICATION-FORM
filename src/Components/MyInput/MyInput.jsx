import React from "react";
import s from "./MyInput.module.css";

function MyInput({labelName, icon, ...props}) {
  return (
    <div className={s["inputbox"]}>
      <input
        {...props}
        placeholder=""
        className={`${s["inputbox__input"]} ${icon ? s["inputbox__input-pleft"] : ""} ${props.className}`}
      />
      <label className={`${s["inputbox__label"]} ${icon ? s["inputbox__label-pleft"] : ""}`}>{labelName}</label>
      <i className={`${s["inputbox__icon"]} ${icon ? icon : ""}`}/>
    </div>
  );
}

export default React.memo(MyInput);
