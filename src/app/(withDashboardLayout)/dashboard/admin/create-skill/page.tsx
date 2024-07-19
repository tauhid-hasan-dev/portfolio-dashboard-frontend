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
import { useCreateSkillMutation } from "@/redux/api/resumeApi";

const CreateSkill = () => {
  const router = useRouter();
  const [createSkill] = useCreateSkillMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    console.log({ values });
    try {
      // Create a plain JavaScript object to hold the data

      const skillData: any = {
        name: values.name,
      };

      // If file is present, upload it and add its URL to adminData
      if (values.file) {
        const techLogo = await uploadImage(values.file);
        console.log({ icon: techLogo });
        skillData.icon = techLogo;
      }

      console.log({ adminData: skillData });

      // Pass only the plain JavaScript object to registerUser function
      const res = await createSkill(skillData);
      console.log({ res });
      if (res?.data?.id) {
        toast.success("New Skill Added Successfully");
        router.push("/dashboard/admin/manage-skills");
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
          Add Skill
        </Typography>
      </Stack>
      <TSNForm onSubmit={handleFormSubmit}>
        <Grid container direction="column" spacing={2} mb={1}>
          <Grid item md={12}>
            <TSNInput label="Name" type="name" fullWidth={true} name="name" />
          </Grid>

          <Grid item md={6}>
            <TSNFileUploader name="file" label="Upload Tech Logo" />
          </Grid>
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Submit
        </Button>
      </TSNForm>
    </Box>
  );
};

export default CreateSkill;
