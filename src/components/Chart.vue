<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { computed, ref, watch } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  data: Object,
})

// Используем ref для хранения ключа, который будет форсировать перерисовку
const chartKey = ref(0)

const makeGraph = (arr) => {
  if (!arr) return []

  const result = arr.reduce((acc, city) => {
    const existing = acc.find((item) => item.name === city)
    if (existing) {
      existing.amount++
    } else {
      acc.push({ name: city, amount: 1 })
    }
    return acc
  }, [])

  return result
}

const dataGraph = computed(() => {
  if (!props.data) return []
  return makeGraph([...props.data.map((item) => item.warehouse_name)])
})

const dataGraphLabels = computed(() => dataGraph.value.map((el) => el.name))
const dataGraphAmount = computed(() => dataGraph.value.map((el) => el.amount))

const chartData = computed(() => ({
  labels: dataGraphLabels.value,
  datasets: [{ label: 'Города', data: dataGraphAmount.value }],
}))

const chartOptions = ref({
  responsive: true,
})

watch(
  () => props.data,
  () => {
    chartKey.value++
  },
)
</script>

<template>
  <Bar :key="chartKey" id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>
