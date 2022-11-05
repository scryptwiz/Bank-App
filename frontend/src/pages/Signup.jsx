import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

export const Signup = () => {
  const { enqueueSnackbar } = useSnackbar()
// const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  }
  const onSubmit = values => {
    console.log(values);
    axios.post('http://localhost:2600/api/user/signup', values).then(res=> {
      if (res.data.status) {
        console.log('res', res, 'resData', res.data);
        enqueueSnackbar(`${res.data.message}`, { variant: "success" });
      }else {
        console.log('error');
        enqueueSnackbar(`${res.data.message}`, { variant: "error" });
      }
    }).catch((err => {
      console.log(err);
    }))
  }
  const validationSchema = Yup.object({

    username: Yup.string().min(2).max(26).required('Field is Required'),
    email: Yup.string().email('Invalid Email Format').required('Field is Required'),
    password: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least 1 uppercase, 1 lower case, 1 number, 1 special character and must be up to or more than 8").required("Field is required"),
    confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password must match').required('Field is required')
  })
  const formik  = useFormik({
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
                  Create account
                </h1>
                <form onSubmit={formik.handleSubmit} className='flex flex-col gap-1'>
                  <div>
                    <label className="text-gray-700 text-sm font-semibold">Username</label>
                    <input
                      className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                      placeholder="Jane Doe" name='username' onChange={formik.handleChange} value={formik.values.username}
                    />
                    { formik.touched.username && formik.errors.username && <small className='text-red-500'>{formik.errors.username}</small> }
                  </div>
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
                  <div>
                    <label className="text-gray-700 text-sm font-semibold">Confirm Password</label>
                    <input
                      className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                      placeholder="***************"
                      type="password" name='confirmpassword' onChange={formik.handleChange} value={formik.values.confirmpassword}
                    />
                    { formik.touched.confirmpassword && formik.errors.confirmpassword && <small className='text-red-500'>{formik.errors.confirmpassword}</small> }
                  </div>
                  <div className="flex mt-6 text-sm">
                    <label className="flex items-center dark:text-gray-400">
                      <input
                        type="checkbox"
                        className="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                      />
                      <span className="ml-2">
                        I agree to the
                        <span className="underline">privacy policy</span>
                      </span>
                    </label>
                  </div>
                <button type='submit'
                  className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Create account
                </button>
                </form>

                <hr className="mt-6 mb-3" />

                <p className="text-center">
                  <Link
                    className="text-sm font-medium text-purple-600 hover:underline"
                    to="/login"
                  >
                    Already have an account? Login
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
