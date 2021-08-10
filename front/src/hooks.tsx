import { useState, useEffect } from 'react'
import axios from 'axios'

export const useFetch = function <T>(uri: string) {
  const [data, setData] = useState<T>()
  const [error] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(uri)
      setLoading(false)
      console.log(result.data)
      setData(result.data)
    }
    fetchData()
  }, [uri])

  return {
    data,
    error,
    loading,
  }
}
