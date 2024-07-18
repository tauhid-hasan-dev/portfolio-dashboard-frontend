"use client";
import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DasboardDrawer";

import { Box } from "@mui/material";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardDrawer>
      <Box sx={{ my: 2 }}>{children}</Box>
    </DashboardDrawer>
  );
};

export default DashboardLayout;
