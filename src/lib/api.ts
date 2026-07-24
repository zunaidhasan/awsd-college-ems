/**
 * Typed fetch client for the AWSD College EMS backend (NestJS).
 *
 * - Base URL comes from NEXT_PUBLIC_API_URL (see .env.local).
 * - `credentials: "include"` sends/receives the httpOnly `access_token` cookie
 *   the backend sets on /auth/login, so protected routes work without manually
 *   handling tokens in JS (safer against XSS token theft).
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

export const USE_MOCK_AUTH =
  process.env.NEXT_PUBLIC_USE_MOCK_AUTH === "true";

export interface ApiErrorShape {
  statusCode?: number;
  message?: string | string[];
  error?: string;
}

/** Error thrown for any non-2xx backend response, with the parsed message. */
export class ApiError extends Error {
  status: number;
  body: ApiErrorShape | null;

  constructor(status: number, message: string, body: ApiErrorShape | null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

type Json = Record<string, unknown> | unknown[];

interface RequestOptions extends Omit<RequestInit, "body"> {
  /** Plain object serialized to JSON, or undefined for no body. */
  json?: Json;
}

/**
 * Core request helper. Prefixes API_BASE_URL, sends cookies, parses JSON,
 * and throws ApiError on failure with the backend's message extracted.
 */
export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { json, headers, ...rest } = options;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
      ...headers,
    },
    ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
  });

  // 204 No Content or empty body
  const text = await res.text();
  const data = text ? (JSON.parse(text) as unknown) : null;

  if (!res.ok) {
    const body = (data as ApiErrorShape) ?? null;
    const rawMessage = body?.message ?? body?.error ?? res.statusText;
    const message = Array.isArray(rawMessage)
      ? rawMessage.join(", ")
      : rawMessage;
    throw new ApiError(res.status, message, body);
  }

  return data as T;
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: "GET" }),
  post: <T>(path: string, json?: Json) =>
    apiFetch<T>(path, { method: "POST", json }),
  put: <T>(path: string, json?: Json) =>
    apiFetch<T>(path, { method: "PUT", json }),
  patch: <T>(path: string, json?: Json) =>
    apiFetch<T>(path, { method: "PATCH", json }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: "DELETE" }),
};
