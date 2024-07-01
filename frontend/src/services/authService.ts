import api from "./api";

/**
 * Login the user
 * @param email  - email of the user
 * @param password - password of the user
 * @returns  - token of the user
 * @throws  - if the email or password is invalid
 */
export const login = async (email: string, password: string) => {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data.token;
};

/**
 * Register the user
 * @param email  - email of the user
 * @param password - password of the user
 * @returns  - token of the user
 * @throws  - if the email is already registered
 */
export const register = async (email: string, password: string) => {
  const response = await api.post("/api/auth/register", { email, password });
  return response.data.token;
};
