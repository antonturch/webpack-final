import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TEMPLATE_ERROR_STRING } from "@modules/registration/Registration";
import "../registration/index.scss";

export const Login = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required(`${TEMPLATE_ERROR_STRING} email`),
    password: Yup.string().required(`${TEMPLATE_ERROR_STRING} password`),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="registration-and-login-form-container">
      <h1 className="registration-and-login-form__title">
        Sign in to continue
      </h1>
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
            onChange={formik.handleChange}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="error-message">{formik.errors.password}</span>
          ) : null}
        </div>

        <button
          className="registration-and-login-form__submit-btn"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
