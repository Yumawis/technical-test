import { baseApi } from "../store/baseApi";

export const favoriteService = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavoriteFruits: builder.mutation({
      query: ({ userId, fruitsId }) => ({
        url: `favorite/fruits/${userId}`,
        method: "PUT",
        body: { fruitsId },
      }),
      transformResponse: (response) => response?.data,
      transformErrorResponse: (response) => response?.data,
    }),
  }),
});

export const { useAddFavoriteFruitsMutation } = favoriteService;