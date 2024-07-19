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
import { useCreateExperienceMutation } from "@/redux/api/resumeApi";

const CreateExperience = () => {
  const router = useRouter();
  const [createExperience] = useCreateExperienceMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    console.log({ values });
    try {
      const experienceData: any = {
        company: values.company,
        position: values.position,
        duration: values.duration,
      };

      console.log({ experienceData });

      const res = await createExperience(experienceData);
      console.log({ res });
      if (res?.data?.id) {
        toast.success("Experience Created Successfully");
        router.push("/dashboard/admin/manage-experience");
      }
    } catch (err: any) {
      console.error(err.message);
      toast.error("Failed to create experience");
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
          <Grid item xs={12}>
            <TSNInput
              label="Company"
              type="text"
              fullWidth={true}
              name="company"
            />
          </Grid>
          <Grid item xs={12}>
            <TSNInput
              label="Position"
              type="text"
              fullWidth={true}
              name="position"
            />
          </Grid>
          <Grid item xs={12}>
            <TSNInput
              label="Duration"
              type="text"
              fullWidth={true}
              name="duration"
            />
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
