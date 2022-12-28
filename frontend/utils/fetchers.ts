export function authFetcher(url) {
  return fetch(url, {
    credentials: "include",
  }).then(async (res) => {
    if (res.ok) return res.json();
    return null;
  });
}
