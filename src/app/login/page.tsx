"use client";

import { useState } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { FieldValues } from "react-hook-form";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "sonner";
import { z } from "zod";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";
import { zodResolver } from "@hookform/resolvers/zod";
import HomeIcon from "@mui/icons-material/Home";

export const validationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: FieldValues) => {
    console.log({ values });
    try {
      const res = await userLogin(values);
      console.log("Login response:", res);

      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
      } else {
        setError(res?.message || "Error occurred!");
      }
    } catch (err: any) {
      console.error(err.message);
      setError("Error occurred!");
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
          }}
        >
          <Link href="/">
            <HomeIcon
              sx={{
                color: "#6504B5",
                width: 30,
                height: 30,
              }}
            />
          </Link>
        </Box>
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Typography color="error" mt={1}>
              {error}
            </Typography>
          )}
          <Box>
            <TSNForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container direction="column" spacing={2} my={1}>
                <Grid item md={6}>
                  <TSNInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item md={6}>
                  <TSNInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
              </Grid>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">
                  <span style={{ color: "#4169E1" }}>Create an account</span>
                </Link>
              </Typography>
            </TSNForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginPage;
