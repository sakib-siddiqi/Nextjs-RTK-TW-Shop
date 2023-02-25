import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DOMAIN } from "../../utils/const";

const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: `${DOMAIN}/api/v2/` }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
  }),
});
export default products ;