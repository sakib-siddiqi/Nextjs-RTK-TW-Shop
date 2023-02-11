import axios from "axios";
import { BASE_API_ROUTE } from "../const";

async function response(callback) {
  const { data } = await callback();
  return data;
}

class APIClass {
  root = BASE_API_ROUTE + "/api/v1";
  url(route) {
    return `${this.root}/${route}`;
  }

  products = {
    get: async (id) => {
      const result = await response(() =>
        axios.get(this.url(`/products${id ? `/${id}` : ""}`))
      );
      return result;
    },
    create: async (data) => {
      const result = await response(() =>
        axios.post(this.url("/productsasdf"), data)
      );
      return result;
    },
    update: async (id, data) => {
      const result = await response(() =>
        axios.patch(this.url(`/products/${id}`), data)
      );
      return result;
    },
    delete: async (id) => {
      const result = await response(() =>
        axios.delete(this.url(`/products/${id}`))
      );
      return result;
    },
  };
}

const API = new APIClass();

export default API;
