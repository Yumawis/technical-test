import { baseApi } from "../store/baseApi";

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ nickname }) => ({
        url: "auth/login",
        method: "POST",
        body: { nickname },
      }),
      transformResponse: (response) => response?.data?.result,
      transformErrorResponse: (response) => response?.data,
    }),

    signUp: builder.mutation({
      query: ({ firstName, lastName, nickname }) => ({
        url: "auth/sign-up",
        method: "POST",
        body: { firstName, lastName, nickname },
      }),
      transformResponse: (response) => response?.data,
      transformErrorResponse: (response) => response?.data,
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation } = authService;
