import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem, Box, Grid } from '@mui/material';

import { userValidationSchema } from '../constants';
import { addUser, updateUser } from '../../../store/slices/userSlice';
import { generatePasswordHash } from '../../../utils';
import { setNotification } from '../../../store/slices/appSlice';

const AddEditUser = () => {
  const { id: userId } = useParams();
  const userDetail = useSelector((state) => userId ? state.user.list.find(u => u.id === userId) : null, shallowEqual);
  const userList = useSelector((state) => state.user.list, shallowEqual);
  const roleList = useSelector((state) => state.user.roles.map((role) => ({ value: role.roleKey, label: role.roleLabel })), shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleSubmit, setValues, isSubmitting } = useFormik({
    initialValues: {
      name: '',
      username: '',
      mobile: '',
      email: '',
      password: '',
      roleKey: ''
    },
    validationSchema: userValidationSchema,
    onSubmit: (formValues) => {
      formValues.password = generatePasswordHash(formValues.password);
      console.log('>>>>> Final user detail', formValues);
      let message = 'User added';
      if (userId && userDetail) {
        dispatch(updateUser(formValues));
        message = 'User update';
      } else {
        dispatch(addUser(formValues));
      }
      dispatch(setNotification({
        message,
        type: 'success'
      }));
      navigate('/user');
    },
    validate: (formValues) => {
      const errorObject = {};
      // Check user detail already exist
      userList.map(item => {
        if (item.id !== userId) {
          if(item.email === formValues.email) {
            errorObject.email = 'Email already exist!';
          }

          if(item.username === formValues.username) {
            errorObject.username = 'Username already exist!';
          }

          if(item.mobile === formValues.mobile) {
            errorObject.mobile = 'Mobile number already exist!';
          }
        }
        return item;
      });

      return errorObject;
    }
  });


  useEffect(() => {
    if (userId && userDetail) {
      setValues({ ...userDetail, password: '' });
    }
    // eslint-disable-next-line
  }, [userId]);

  const handleMobileNumber = (event) => {
    // Allow only digit values
    const val = event.target.value.replace(/\D/g, '');
    event.target.value = val;
    handleChange(event);
  }

  return (
    <Box className='user_add_edit_form'>
      <h2>{userId ? 'Update' : 'Add'}&nbsp;User</h2>
      <form onSubmit={handleSubmit}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='name'
                name='name'
                label='Name'
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='username'
                name='username'
                label='Username'
                value={values.username}
                onChange={handleChange}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                sx={{ mb: 3 }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id='mobile'
                name='mobile'
                label='Mobile'
                value={values.mobile}
                onChange={handleMobileNumber}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
                sx={{ mb: 3 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                id='roleKey'
                name='roleKey'
                label='Role'
                value={values.roleKey || ''}
                onChange={handleChange('roleKey')}
                error={touched.roleKey && Boolean(errors.roleKey)}
                helperText={touched.roleKey ? errors.roleKey : ''}
                sx={{ mb: 3 }}
              >
                {roleList.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <TextField
            fullWidth
            id='email'
            name='email'
            label='Email'
            value={values.email}
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id='password'
            name='password'
            label='Password'
            type='password'
            value={values.password}
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{ mb: 3 }}
          />
          <Button
            color='primary'
            variant='contained'
            fullWidth
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AddEditUser;
