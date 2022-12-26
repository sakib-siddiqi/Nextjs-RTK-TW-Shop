export const BASE_API_ROUTE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    :   process.env.API_ROUTE;
