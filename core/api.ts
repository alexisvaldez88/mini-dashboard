
import axios from "axios";
import { Exception } from "./exception";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    accept: "application/json",
  },
  validateStatus(status: number) {
    return status >= 200 && status <= 302;
  },
});

class ApiException extends Exception {
  private constructor(message: string) {
    super("API_EXCEPTION", message);
  }

  static create(message: string): ApiException {
    return new ApiException(message);
  }
}

export { api, ApiException };
