import { Box, Button, Stack, TextField } from '@mui/material';
import { useFormik, } from 'formik'
import * as yup from 'yup'
import React from 'react'

const CreateServerSchema = yup.object({
    server_name: yup.string().required().min(2).max(20),
    creator_id: yup.number().required()
});

const CreateServerForm = () => {
    const formik = useFormik({
        initialValues: { server_name: "", creator_id: 0 },
        validationSchema: CreateServerSchema,
        onSubmit: (values) => {
            console.log(values)
        }

    })

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack>
                    <TextField
                        fullWidth
                        id="server_name"
                        name="server_name"
                        label="Server Name"
                        data-cy="server_name_field"
                        value={formik.values.server_name}
                        onChange={formik.handleChange}
                        error={formik.touched.server_name && Boolean(formik.errors.server_name)}
                        helperText={formik.touched.server_name && formik.errors.server_name}
                    />
                    <Button
                        color="primary"
                        variant="contained"
                        sx={{ width: "150px" }}
                        type="submit"
                        data-cy="submitCreateServerBtn"
                    >
                        Create
                    </Button>
                </Stack>
            </form>
        </Box>
    )
}

export default CreateServerForm