"use client";

import {
  useGetAllAdoptionRequestsQuery,
  useUpdateRequestStatusMutation,
} from "@/redux/api/adoptionRequestApi";

import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import PetDetailsDialog from "../../user/components/PetDetailsDialog";
import { toast } from "sonner";

const AdoptionRequests = () => {
  const [open, setOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  const { data: allAdoptionRequests, isLoading } =
    useGetAllAdoptionRequestsQuery({});

  const handleShowPetDetails = (id: string) => {
    setSelectedPetId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedPetId(null);
  };

  const [updateRequestStatus] = useUpdateRequestStatusMutation();

  const handleApprove = async (id: string) => {
    try {
      const res = await updateRequestStatus({
        id: id,
        body: { status: "APPROVED" },
      });
      if (res?.data?.id) {
        toast.success("Request Approved :)");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await updateRequestStatus({
        id: id,
        body: { status: "REJECTED" },
      });
      if (res?.data?.id) {
        toast.success("Request Rejected :(");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handlePending = async (id: string) => {
    try {
      const res = await updateRequestStatus({
        id: id,
        body: { status: "PENDING" },
      });
      if (res?.data?.id) {
        toast.success("Request Pending!!");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "userName", headerName: "User Name", flex: 0.5 },
    { field: "userEmail", headerName: "User Email", flex: 0.5 },
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
                : value === "APPROVED"
                ? "#9BCF53"
                : "inherit",
          }}
        >
          {value}
        </Typography>
      ),
    },
    {
      field: "Action",
      headerName: "Update Status",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <>
            <>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleApprove(row.id)}
                style={{
                  marginRight: "10px",
                  borderColor: "green",
                  color: "green",
                }}
              >
                APPROVE
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleReject(row.id)}
                style={{
                  marginRight: "10px",
                  borderColor: "red",
                  color: "red",
                }}
              >
                REJECT
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handlePending(row.id)}
                style={{ borderColor: "purple", color: "purple" }}
              >
                PENDING
              </Button>
            </>
          </>
        );
      },
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
            rows={allAdoptionRequests || []}
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
