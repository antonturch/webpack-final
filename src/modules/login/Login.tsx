import React, { ChangeEvent, ChangeEventHandler, FC, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TEMPLATE_ERROR_STRING } from "@modules/registration/Registration";
import { Context } from "../../index";
import "./index.scss";

const Login: FC = () => {
  const { store } = useContext(Context);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required(`${TEMPLATE_ERROR_STRING} email`),
    password: Yup.string().required(`${TEMPLATE_ERROR_STRING} password`),
  });

  const onChangePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    store.error = "";
  };
  const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    store.error = "";
  };

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const userData = JSON.stringify(values, null, 2);
      store.login(values.email, values.password);
    },
  });
  return store.isAuth ? (
    <div>
      <div>{store.user.firstName}</div>
      <div>{store.user.lastName}</div>
    </div>
  ) : (
    <div className="login-form-container">
      <h1 className="login-form__title">Sign in to continue</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row-item">
          <label className="form-row-title" htmlFor="email">
            Email
          </label>
          <input
            className="form-row-input"
            {...(formik.touched.email && formik.errors.email
              ? "input-error"
              : "")}
            id="email"
            name="email"
            type="email"
            onChange={onChangeEmailHandler}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="error-message">{formik.errors.email}</span>
          ) : null}
        </div>

        <div className="form-row-item">
          <label className="form-row-title" htmlFor="password">
            Password
          </label>
          <input
            className="form-row-input"
            {...(formik.touched.password && formik.errors.password
              ? "input-error"
              : "")}
            id="password"
            name="password"
            type="password"
            onChange={onChangePasswordHandler}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {store.error ||
          (formik.touched.password && formik.errors.password) ? (
            <span className="error-message">
              {formik.errors.password || store.error}
            </span>
          ) : null}
        </div>
        <div className="login-form__google-auth">
          <a
            className="login-form__google-auth--link"
            href={"http://localhost:5000/auth/google"}
          >
            Continue with Google
          </a>
        </div>
        <button className="login-form__submit-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default observer(Login);
