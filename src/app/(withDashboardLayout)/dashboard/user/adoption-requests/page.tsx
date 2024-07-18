"use client";

import { useGetPendingAdoptionRequestsQuery } from "@/redux/api/adoptionRequestApi";
import { getUserInfo } from "@/services/auth.services";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import PetDetailsDialog from "../components/PetDetailsDialog";

type TUserInfo = {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

type TAdoptionRequest = {
  id: string;
  userName: string;
  userEmail: string;
  status: string;
  petId: string;
};

const AdoptionRequests = () => {
  const [open, setOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [user, setUser] = useState<TUserInfo | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
  }, []);

  const { data: pendingRequests, isLoading } =
    useGetPendingAdoptionRequestsQuery(user?.id);

  const handleShowPetDetails = (id: string) => {
    setSelectedPetId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedPetId(null);
  };

  const columns: GridColDef[] = [
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "userEmail", headerName: "User Email", flex: 1 },
    { field: "petId", headerName: "Pet ID", flex: 1 },
    {
      field: "action",
      headerName: "See requested pet details",
      flex: 0.8,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleShowPetDetails(row.petId)}
          >
            See Pet Details
          </Button>
        );
      },
    },
    {
      field: "status",
      headerName: "Request Status",
      flex: 0.5,
      renderCell: ({ value }) => (
        <Typography
          sx={{
            fontWeight: "bold",
            color:
              value === "REJECTED"
                ? "red"
                : value === "PENDING"
                ? "#6504B5"
                : "inherit",
          }}
        >
          {value}
        </Typography>
      ),
    },
  ];

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Your adoption request list
      </Typography>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid
            rows={pendingRequests || []}
            columns={columns}
            getRowId={(row) => row.id}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 100px)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <PetDetailsDialog
        petId={selectedPetId}
        open={open}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default AdoptionRequests;
