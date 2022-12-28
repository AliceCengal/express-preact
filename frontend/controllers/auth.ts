import useSWR from "swr";
import { authFetcher } from "utils/fetchers";

export type AuthForm = {
  email: string;
  password: string;
};

export async function postLogin(formData: AuthForm) {
  return fetch("/api/auth", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then(async (res) => {
    if (res.ok) return res.json();
    throw new Error(await res.text());
  });
}

export async function postRegister(formData: AuthForm) {
  return fetch("/api/auth", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  }).then(async (res) => {
    if (res.ok) return res.json();
    throw new Error(await res.text());
  });
}

export async function postLogout() {
  return fetch("/api/auth", {
    method: "DELETE",
    credentials: "include",
  }).then(async (res) => {
    if (res.ok) return res.text();
    throw new Error(await res.text());
  });
}

export function useProfile() {
  return useSWR("/api/auth", authFetcher);
}
