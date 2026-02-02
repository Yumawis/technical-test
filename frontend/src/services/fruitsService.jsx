import { baseApi } from "../store/baseApi";

export const productService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ name, description, photoBase64 }) => ({
        url: "fruits",
        method: "POST",
        body: { name, description, photoBase64 },
      }),
      transformResponse: (response) => response?.data?.result,
      transformErrorResponse: (response) => response?.data,
    }),

    getAllProducts: builder.query({
      query: (userId) => ({
        url: `product/${userId}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.result,
      transformErrorResponse: (response) => response?.data,
    }),
  }),
});

export const { useRegisterFruitMutation, useGetAllFruitsQuery } =
  productService;
