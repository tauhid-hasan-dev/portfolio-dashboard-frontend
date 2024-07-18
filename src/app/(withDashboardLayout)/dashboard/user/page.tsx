"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import {
  useGetAllAdoptedPetsQuery,
  useGetPendingAdoptionRequestsQuery,
} from "@/redux/api/adoptionRequestApi";
import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth.services";

type TUserInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

const UserDashboard = () => {
  const [user, setUser] = useState<TUserInfo | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const { data: adoptedPets } = useGetAllAdoptedPetsQuery(user?.id);
  const { data } = useGetPendingAdoptionRequestsQuery(user?.id);

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
                Total Adopted Pets
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {adoptedPets?.length}
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
                Total Pending Adoption Requests
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {data?.length}
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

export default UserDashboard;
