import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./index.scss";

export const TEMPLATE_ERROR_STRING = "Please enter your";

export const Registration = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required(`${TEMPLATE_ERROR_STRING} email`),
    password: Yup.string().required(`${TEMPLATE_ERROR_STRING} password`),
    confirmPassword: Yup.string().required(`Please confirm your password`),
    firstName: Yup.string().required(`${TEMPLATE_ERROR_STRING} first name`),
    lastName: Yup.string().required(`${TEMPLATE_ERROR_STRING} last name`),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="registration-and-login-form-container">
      <h1 className="registration-and-login-form__title">
        Sign up to continue
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

        <div className="form-row-item">
          <label className="form-row-title" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            className="form-row-input"
            {...(formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "input-error"
              : "")}
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="error-message">
              {formik.errors.confirmPassword}
            </span>
          ) : null}
          {formik.values.confirmPassword !== formik.values.password ? (
            <span className="error-message">Passwords are different</span>
          ) : null}
        </div>

        <div className="form-row-item">
          <label className="form-row-title" htmlFor="firstName">
            First name
          </label>
          <input
            className="form-row-input"
            {...(formik.touched.firstName && formik.errors.firstName
              ? "input-error"
              : "")}
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <span className="error-message">{formik.errors.firstName}</span>
          ) : null}
        </div>

        <div className="form-row-item">
          <label className="form-row-title" htmlFor="lastName">
            Last name
          </label>
          <input
            className="form-row-input"
            {...(formik.touched.lastName && formik.errors.lastName
              ? "input-error"
              : "")}
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="error-message">{formik.errors.lastName}</span>
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
