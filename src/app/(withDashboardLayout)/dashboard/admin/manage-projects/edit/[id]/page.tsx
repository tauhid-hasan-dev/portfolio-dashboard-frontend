"use client";

import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";
import { useEditPetMutation, useGetPetQuery } from "@/redux/api/petApi";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    id: string;
  };
};

const PetEditPage = ({ params }: TParams) => {
  //   console.log(params?.doctorId);
  const router = useRouter();

  const petId = params?.id;
  console.log(petId);

  const { data, isLoading } = useGetPetQuery(petId);
  const [editPet] = useEditPetMutation();
  //   console.log(data);

  const handleFormSubmit = async (values: FieldValues) => {
    values.age = Number(values.age);

    console.log(petId, values);
    try {
      const res = await editPet({ id: petId, body: values }).unwrap();
      if (res?.id) {
        toast.success("Pet Updated Successfully!!!");
        router.push("/dashboard/admin/manage-pets");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    name: data?.name || "",
    species: data?.species || "",
    breed: data?.breed || "",
    age: data?.age || 0,
    size: data?.size || "",
    location: data?.location || "",
    description: data?.description || "",
    temperament: data?.temperament || "",
    medicalHistory: data?.medicalHistory || "",
    adoptionRequirements: data?.adoptionRequirements || "",
  };

  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Pet Info
      </Typography>
      {isLoading ? (
        "Loading..."
      ) : (
        <TSNForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="species"
                label="Type"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="breed"
                label="Breed"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="age"
                label="Age"
                type="number"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="size"
                label="Size"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="location"
                label="Location"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="description"
                label="Description"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="temperament"
                label="Temperament"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="medicalHistory"
                label="Health Status"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <TSNInput
                name="adoptionRequirements"
                label="Requirements"
                fullWidth={true}
                sx={{ mb: 2 }}
                required
              />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </TSNForm>
      )}
    </Box>
  );
};

export default PetEditPage;
