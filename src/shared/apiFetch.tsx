import { NavigateFunction } from "react-router";
import { store } from "../store";
import { config } from "./config";

interface miOpcResponse {
  errors: string | null;
  message: string;
  result: any;
  statusCode: number;
}

export interface backendResponse {
  error: string;
  message: string;
  result: any;
  statusCode: number;
}

export default function api(
  url: string,
  method: "GET" | "PUT" | "DELETE" | "POST",
  navigate: NavigateFunction,
  body?: any,
  contentType?: string,
  timeout = 3000
): Promise<any | { error: string }> {
  const controller = new AbortController();
  const { signal } = controller;

  const { token } = store.getState().user;

  let aborted = false;

  setTimeout(() => {
    controller.abort();
    aborted = true;
  }, timeout);

  const headers: { [id: string]: string } = { Authorization: `Bearer ${token}` };
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  return fetch(config.API_URL + url, {
    method,
    headers,
    body,
    signal
  })
    .then((response): Promise<miOpcResponse> => {
      if (response.status === 200 || response.status === 400) {
        return response.json();
      }
      if (response.status === 401) {
        // navigate to login
        store.dispatch({ type: "user/setSessionExpired" });
        store.dispatch({ type: "user/logoutUser" });

        navigate("/login");
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      if (data.statusCode === 200) {
        store.dispatch({ type: "user/setLastAccess", payload: Date.now() });
      } else if (data.errors !== null) {
        throw new Error(data.errors[0]);
      }
      return data;
    })
    .catch((error) => {
      return { error: aborted ? "The request timed out." : error.message };
    });
}

export function apiPUT(
  url: string,
  navigate: NavigateFunction,
  body?: any,
  contentType?: string,
  timeout = 3000
): Promise<any> {
  return api(url, "PUT", navigate, body, contentType, timeout);
}

export function apiGET(
  url: string,
  navigate: NavigateFunction,
  timeout = 3000
): Promise<any> {
  return api(url, "GET", navigate, undefined, undefined, timeout);
}

export function apiDELETE(
  url: string,
  navigate: NavigateFunction,
  timeout = 3000
): Promise<any> {
  return api(url, "DELETE", navigate, undefined, undefined, timeout);
}

export function apiPOST(
  url: string,
  navigate: NavigateFunction,
  body?: any,
  contentType?: string,
  timeout = 3000
): Promise<any> {
  return api(url, "POST", navigate, body, contentType, timeout);
}
