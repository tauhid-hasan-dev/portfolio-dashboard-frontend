import { useState, useEffect } from "react";
import { Box, Link, List, Stack, Typography } from "@mui/material";
import Image from "next/image";

import assets from "@/assets";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SideBarItem";
import { getUserInfo } from "@/services/auth.services";

const SideBar = () => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo && userInfo.role) {
      setRole(userInfo.role);
    }
  }, []);

  if (role === null) {
    // You can add a loading state or return null if role is not yet available
    return null; // or a loading spinner if preferred
  }

  return (
    <Box>
      <Stack
        sx={{
          py: 2,
          textDecoration: "none",
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
          fontWeight={600}
          fontSize={30}
        >
          Pet
        </Typography>
        <Image src={assets.svgs.logo} width={40} height={40} alt="logo" />
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
          fontWeight={600}
          fontSize={30}
        >
          Love
        </Typography>
      </Stack>

      <List>
        {drawerItems(role).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
