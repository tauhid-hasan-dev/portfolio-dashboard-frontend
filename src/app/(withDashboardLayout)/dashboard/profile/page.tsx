"use client";

import { Box, Button, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Image from "next/image";
import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";

import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/userApi";
import { uploadImage } from "@/utils/uploadImage";
import ProfileInformation from "./components/ProfileInfo";
import ProfileUpdateModal from "./components/ProfileUpdateModal";
import Link from "next/link";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  console.log(data);
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = async (file: File) => {
    const imageString = await uploadImage(file);
    const data = {
      profilePhoto: imageString,
    };
    await updateMYProfile(data);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                height={300}
                width={400}
                src={data?.profilePhoto}
                alt="User Photo"
              />
            </Box>
            <Box my={3}>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Change Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                />
              )}
            </Box>

            <Link href={"/dashboard/profile/edit-profile"}>
              <Button
                fullWidth
                endIcon={<ModeEditIcon />}
                /*  onClick={() => setIsModalOpen(true)} */
              >
                Edit Profile
              </Button>
            </Link>
          </Grid>
          <Grid xs={12} md={8}>
            <ProfileInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;
