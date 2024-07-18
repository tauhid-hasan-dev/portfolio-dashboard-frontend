import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: (data) => ({
        url: "/change-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = authApi;
