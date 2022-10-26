import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../public/Header';
import { Sidebar } from '../public/Sidebar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const Profile = () => {
    const [title, setTitle] = useState('account-information');

    const initialValues = {
        old_pwrd: '',
        new_pwrd: '',
        confirm_new_pwrd: ''
    };

    const onSubmit = values => {
        console.log(values);
    };

    const validationSchema = Yup.object({
        old_pwrd: Yup.string().required('Field is required'),
        new_pwrd: Yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, "Password must contain at least 1 uppercase, 1 lower case, 1 number, 1 special character and must be up to or more than 8").required('Field is required'),
        confirm_new_pwrd: Yup.string().oneOf([Yup.ref('new_pwrd'), null], 'Password must match').required('Field is required')
    });

    const formik = useFormik(
        {
            initialValues,
            onSubmit,
            validationSchema
        }
    )

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
                <Header />
                <main className="flex flex-col gap-2 h-full overflow-y-auto dark:bg-black">
                    <div className='container px-4 md:px-6 py-8 mx-auto grid'>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4 dark:text-gray-200">Profile</h2>
                        {title == 'account-information' && <div>
                            <div className=' flex flex-col lg:flex-row gap-3 lg:gap-5 mb-5'>
                                <div className='flex flex-col'>
                                    <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('account-information')}>
                                        <img src="assets/images/user.png" class="w-4 h-fit" alt="" />
                                        <span className='text-sm text-purple-600'> Account Information</span>
                                    </div>
                                    <span className='w-28 rounded h-1 mt-1 bg-purple-600'></span>
                                </div>
                                <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('update-profile')}>
                                    <img src="assets/images/info.png" class="w-4 h-fit" alt="" />
                                    <span className='text-sm '> Update Profile</span>
                                </div>
                                <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('change-password')}>
                                    <img src="assets/images/replace.png" class="w-4 h-fit" alt="" />
                                    <span className='text-sm'> Change Password</span>
                                </div>
                            </div>
                            <div className='block lg:flex gap-6'>
                                <div className='mb-4'>
                                    <img
                                        class="object-cover w-28 h-28 rounded"
                                        src="https://pbs.twimg.com/profile_images/1551272248903966721/YXNtcsNT_400x400.jpg"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className='flex flex-col gap-3 lg:gap-4 leading-10 mb-5'>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Username:</p>
                                        <span className='dark:text-gray-200 text-sm'>Folajimi</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Email:</p>
                                        <span className='dark:text-gray-200 text-sm'>fola@gmail.com</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Phone Number:</p>
                                        <span className='dark:text-gray-200 text-sm'>07048502396</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>DOB:</p>
                                        <span className='dark:text-gray-200 text-sm'>September, 2022</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Country:</p>
                                        <span className='dark:text-gray-200 text-sm'>Nigeria</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>State:</p>
                                        <span className='dark:text-gray-200 text-sm'>Oyo State</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Address:</p>
                                        <span className='dark:text-gray-200 text-sm ml-10'>Ogbomoso, Oyo State, Nigeria.</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Gender:</p>
                                        <span className='dark:text-gray-200 text-sm'>Male</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Account Number:</p>
                                        <span className='dark:text-gray-200 text-sm'>6262629087</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Next Of Kin Name:</p>
                                        <span className='dark:text-gray-200 text-sm'>Folagbade</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Next Of Kin Phone Number:</p>
                                        <span className='dark:text-gray-200 text-sm'>08066573156</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Next Of Kin Address:</p>
                                        <span className='dark:text-gray-200 text-sm ml-10'>Ogbomoso, Oyo State, Nigeria</span>
                                    </div>
                                    <div className='flex lg:justify-between lg:gap-12 gap-4'>
                                        <p className='font-semibold dark:text-gray-300 text-sm w-36'>Next Of Kin Relationship:</p>
                                        <span className='dark:text-gray-200 text-sm'>Special Friend</span>
                                    </div>
                                </div>
                            </div>
                                    <button type='submit'
                                        className="block w-32 lg:ml-96 mt-6 lg:mt-0 px-4 py-2 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" onClick={() => setTitle('update-profile')}
                                    >
                                        Edit Profile
                                    </button>
                        </div>}
                        {title == 'update-profile' && <div>
                            <div className='mt-2 flex flex-col lg:flex-row gap-3 lg:gap-5 mb-5'>
                                <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('account-information')}>
                                    <img src="assets/images/user.png" class="w-4 h-fit" alt="" />
                                    <span className='text-sm '> Account Information</span>
                                </div>
                                <div className='flex flex-col gap-1 mt-2'>
                                    <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('update-profile')}>
                                        <img src="assets/images/info.png" class="w-4 h-fit" alt="" />
                                        <span className='text-sm text-purple-600'> Update Profile</span>
                                    </div>
                                    <span className='w-24 rounded h-1 bg-purple-600'></span>
                                </div>
                                <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('change-password')}>
                                    <img src="assets/images/replace.png" class="w-4 h-fit" alt="" />
                                    <span className='text-sm'> Change Password</span>
                                </div>
                            </div>
                            <div className="block lg:flex flex-col gap-6">
                                <div className='flex gap-8 mb-3'>
                                    <img
                                        class="object-cover w-24 h-24 rounded"
                                        src="https://pbs.twimg.com/profile_images/1551272248903966721/YXNtcsNT_400x400.jpg"
                                        alt=""
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <h2 className='dark:text-white font-semibold'>Folajimi</h2>
                                        <div className='flex gap-4 mt-2 mb-3'>
                                            <div className='bg-purple-600 w-20 h-10 py-2 px-3 flex items-center justify-center text-white rounded-md text-center gap-1'>
                                                <Link>Change</Link>
                                            </div>
                                            <div className='dark:text-gray-200 mt-2'><Link><span className='text-red-500'>Remove</span></Link></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <form action="">
                                        <div className='w-full xl:px-3 lg:flex gap-16'>
                                        <div className='lg:w-6/12 flex flex-col gap-3 mb-5'>
                                            <div className='flex gap-1 items-center'>
                                                <img src="assets/images/user.png" class="w-4 h-fit" alt="" />
                                                <h3 className='dark:text-gray-200 font-semibold'>Person Information</h3>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold">Username</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder="" name='username' value="Folajimi" disabled
                                                    type="text"
                                                />
                                            </div>
                                            <div className='flex w-full'>
                                                <div className='md:w-9/12 lg:w-9/12'>
                                                    <label className="text-gray-700 text-sm font-semibold">Email</label>
                                                    <input
                                                        className="block w-full mt-1 text-sm border px-3 py-2 rounded-l-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                        placeholder="" name='email' value="fola@gmail.com" disabled
                                                        type="email"
                                                    />
                                                    { formik.touched.email && formik.errors.email && <small className='text-red-500'>{formik.errors.email}</small> }
                                                </div>
                                                <div className='bg-purple-600 w-[47.8%] lg:w-5/12 h-[38px] text-sm px-3 py-2 text-white rounded-r-md text-center mt-7'>
                                                    <Link> Change Email</Link>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold">Phone Number</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder="" type="text" name='phone_no' value="07048502396"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold">DOB</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="date" name='date_of_birth'
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Country</label>
                                                <select name="" id="" className='block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500'>
                                                    <option value="">Nigeria</option>
                                                    <option value="">US</option>
                                                    <option value="">Ghana</option>
                                                    <option value="">Canada</option>
                                                    <option value="">France</option>
                                                    <option value="">Germany</option>
                                                    <option value="">Japan</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> State</label>
                                                <select name="" id="" className='block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500'>
                                                    <option value="">Oyo</option>
                                                    <option value="">Ondo</option>
                                                    <option value="">Ogun</option>
                                                    <option value="">Abia</option>
                                                    <option value="">Delta</option>
                                                    <option value="">Osun</option>
                                                    <option value="">Lagos</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Address</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="text" name='address' value="Ogbomos, Oyo STate, Nigeria."
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Gender</label>
                                                <div className='flex'>
                                                    <label htmlFor="">Male</label>
                                                    <input
                                                        className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 "
                                                        placeholder=""
                                                        type="radio" name='Male' checked
                                                    />
                                                    <label htmlFor="">Female</label>
                                                    <input
                                                        className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 "
                                                        placeholder=""
                                                        type="radio" name='female'
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold">Account Number</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="number" name='account_no' value="6262629087"
                                                />
                                            </div>
                                        </div>
                                        {/* Next Of Kin Information */}
                                        <div className='lg:w-6/12 flex flex-col gap-3'>
                                            <div className='flex gap-2 items-center'>
                                                <img src="assets/images/connection-to-account.png" class="w-5 h-fit" alt="" />
                                                <h3 className='dark:text-gray-200 font-semibold'>Next Of Kin Information</h3>
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Next Of Kin Name</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="text" name='next_of_kin_name' value="Folagbade"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Next Of Kin Phone Number</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="text" name='next_of_kin_pnone_no' value="08066573156"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Next Of Kin Address</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="text" name='next_of_kin_address' value="Ogbomoso, Oyo State, Nigeria"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-gray-700 text-sm font-semibold"> Next Of Kin Relationship</label>
                                                <input
                                                    className="block w-full mt-1 text-sm border px-3 py-2 rounded-md border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                                    placeholder=""
                                                    type="text" name='next_of_kin_relationship' value="Friend"
                                                />
                                            </div>
                                        </div>
                                        </div>
                                            <div className='flex gap-8 mt-6 lg:mt-3 mb-3 justify-end px-8'>
                                                <button className='bg-purple-600 w-32 h-10 py-2 px-3 flex items-center justify-center text-white rounded-md text-center gap-1'>
                                                    <Link> Save Changes</Link>
                                                </button>
                                                <div className='dark:text-gray-200 mt-2'><Link><span className='text-red-500'>Reset</span></Link></div>
                                            </div>
                                    </form>
                                </div>
                            </div>
                        </div>}
                        {title == 'change-password' && <div>
                            <div className=' flex flex-col lg:flex-row gap-3 lg:gap-5 mb-2'>
                                <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('account-information')}>
                                    <img src="assets/images/user.png" class="w-4 h-fit" alt="" />
                                    <span className='text-sm '> Account Information</span>
                                </div>
                                <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('update-profile')}>
                                    <img src="assets/images/info.png" class="w-4 h-fit" alt="" />
                                    <span className='text-sm'> Update Profile</span>
                                </div>
                                <div className='flex flex-col gap-3 mt-2'>
                                    <div className='flex gap-2 items-center cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setTitle('change-password')}>
                                        <img src="assets/images/replace.png" class="w-4 h-fit" alt="" />
                                        <span className='text-sm text-purple-600'> Change Password</span>
                                    </div>
                                    <span className='w-24 rounded h-1 bg-purple-600'></span>
                                </div>
                            </div>
                            <div className='px-10 py-9'>
                                <h2 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>Reset your Password</h2>
                                <form className='flex flex-col gap-2' onSubmit={formik.handleSubmit}>
                                    <div>
                                        <label className="text-gray-700 text-sm font-semibold"> Old Password</label>
                                        <input
                                            className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                            placeholder="**********" type="password" name='old_pwrd' value={formik.values.old_pwrd} onChange={formik.handleChange}
                                        />
                                        {formik.touched.old_pwrd && formik.errors.old_pwrd && <small className='text-red-500'>{formik.errors.old_pwrd}</small>}
                                    </div>
                                    <div>
                                        <label className="text-gray-700 text-sm font-semibold"> New Password</label>
                                        <input
                                            className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                            placeholder="************" type="password" name='new_pwrd' value={formik.values.new_pwrd} onChange={formik.handleChange}
                                        />
                                        {formik.touched.new_pwrd && formik.errors.new_pwrd && <small className='text-red-500'>{formik.errors.new_pwrd}</small>}
                                    </div>
                                    <div>
                                        <label className="text-gray-700 text-sm font-semibold"> Confirm New Password</label>
                                        <input
                                            className="block w-full mt-1 text-sm border px-3 py-2 rounded-lg border-purple-200 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple text-gray-500"
                                            placeholder="************" type="password" name='confirm_new_pwrd' value={formik.values.confirm_new_pwrd} onChange={formik.handleChange}
                                        />
                                        {formik.touched.confirm_new_pwrd && formik.errors.confirm_new_pwrd && <small className='text-red-500'>{formik.errors.confirm_new_pwrd}</small>}
                                    </div>
                                    <button type='submit'
                                        className="block w-full px-4 py-2 mt-4 text-base font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    >
                                        Reset Password
                                    </button>
                                </form>
                            </div>
                        </div>}
                    </div>
                </main>
            </div>
        </div>
    )
}
