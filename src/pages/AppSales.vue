<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import DataTable from '@/components/DataTable.vue'
import Chart from '@/components/Chart.vue'
import { useFetch } from '@/composables/useFetch.js'

const { data, loading, error, fetchData } = useFetch()

const show = ref('table')
const option = ref({
  limit: 100,
  dateFrom: '2025-08-24',
  dateTo: '2025-08-24',
  page: 1,
})
const temp = ref({
  dateFrom: '2025-08-24',
  dateTo: '2025-08-24',
})

const dataName = ref([])

const changeOptionPage = (page) => {
  if (option.value.page === page) return
  option.value.page = page
}

const handleDateChange = () => {
  option.value.dateFrom = temp.value.dateFrom
  option.value.dateTo = temp.value.dateTo
}

const fetchDataWithOption = async () => {
  const urlLink = new URLSearchParams({
    dateFrom: option.value.dateFrom,
    dateTo: option.value.dateTo,
    key: import.meta.env.VITE_API_KEY,
    page: option.value.page,
    limit: option.value.limit,
  })
  try {
    await fetchData({
      url: `/api/sales?${urlLink.toString()}`,
    })
  } catch (error) {
    console.error('Произошла ошибка:', error.message)
  }
}

onMounted(async () => {
  fetchDataWithOption()
})

watch(
  option,
  async () => {
    fetchDataWithOption()
  },
  { deep: true },
)
</script>
<template>
  <div class="data">
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="data" class="data">
      <div class="options">
        <label for="limit">На каждой странице:</label>
        <select name="limit" id="limit" v-model="option.limit">
          <option :value="100" selected>100</option>
          <option :value="250">250</option>
          <option :value="500">500</option>
        </select>

        <div class="date" @submit="handleDateChange">
          <label for="dateFrom">С какого числа:</label>
          <input
            type="text"
            name="dateFrom"
            id="dateFrom"
            v-model="temp.dateFrom"
            :placeholder="option.dateFrom"
          />
          <label for="dateTo">По какое число:</label>
          <input
            type="text"
            name="dateTo"
            id="dateTo"
            v-model="temp.dateTo"
            :placeholder="option.dateTo"
          />
          <button @click="handleDateChange">Подтвердить</button>
        </div>

        <div class="pagination">
          <button
            v-for="index in data.meta.last_page"
            :key="index"
            :class="{ current_page: data.meta.current_page === index }"
            @click="changeOptionPage(index)"
          >
            {{ index }}
          </button>
        </div>
      </div>
      <div class="show">
        <p>Показать</p>
        <button @click="show = 'table'" class="mr-4">Таблицу</button>
        <button @click="show = 'graph'">График</button>
      </div>
      <DataTable :items="data.data" v-if="show === 'table'" />
      <div v-if="show === 'graph'">
        <Chart :data="data.data" />
      </div>
    </div>
  </div>
</template>
