import * as yup from "yup";

export const roleValidationSchema = yup.object().shape({
  roleLabel: yup.string().required("Label is required"),
  roleKey: yup.string().required("Key is required"),
});

export const roleColumns = [
  { field: 'roleLabel', headerName: 'Role', width: 200 },
];
