"use client";

import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PetsIcon from "@mui/icons-material/Pets";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useGetAllPetsQuery } from "@/redux/api/petApi";
import {
  useGetAllBlogQuery,
  useGetAllProjectQuery,
  useGetAllSkillQuery,
} from "@/redux/api/resumeApi";

const AdminDashboard = () => {
  const { data: skills } = useGetAllSkillQuery({});
  const { data } = useGetAllProjectQuery({});
  console.log(data);
  const { data: blogs } = useGetAllBlogQuery({});

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
                Total Skills
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {skills?.length}
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
                Total Projects
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {data?.length}
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
                Total Blog Posts
              </Typography>
              <Typography
                sx={{ fontSize: 36, color: "#6504B5", fontWeight: "bold" }}
                color="text.secondary"
                gutterBottom
              >
                {blogs?.length}
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
