import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../types/post";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/tuango-api/asia-east1/api_tw",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: (page) => `posts/${page}`,
      transformResponse: (response: { data: { docs: Post[] } }) =>
        response.data.docs,
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
