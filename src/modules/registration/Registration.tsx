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
    <div className="container">
      <h1>Sign up to continue</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={
              formik.touched.email && formik.errors.email ? "input-error" : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="error">{formik.errors.email}</span>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={
              formik.touched.password && formik.errors.password
                ? "input-error"
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "input-error"
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <span className="error">{formik.errors.confirmPassword}</span>
          ) : null}
          {formik.values.confirmPassword !== formik.values.password ? (
            <span className="error">Passwords are different</span>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="firstName">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={
              formik.touched.firstName && formik.errors.firstName
                ? "input-error"
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <span className="error">{formik.errors.firstName}</span>
          ) : null}
        </div>

        <div className="form-row">
          <label htmlFor="lastName">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={
              formik.touched.lastName && formik.errors.lastName
                ? "input-error"
                : ""
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <span className="error">{formik.errors.lastName}</span>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
