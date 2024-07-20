"use client";

import React, { useState } from "react";
import TSNFileUploader from "@/components/Forms/TSNFileUploader";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";
import { uploadImage } from "@/utils/uploadImage";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useCreateUserMutation } from "@/redux/api/userApi";
import Tiptap from "../../../../../components/TextEditor/Tiptap";

const CreateBlog = () => {
  const router = useRouter();
  const [createUser] = useCreateUserMutation();
  const [content, setContent] = useState<string>("");

  const handleFormSubmit = async (values: FieldValues) => {
    console.log({ values, content });
    try {
      const blogData: any = {
        title: values.title,
        content: content, // Add content to the adminData
      };

      if (values.file) {
        const thumbNail = await uploadImage(values.file);
        console.log({ thumbNail });
        blogData.thumbNail = thumbNail;
      }

      console.log({ blogData });

      /* const res = await createUser(adminData); */
      /*   console.log({ res }); */
      /* if (res?.data?.id) {
        toast.success("Admin Created Successfully");
        router.push("/dashboard/admin/manage-blogs");
      } */
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 1300,
        width: "100%",
        boxShadow: 1,
        borderRadius: 1,
        mx: "auto",
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Typography variant="h5" fontWeight={600} sx={{ mb: 2, mt: 1 }}>
          Create Blog
        </Typography>
      </Stack>
      <TSNForm onSubmit={handleFormSubmit}>
        <Grid container direction="row" spacing={2} mb={4}>
          <Grid item md={8}>
            <TSNInput
              label="Title"
              type="title"
              fullWidth={true}
              name="title"
            />
          </Grid>
          <Grid item md={4}>
            <TSNFileUploader name="file" label="Upload ThumbNail" />
          </Grid>
        </Grid>
        <Grid>
          <Tiptap content={content} onChange={handleContentChange} />
        </Grid>
        <Button sx={{ mt: 1 }} type="submit">
          Submit
        </Button>
      </TSNForm>
    </Box>
  );
};

export default CreateBlog;
