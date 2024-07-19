"use client";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import ProjectModal from "./components/ProjectModal";
import { useDeletePetMutation, useGetAllPetsQuery } from "@/redux/api/petApi";
import { useDebounced } from "@/redux/hooks";
import Image from "next/image";
import { toast } from "sonner";
import { useGetAllProjectQuery } from "@/redux/api/resumeApi";

const PetManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const query: Record<string, any> = {};

  const { data, isLoading } = useGetAllProjectQuery({});

  const [deletePet] = useDeletePetMutation();

  const projects = data || [];

  const handleOpenDialog = (id: string) => {
    setSelectedPetId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedPetId(null);
  };

  const handleDelete = async () => {
    try {
      const res = await deletePet(selectedPetId!).unwrap();
      if (res?.id) {
        toast.success("Pet deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      handleCloseDialog();
    }
  };

  const columns: GridColDef[] = [
    { field: "num", headerName: "Num", flex: 0.3 },
    /* {
      field: "icon",
      headerName: "Photo",
      flex: 0.3,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image src={row?.image} width={30} height={30} alt="icon" />
          </Box>
        );
      },
    }, */

    { field: "title", headerName: "Title", flex: 0.7 },
    { field: "category", headerName: "Category", flex: 0.6 },
    {
      field: "action",
      headerName: "Action",
      flex: 0.4,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Link href={`/dashboard/admin/manage-pets/edit/${row.id}`}>
              <IconButton aria-label="edit">
                <EditIcon sx={{ color: "#be95df" }} />
              </IconButton>
            </Link>
            <IconButton
              onClick={() => handleOpenDialog(row.id)}
              aria-label="delete"
            >
              <DeleteIcon sx={{ color: "#FF7F7F" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Add New Project</Button>
        <ProjectModal open={isModalOpen} setOpen={setIsModalOpen} />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={projects} columns={columns} />
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
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this pet? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PetManagement;
