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
} from "@mui/material";
import UserModal from "./components/UserModal";
import { useState } from "react";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "@/redux/api/userApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { toast } from "sonner";
import { useGetAllBlogQuery } from "@/redux/api/resumeApi";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllBlogQuery({});
  const [deleteUser] = useDeleteUserMutation();
  console.log({ data });

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [updateUserRole] = useUpdateUserRoleMutation();

  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleOpenDialog = (id: any) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteUser(selectedUserId).unwrap();
      // console.log(res);
      if (res?.id) {
        toast.success("User deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      handleCloseDialog();
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const updatedUser = await updateUserStatus({
        id: id,
        body: { status: newStatus },
      });
      console.log("User status updated:", updatedUser);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleUpdateRole = async (id: string, newRole: string) => {
    try {
      const updatedUser = await updateUserRole({
        id: id,
        body: { role: newRole },
      });
      console.log("User role updated:", updatedUser);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "date", headerName: "Date", flex: 0.6 },
    { field: "headline", headerName: "Headline", flex: 0.6 },
    { field: "content", headerName: "Content", flex: 0.6 },

    {
      field: "action",
      headerName: "Action",
      flex: 0.4,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => (
        <IconButton
          onClick={() => handleOpenDialog(row.id)}
          aria-label="delete"
        >
          <DeleteIcon sx={{ color: "#FF7F7F" }} />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Link href="/dashboard/admin/create-blog">
          <Button>Create Blog</Button>
        </Link>
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={data} columns={columns} hideFooter={true} />
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
            Are you sure you want to delete this user? This action cannot be
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

export default ManageUsers;
