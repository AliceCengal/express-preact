import { useQuery } from "react-query";

export type AuthForm = {
  email: string,
  password: string
}

export async function postLogin(formData: AuthForm) {
  return fetch("/api/auth/login", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(async (res) => {
      if (res.ok) return res.json();
      throw new Error(await res.text())
    })
}

export async function postRegister(formData: AuthForm) {
  return fetch("/api/auth/register", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(async (res) => {
      if (res.ok) return res.json();
      throw new Error(await res.text())
    })
}

export async function postLogout() {
  return fetch("/api/auth", {
    method: "DELETE",
    credentials: 'include'
  })
    .then(async (res) => {
      if (res.ok) return res.text();
      throw new Error(await res.text())
    })
}

export async function getProfile() {
  return fetch("/api/auth", {
    credentials: 'include'
  })
    .then(async (res) => {
      if (res.ok) return res.json();
      return null
    })
}

export function useProfile() {
  return useQuery(
    ['/api/auth'],
    getProfile,
    {
      refetchOnWindowFocus: false,
      staleTime: 3600 * 1000,
    }
  )
}
