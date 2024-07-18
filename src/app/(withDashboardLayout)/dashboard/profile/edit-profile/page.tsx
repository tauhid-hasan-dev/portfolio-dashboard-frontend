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
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/userApi";

const EditProfile = () => {
  const router = useRouter();
  const { data, refetch } = useGetMYProfileQuery(undefined);
  /* console.log(data); */

  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    console.log({ values });
    try {
      const res = await updateMYProfile({
        name: values.name,
        email: values.email,
      });
      console.log(res);
      if (res?.data?.id) {
        toast.success("Profile info updated successfully");
        router.push("/dashboard/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
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
          Edit Profile
        </Typography>
      </Stack>
      <TSNForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
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
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Save
        </Button>
      </TSNForm>
    </Box>
  );
};

export default EditProfile;
