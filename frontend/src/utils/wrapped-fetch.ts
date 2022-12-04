
export default function wfetch(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  return (
    fetch(input, init)
      .then(async (res) => {
        if (res.ok) return res.json();
        throw new Error(await res.text())
      })
  )
}
