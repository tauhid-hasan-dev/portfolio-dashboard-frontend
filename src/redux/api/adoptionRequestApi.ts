import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const petApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdoptionRequest: build.mutation({
      query: (data) => {
        console.log("coming from adoption api", data);
        return {
          url: "/adoption-request",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [tagTypes.adoptionrequest],
    }),
    getAllAdoptionRequests: build.query({
      query: () => {
        return {
          url: "/adoption-requests",
          method: "GET",
        };
      },
      providesTags: [tagTypes.adoptionrequest],
    }),
    getPendingAdoptionRequests: build.query({
      query: (id) => {
        return {
          url: `/pending-adoption-requests/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.adoptionrequest],
    }),
    getAllAdoptedPets: build.query({
      query: (id) => {
        return {
          url: `/adopted-pets/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.adoptionrequest],
    }),
    updateRequestStatus: build.mutation({
      query: (data) => {
        return {
          url: `/adoption-requests/${data.id}`,
          method: "PUT",
          data: data.body,
        };
      },
      invalidatesTags: [tagTypes.adoptionrequest],
    }),
  }),
});

export const {
  useCreateAdoptionRequestMutation,
  useGetAllAdoptedPetsQuery,
  useGetAllAdoptionRequestsQuery,
  useGetPendingAdoptionRequestsQuery,
  useUpdateRequestStatusMutation,
} = petApi;
