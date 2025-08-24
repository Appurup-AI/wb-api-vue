import { ref } from 'vue'

export function useFetch() {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchData = async (config) => {
    loading.value = true
    try {
      const response = await fetch(`${import.meta.env.VITE_API_HOST}${config.url}`, {
        method: config.method || 'GET',
        headers: config.headers || {},
        body: config.body ? JSON.stringify(config.body) : null,
      })
      if (!response.ok) {
        const errText = await response.text()
        throw new Error(`Ошибка! статус: ${response.status}, ${errText}`)
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err.message
      throw new Error(`Ошибка при соединении: ${err.message}`)
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    fetchData,
  }
}
