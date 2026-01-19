export async function appFetch({ url, method, payLoad }: { url: string; method: string; payLoad: string }) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: payLoad,
  })
  return response
}
