/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { Button, Grid } from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TSNFullScreenModal from "@/components/Shared/TSNModal/TSNFullScreenModal";
import TSNForm from "@/components/Forms/TSNForm";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/userApi";
import TSNInput from "@/components/Forms/TSNInput";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

const validationSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

const ProfileUpdateModal = ({ open, setOpen, id }: TProps) => {
  const { data, refetch } = useGetMYProfileQuery(undefined);
  console.log(data);

  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const submitHandler = async (values: FieldValues) => {
    console.log(id);
    console.log({ values });
    try {
      const res = await updateMYProfile({
        name: values.name,
        email: values.email,
      });
      console.log({ res });
      await refetch();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    email: data?.email || "",
  };

  return (
    <TSNFullScreenModal open={open} setOpen={setOpen} title="Update Profile">
      <TSNForm
        onSubmit={submitHandler}
        defaultValues={defaultValues}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput name="name" label="Name" sx={{ mb: 2 }} fullWidth />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TSNInput
              name="email"
              type="email"
              label="Email"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" disabled={updating}>
          Save
        </Button>
      </TSNForm>
    </TSNFullScreenModal>
  );
};

export default ProfileUpdateModal;
