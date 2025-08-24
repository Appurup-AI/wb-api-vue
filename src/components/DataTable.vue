<script setup lang="ts">
import { computed, ref } from 'vue'
import FiltersDropdown from './FiltersDropdown.vue'
import FiltersRadio from './FiltersRadio.vue'

const radioFilter = ref('')
const nameFilter = ref([])

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const filteredItems = computed(() => {
  let items = props.items

  switch (radioFilter.value) {
    case 'today':
      items = items.filter((item) => new Date(item.date).getDate() === new Date().getDate())
      break
    case 'past':
      items = items.filter((item) => new Date(item.date).getDate() < new Date().getDate())
      break
  }

  if (nameFilter.value.length) {
    items = items.filter((item) => nameFilter.value.includes(item.warehouse_name))
  }

  return items
})

const getColumns = (obj) => {
  return obj.map((el) => Object.keys(el))[0]
}

const handleRadioFilter = (filter) => {
  radioFilter.value = filter
}
const handleCheckboxFilter = (filter) => {
  if (nameFilter.value.includes(filter)) {
    return nameFilter.value.splice(nameFilter.value.indexOf(filter), 1)
  }

  return nameFilter.value.push(filter)
}
</script>
<template>
  <div class="bg-white relative border rounded-lg">
    <div class="flex w-full items-center gap-4 mb-8">
      <FiltersRadio @filter="handleRadioFilter" />
      <FiltersDropdown :items="items" @filter="handleCheckboxFilter" />
    </div>
    <table class="w-full text-sm text-left">
      <thead>
        <tr>
          <th v-for="column in getColumns(items)" :key="column" class="px-4 py-3">{{ column }}</th>
          <th class="px-4 py-3">
            <span class="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in filteredItems" :key="index">
          <th v-for="(value, index) in item" :key="index" class="px-4 py-3">{{ value }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
