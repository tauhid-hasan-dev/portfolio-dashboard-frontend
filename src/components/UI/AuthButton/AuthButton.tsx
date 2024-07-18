import { logoutUser } from "@/services/actions/logutUser";
import { getUserInfo, removeUser } from "@/services/auth.services";
import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };
  return (
    <>
      {userInfo?.id ? (
        <Button onClick={handleLogOut}>Logout</Button>
      ) : (
        <Stack direction="row" gap={2}>
          <Button component={Link} href="/login">
            Login
          </Button>
          <Button component={Link} href="/register">
            Register
          </Button>
        </Stack>
      )}
    </>
  );
};

export default AuthButton;
