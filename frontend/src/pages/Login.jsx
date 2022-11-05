import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Login = () => {

  const initialValues = {
    email: '',
    password: ''
  }
  const onSubmit = values => {
    console.log(values);
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email Format').required('Field is Required'),
    password: Yup.string().required("Field is required"),
  })
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  })
  return (
    <div>
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div
        className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800"
      >
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto bg-purple-600 md:w-6/12 flex justify-center items-center">
            <img
              className="w-5/6 h-full"
              src="../assets/images/account.svg"
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-3/5">
            <div className="w-full">
              <h1
                className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
              >
                Welcome Back
              </h1>
              <form className='flex flex-col gap-1' onSubmit={formik.handleSubmit}>
                <div>
                  <label className="text-gray-700 text-sm font-semibold">Email</label>
                  <input
                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                    placeholder="Jane Doe" name='email' onChange={formik.handleChange} value={formik.values.email}
                    />
                    { formik.touched.email && formik.errors.email && <small className='text-red-500'>{formik.errors.email}</small> }
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold">Password</label>
                  <input
                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                    placeholder="***************"
                    type="password" name='password' onChange={formik.handleChange} value={formik.values.password}
                  />
                    { formik.touched.password && formik.errors.password && <small className='text-red-500'>{formik.errors.password}</small> }
                </div>
              <button type='submit'
                className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Log in
              </button>
              </form>

              <hr className="mt-6 mb-3" />
              <p className="text-center">
                <Link
                  className="text-sm font-medium text-purple-600 hover:underline"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </p>
              <p className="text-center">
                <Link
                  className="text-sm font-medium text-purple-600 hover:underline"
                  to="/signup"
                >
                  Don't have an account? Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
