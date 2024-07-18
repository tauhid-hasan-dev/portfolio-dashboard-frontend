"use client";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { registerUser } from "@/services/actions/registerUser";
import TSNForm from "@/components/Forms/TSNForm";
import TSNInput from "@/components/Forms/TSNInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import HomeIcon from "@mui/icons-material/Home";

export const validationSchema = z
  .object({
    name: z.string().min(1, "Please enter your name!"),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of the error message
  });

const RegisterPage = () => {
  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    try {
      const res = await registerUser(values);
      console.log({ res });
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      }
    } catch (err: any) {
      console.error(err.message);
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
            <Link href="/">
              <Box>
                <Image
                  src={assets.svgs.logo}
                  width={50}
                  height={50}
                  alt="logo"
                />
              </Box>
            </Link>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <TSNForm
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
            >
              <Grid container direction="column" spacing={2} my={1}>
                <Grid item md={12}>
                  <TSNInput
                    label="Name"
                    type="name"
                    fullWidth={true}
                    name="name"
                  />
                </Grid>
                <Grid item md={12}>
                  <TSNInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="email"
                  />
                </Grid>
                <Grid item md={12}>
                  <TSNInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={12}>
                  <TSNInput
                    label="Confirm Password"
                    type="password"
                    fullWidth={true}
                    name="confirmPassword"
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
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account?{" "}
                <Link href="/login">
                  <span style={{ color: "#4169E1" }}>Login</span>
                </Link>
              </Typography>
            </TSNForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
