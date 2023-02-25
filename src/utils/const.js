export const DOMAIN =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/"
    : process.env.API_ROUTE;
export const REQ_METHOD = {
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  POST: "POST",
  DELETE: "DELETE",
};

export const REGEX = {
  EMAIL: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
  PASSWORD: /^[a-zA-Z0-9]{6,32}$/,
};
