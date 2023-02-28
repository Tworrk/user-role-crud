import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Box } from "@mui/material";
import { roleValidationSchema } from "../constants";
import { addRole, updateRole } from "../../../store/slices/userSlice";
import { setNotification } from "../../../store/slices/appSlice";

const AddEditRole = () => {
  const { id: roleId } = useParams();
  const roleDetail = useSelector((state) => roleId ? state.user.roles.find(r => r.id === roleId) : null, shallowEqual);
  const roleList = useSelector((state) => state.user.roles, shallowEqual);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleSubmit, setValues, isSubmitting } = useFormik({
    initialValues: {
      roleLabel: "",
      roleKey: ""
    },
    validationSchema: roleValidationSchema,
    onSubmit: (formValues) => {
      console.log(">>>>> Final Role detail", formValues);
      let message = "Role added";
      if (roleId && roleDetail) {
        dispatch(updateRole(formValues));
        message = "Role updated"
      } else {
        dispatch(addRole(formValues));
      }

      dispatch(setNotification({
        message,
        type: "success"
      }));
      navigate('/role');
    },
    validate: (formValues) => {
      const errorObject = {};
      // Check user detail already exist
      roleList.map(item => {
        if (item.id !== roleId || !roleId) {
          if (item.roleLabel.toLowerCase() === formValues.roleLabel.toLowerCase()) {
            errorObject.roleLabel = "Role Label already exist!";
          }

          if (item.roleKey === formValues.roleKey) {
            errorObject.roleKey = "Role key already exist!";
          }
        }
        return item;
      });

      return errorObject;
    }
  });


  useEffect(() => {
    if (roleId && roleDetail) {
      setValues(roleDetail);
    }
  }, [roleId]);

  return (
    <Box className="user_add_edit_form">
      <h2>{roleId ? "Update" : "Add"}&nbsp;Role</h2>
      <form onSubmit={handleSubmit}>
        <Box>
          <TextField
            fullWidth
            id="roleLabel"
            name="roleLabel"
            label="Role Label"
            value={values.roleLabel}
            onChange={handleChange}
            error={touched.roleLabel && Boolean(errors.roleLabel)}
            helperText={touched.roleLabel && errors.roleLabel}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            id="roleKey"
            name="roleKey"
            label="Role Key"
            value={values.roleKey}
            onChange={handleChange}
            error={touched.roleKey && Boolean(errors.roleKey)}
            helperText={touched.roleKey && errors.roleKey}
            sx={{ mb: 3 }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AddEditRole;
