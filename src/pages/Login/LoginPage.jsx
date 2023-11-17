import { useFormik } from "formik";
import s from "./LoginPage.module.css";
import MyInput from "../../Components/MyInput/MyInput";
import ErrorText from "../../ui/ErrorText/ErrorText";
import MyButton from "../../ui/MyButton/MyButton";
import Modal from "../../Components/Modal/Modal";
import { useCallback, useState } from "react";

export default function Login() {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState("");

  const handleModalClose = useCallback(() => {
    setIsShowModal(false);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: ({ email, password }) => {
      const errors = {};
      if (!email) {
        errors.email = "Поле обязательно";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "Неверный формат почты";
      }
      if (!password) {
        errors.password = "Поле обязательно";
      } else if (password.length < 6) {
        errors.password = "Палорь должен быть не менее 6 символов";
      }
      return errors;
    },
    onSubmit: async ({email, password}) => {
      const values = {
        email: email.toLocaleLowerCase(),
        password
      }
      setServerErrorMessage("");
      try {
        setIsLoading(true);
        const result = await fetch("https://example.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await result.json();
        if (!result.ok) {
          if (data?.message) {
            setServerErrorMessage(data.message);
          }
          return;
        }
        setIsShowModal(true);
      } catch (error) {
        console.log("Ошибка запроса");
      } finally{
        setIsLoading(false);
      }
    },
  });

  return (
    <div className={s["container"]}>
      <div className={s["container__form-block"]}>
        <form onSubmit={formik.handleSubmit} className={s["form-block__form"]} noValidate>
          <h2 className={s["form__header"]}>Вход</h2>
          <div className={s["form__inputbox"]}>
            <MyInput
              type="email"
              autoComplete="email"
              labelName={"Почта"}
              {...formik.getFieldProps("email")}
              icon={s["mail_icon"]}
            />
            <ErrorText isShow={formik.touched.email && formik.errors.email}>{formik.errors.email}</ErrorText>
          </div>
          <div className={s["form__inputbox"]}>
            <div className={s["inputbox"]}>
              <MyInput
                type="password"
                labelName={"Пароль"}
                className={s["inputbox__input"]}
                {...formik.getFieldProps("password")}
                icon={s["password_icon"]}
              />
            </div>
            <ErrorText isShow={formik.touched.password && formik.errors.password}>{formik.errors.password}</ErrorText>
          </div>
          <MyButton isLoading={isLoading} type="submit">Войти</MyButton>
          <ErrorText isShow={!!serverErrorMessage}>{serverErrorMessage}</ErrorText>
        </form>
      </div>
      <Modal isShow={isShowModal} handleModalClose={handleModalClose}>Вы успешно вошли в систему!</Modal>
    </div>
  );
}
