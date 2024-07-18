// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";
import { jwtDecode } from "jwt-decode";

export const userLogin = async (data: FieldValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
    // cache: "no-store",
  });
  const userInfo = await res.json();

  let decodedData = null;

  if (userInfo.data.accessToken) {
    decodedData = jwtDecode(userInfo?.data?.accessToken) as any;
  }

  const role = decodedData?.role?.toLowerCase();

  const passwordChangeRequired = userInfo?.data?.needPasswordChange;

  if (userInfo.data.accessToken) {
    setAccessToken(userInfo?.data?.accessToken, {
      redirect: `/dashboard/${role}`,
      passwordChangeRequired,
    });
  }

  return userInfo;
};
