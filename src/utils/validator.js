import { REGEX } from "./const";

export function isEmail(email) {
  return email && REGEX.EMAIL.test(email);
}

export function isPassword(password) {
    return password && REGEX.PASSWORD.test(password);
  }
  