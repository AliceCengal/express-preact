import { useQuery } from "react-query";
import wfetch from "utils/wrapped-fetch";

export interface User {
  id: string;
  email: string;
  name: string;
  Project?: { title: string; id: string }[];
}

export function useFetchUser(id: string) {
  return useQuery(["/api/user", id], async () => {
    return (await wfetch("/api/user/" + id)) as User;
  });
}
