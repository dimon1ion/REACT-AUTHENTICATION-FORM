import React from "react";
import s from "./MyButton.module.css";

function MyButton({ children, isLoading = false, ...props }) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={s["button"]}
    >
      {isLoading ? "Загрузка..." : children}
    </button>
  );
}

export default React.memo(MyButton);
