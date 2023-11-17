import React from "react";
import s from "./ErrorText.module.css";

function ErrorText({isShow = false, children}) {
    return (
        <>
            {isShow ? (
              <div className={s["error_value"]}>{children}</div>
            ) : null}
        </>
    )
}

export default React.memo(ErrorText);