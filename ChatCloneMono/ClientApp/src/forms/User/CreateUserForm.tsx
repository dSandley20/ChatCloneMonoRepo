import { Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import useCreateUser from "../../api/calls/user/createUser";

const CreateUserSchema = yup.object({
  FirstName: yup.string().required("Enter you first name"),
  LastName: yup.string().required("Enter your last name"),
  Email: yup.string().email().required("An Email is required"),
  Password: yup
    .string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),
});

const CreateUserForm = () => {
  const mutation = useCreateUser();

  const formik = useFormik({
    initialValues: { FirstName: "", LastName: "", Email: "", Password: "" },
    validationSchema: CreateUserSchema,
    onSubmit: (values) => {
      mutation.mutateAsync(values);
    },
  });

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          spacing={2}
          sx={{ mt: "10px", width: "250px", alignItems: "center" }}
        >
          <TextField
            fullWidth
            id="FirstName"
            name="FirstName"
            label="First Name"
            data-cy="firstNameField"
            value={formik.values.FirstName}
            onChange={formik.handleChange}
            error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
            helperText={formik.touched.FirstName && formik.errors.FirstName}
          />
          <TextField
            fullWidth
            id="LastName"
            name="LastName"
            label="LastName"
            data-cy="lastNameField"
            value={formik.values.LastName}
            onChange={formik.handleChange}
            error={formik.touched.LastName && Boolean(formik.errors.LastName)}
            helperText={formik.touched.LastName && formik.errors.LastName}
          />
          <TextField
            fullWidth
            id="Email"
            name="Email"
            label="Email"
            data-cy="emailField"
            value={formik.values.Email}
            onChange={formik.handleChange}
            error={formik.touched.Email && Boolean(formik.errors.Email)}
            helperText={formik.touched.Email && formik.errors.Email}
          />
          <TextField
            fullWidth
            id="Password"
            name="Password"
            label="Password"
            type="password"
            data-cy="passwordField"
            value={formik.values.Password}
            onChange={formik.handleChange}
            error={formik.touched.Password && Boolean(formik.errors.Password)}
            helperText={formik.touched.Password && formik.errors.Password}
          />
          <Button
            color="primary"
            variant="outlined"
            sx={{ width: "150px" }}
            type="submit"
            data-cy="submitFormBtn"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateUserForm;
