import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {TEMPLATEERRORSTRING} from '@Modules/Registration/Registration';
import '../Registration/index.scss'


export const Login = () => {
  const formik = useFormik({
    initialValues: {email: '', password: '',},
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required(`${TEMPLATEERRORSTRING} email`),
      password: Yup.string().required(`${TEMPLATEERRORSTRING} password`),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="container">
      <h1>Sign in to continue</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
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
            className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="error">{formik.errors.password}</span>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
