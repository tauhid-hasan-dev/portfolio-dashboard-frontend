"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PetsIcon from "@mui/icons-material/Pets";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useGetAllUserQuery } from "@/redux/api/userApi";
import { useGetAllAdoptionRequestsQuery } from "@/redux/api/adoptionRequestApi";
import { useGetAllPetsQuery } from "@/redux/api/petApi";

const AdminDashboard = () => {
  const { data: allUsers } = useGetAllUserQuery({});
  const { data } = useGetAllPetsQuery({});
  const { data: requests } = useGetAllAdoptionRequestsQuery({});

  return (
    <Stack direction="row" spacing={4}>
      <Card sx={{ minWidth: 400, p: 2, borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Users
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {allUsers?.length}
              </Typography>
            </Box>
            <PeopleOutlineIcon
              sx={{ fontSize: 45, color: "#F1EAFF" }}
            ></PeopleOutlineIcon>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 400, p: 2, borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Pets
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {data?.pets?.length}
              </Typography>
            </Box>
            <PetsIcon sx={{ fontSize: 45, color: "#F1EAFF" }}></PetsIcon>
          </Stack>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 400, p: 2, borderRadius: 4 }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography
                sx={{ fontSize: 17 }}
                color="text.secondary"
                gutterBottom
              >
                Total Adoption Requests
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {requests?.length}
              </Typography>
            </Box>
            <MailOutlineIcon
              sx={{ fontSize: 45, color: "#F1EAFF" }}
            ></MailOutlineIcon>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AdminDashboard;
