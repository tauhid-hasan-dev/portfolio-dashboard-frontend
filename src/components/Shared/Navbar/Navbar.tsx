"use client";

import assets from "@/assets";
import { getUserInfo } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { Box, Container, Stack, Button, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const Navbar = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  console.log(userInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const info = await getUserInfo();
      setUserInfo(info);
    };
    fetchUserInfo();
  }, []);

  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <Container sx={{ width: "100%" }}>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          <Stack direction="row" gap={1}>
            <Box component="span" color="primary.main">
              tasan.
            </Box>
          </Stack>
        </Typography>

        <Stack direction="row" justifyContent="space-between" gap={2}>
          {userInfo && (
            <Link href={`/dashboard/${userInfo?.role}`} passHref>
              <Button
                variant="contained"
                sx={{
                  "&:hover": {
                    backgroundColor: "#6504B5",
                  },
                }}
                component="a"
              >
                Dashboard
              </Button>
            </Link>
          )}
          <AuthButton />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
