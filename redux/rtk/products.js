import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_ROUTE } from "../../const";

const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_ROUTE}/api/v2/` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
  }),
});
export default products ;