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
import React, { useState } from "react";
import RequestModal from "../../components/RequestModel";
import PetsIcon from "@mui/icons-material/Pets";
import LabelIcon from "@mui/icons-material/Label";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import StraightenIcon from "@mui/icons-material/Straighten";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PsychologyIcon from "@mui/icons-material/Psychology";
import DescriptionIcon from "@mui/icons-material/Description";
import ListIcon from "@mui/icons-material/List";

type TParams = {
  params: {
    id: string;
  };
};

const PetDetails = ({ params }: TParams) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const petId = params?.id;
  // console.log(petId);

  const { data: pet, isLoading } = useGetPetQuery(petId);
  // console.log(pet);

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
            {Array.from({ length: 6 }, (_, index) => (
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
                    {pet?.photos && pet.photos[index] ? (
                      <Image
                        src={pet.photos[index]}
                        alt={`pet-${index}`}
                        width={500}
                        height={300}
                      />
                    ) : (
                      <Image
                        src="https://i.ibb.co/4VPcFkd/placeholder.jpg" // Change this to the path of your default photo
                        alt={`default-pet-${index}`}
                        width={500}
                        height={300}
                      />
                    )}
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
                  height: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack gap={2}>
                  <h1>Considering {pet?.name} for adoption?</h1>
                  <Button onClick={() => setIsModalOpen(true)}>
                    Request for Adoption
                  </Button>
                  <RequestModal
                    open={isModalOpen}
                    setOpen={setIsModalOpen}
                    petId={petId}
                  ></RequestModal>
                </Stack>
              </Box>
            </Card>
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
                  <Box display="flex" alignItems="center">
                    <PetsIcon />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Name:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.name}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <LabelIcon />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Type:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.species}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    {pet?.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Gender:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.gender}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <StraightenIcon />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Size:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.size}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <CakeIcon />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Age:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.age}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <LabelIcon />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Breed:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.breed}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <LocationOnIcon />
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      marginLeft={1}
                    >
                      Location:
                    </Typography>
                    <Typography variant="body1" marginLeft={1}>
                      {pet?.location}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid
          item
          md={5}
          sx={{
            my: 2,
          }}
        >
          <Card
            sx={{
              p: 4,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  my: 1,
                  color: "#6504B5",
                }}
                fontWeight="bold"
              >
                Why should you adopt?
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                my: 1,
              }}
            >
              <PsychologyIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Temperament:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {pet?.temperament}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ScheduleIcon />
              <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Medical History:
              </Typography>
              <Typography variant="body1" marginLeft={1}>
                {pet?.medicalHistory}
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          md={7}
          sx={{
            my: 2,
          }}
        >
          <Card
            sx={{
              p: 3,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  my: 2,
                  color: "#6504B5",
                }}
                fontWeight="bold"
              >
                Adoption Requirements and Description?
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <ListIcon />
              {/* <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Adoption Requirement:
              </Typography> */}
              <Typography variant="body1" marginLeft={1}>
                {pet?.adoptionRequirements}
              </Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                my: 1,
              }}
            >
              <DescriptionIcon />
              {/* <Typography variant="body1" fontWeight="bold" marginLeft={1}>
                Description:
              </Typography> */}
              <Typography variant="body1" marginLeft={1}>
                {pet?.description}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PetDetails;
