import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const resumeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //creating experience
    createExperience: build.mutation({
      query: (data) => {
        console.log("coming from pet api", data);
        return {
          url: "/experience",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [tagTypes.experience],
    }),
    //creating skill
    createSkill: build.mutation({
      query: (data) => {
        console.log("coming from pet api", data);
        return {
          url: "/skill",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [tagTypes.skill],
    }),

    //creating Project
    createProject: build.mutation({
      query: (data) => {
        console.log("coming from pet api", data);
        return {
          url: "/project",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [tagTypes.project],
    }),

    //creating Blog
    createBlog: build.mutation({
      query: (data) => {
        console.log("coming from pet api", data);
        return {
          url: "/blog",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [tagTypes.blog],
    }),

    //getting all user
    getAllExperiences: build.query({
      query: () => ({
        url: "/experiences",
        method: "GET",
      }),
      providesTags: [tagTypes.experience],
    }),
    //getting all SKills
    getAllSkill: build.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: [tagTypes.skill],
    }),
    //getting all project
    getAllProject: build.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: [tagTypes.project],
    }),
    //getting all Blogs
    getAllBlog: build.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useCreateExperienceMutation,
  useCreateSkillMutation,
  useGetAllExperiencesQuery,
  useGetAllSkillQuery,
} = resumeApi;
