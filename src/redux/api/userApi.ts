import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getMYProfile: build.query({
      query: () => {
        return {
          url: "/profile",
          method: "GET",
        };
      },
      providesTags: [tagTypes.user],
    }),

    updateMYProfile: build.mutation({
      query: (data) => {
        return {
          url: "/profile",
          method: "PUT",
          data,
          contentType: "application/json",
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    updateUserStatus: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/${data.id}/status`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    updateUserRole: build.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/${data.id}/role`,
          method: "PATCH",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.user],
    }),

    editUser: build.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getAllUser: build.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} = userApi;
