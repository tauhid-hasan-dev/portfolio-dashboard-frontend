"use client";

import { useGetPetQuery } from "@/redux/api/petApi";
import {
  Box,
  Card,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import React from "react";

type TParams = {
  params: {
    id: string;
  };
};

const PetDetails = ({ params }: TParams) => {
  const petId = params?.id;

  const { data: pet, isLoading } = useGetPetQuery(petId);

  if (isLoading) {
    return (
      <Box textAlign="center" my={4}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ margin: "30px auto" }}>
      <Typography
        variant="h5"
        sx={{
          width: "100%",
          my: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Details of {pet?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <Grid container spacing={2}>
            {pet?.photos?.map((pet: any, index: number) => (
              <Grid item key={index} xs={12} md={4}>
                <Card>
                  <Box
                    sx={{
                      width: "100%",
                      height: 300,
                      "& img": {
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        objectFit: "cover",
                      },
                    }}
                  >
                    <Image
                      src={pet}
                      alt={`pet-${index}`}
                      width={500}
                      height={300}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Stack gap={2}>
            <Card>
              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  display: "flex",
                  p: 5,
                }}
              >
                <Stack gap={2}>
                  <Typography variant="h6">
                    <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                    {pet?.name}
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ fontWeight: "bold" }}>Type:</span>{" "}
                    {pet?.species}
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ fontWeight: "bold" }}>Age:</span> {pet?.age}
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ fontWeight: "bold" }}>Size:</span>{" "}
                    {pet?.size}
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ fontWeight: "bold" }}>Health Status:</span>{" "}
                    {pet?.medicalHistory}
                  </Typography>
                  <Typography variant="h6">
                    <span style={{ fontWeight: "bold" }}>Location:</span>{" "}
                    {pet?.location}
                  </Typography>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetDetails;
