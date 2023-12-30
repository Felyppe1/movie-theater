import { useEffect, useState } from "react";

type UseFetchProps = {
  method?: string
  headers?: HeadersInit
  body?: BodyInit
}

export function useFetch<T>(url: string, {method = 'GET', headers, body}: UseFetchProps) {
  const [data, setData] = useState([] as T) // TODO: make it not have undefined type
  const [errorStatus, setErrorStatus] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      
      try {
        const response = await fetch(url, {
          method,
          headers,
          body
        })

        if (!response.ok) {
          throw (response)
        }
    
        const responseData = await response.json()

        setData(responseData)
      } catch(error) {
        if (error instanceof Response) {
          setErrorStatus(error.status)
        }
      } finally {
        setIsLoading(false)
      }

    }

    fetchData()
  }, [])

  return { data, errorStatus, isLoading }
}