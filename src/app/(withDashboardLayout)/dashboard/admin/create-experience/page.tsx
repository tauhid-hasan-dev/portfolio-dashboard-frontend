"use client";

import TSNFileUploader from "@/components/Forms/TSNFileUploader";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";
import { uploadImage } from "@/utils/uploadImage";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/redux/api/userApi";
import Link from "next/link";

const CreateExperience = () => {
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    console.log({ values });
    try {
      // Create a plain JavaScript object to hold the data
      const adminData: any = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: "ADMIN",
      };

      // If file is present, upload it and add its URL to adminData
      if (values.file) {
        const profilePhoto = await uploadImage(values.file);
        console.log({ profilePhoto });
        adminData.profilePhoto = profilePhoto;
      }

      console.log({ adminData });

      // Pass only the plain JavaScript object to registerUser function
      const res = await createUser(adminData);
      console.log({ res });
      if (res?.data?.id) {
        toast.success("Admin Created Successfully");
        router.push("/dashboard/admin/manage-experience");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
        mt: {
          xs: 2,
          md: 5,
        },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: 1 }}>
          Add Experience
        </Typography>
      </Stack>
      <TSNForm onSubmit={handleFormSubmit}>
        <Grid container direction="column" spacing={2} mb={1}>
          <Grid item md={12}>
            <TSNInput label="Name" type="name" fullWidth={true} name="name" />
          </Grid>
          <Grid item md={6}>
            <TSNInput
              label="Email"
              type="email"
              fullWidth={true}
              name="email"
            />
          </Grid>
          <Grid item md={6}>
            <TSNInput
              label="Password"
              type="password"
              fullWidth={true}
              name="password"
            />
          </Grid>
          <Grid item md={6}>
            <TSNFileUploader name="file" label="Upload Profile Image" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Submit
        </Button>
      </TSNForm>
    </Box>
  );
};

export default CreateExperience;
