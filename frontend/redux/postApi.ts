import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../types/post";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], number>({
      query: (age) => `posts`,
      transformResponse: (res: { posts: Post[] }) => res.posts,
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
