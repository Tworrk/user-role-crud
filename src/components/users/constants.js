import * as yup from 'yup';

export const userValidationSchema = yup.object().shape({
  name: yup.string().required('Fullname is required'),
  username: yup.string().required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters'),
  mobile: yup.string().required('Mobile is required')
  .min(10, 'Mobile must be 10 number')
  .max(10, 'Mobile must be 10 number'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  password: yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters')
  .max(20, 'Password must not exceed 20 characters'),
  roleKey: yup.string().required('Role is required'),
});

export const userColumns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'username', headerName: 'Username', width: 180 },
  { field: 'mobile', headerName: 'Mobile', width: 180 },
];
