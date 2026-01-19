export async function appFetch({
  url,
  method,
  payLoad,
}: {
  url: string
  method: string
  payLoad?: string
}): Promise<Response | { error: Error }> {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: payLoad,
    })
    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(errorBody.errorMessage)
    }
    return response
  } catch (error) {
    console.error((error as Error).message)
    return {
      error: {
        name: 'Error',
        message: (error as Error).message,
      },
    }
  }
}
