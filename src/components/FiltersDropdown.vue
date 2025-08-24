<script setup lang="ts">
import { ref, computed } from 'vue'
const emit = defineEmits(['filter'])
const filter = (e) => {
  emit('filter', e.target.value)
}

const show = ref(false)
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const warehouseName = computed(() => {
  return [...new Set(props.items.map((item) => item.warehouse_name))]
})
</script>
<template>
  <div class="relative flex items-center px-4">
    <button
      @click="show = !show"
      class="w-full flex items-center justify-center py-2 px-4 font-medium text-gray-900"
    >
      По названию
    </button>
    <div v-show="show" class="absolute top-12 right-50% z-10 w-48 p-3 bg-white rounded-lg shadow">
      <h6 class="mb-3 font-medium text-gray-900">Города</h6>
      <ul class="space-y-2 text-sm font-medium text-gray-900">
        <li v-for="(name, index) in warehouseName" :key="name">
          <input
            :id="`filter_option_ ${index}`"
            type="checkbox"
            :value="name"
            class="w-4 h-4 bg-gray"
            @change="filter"
          />
          <label :for="`filter_option_ ${index}`" class="ml-2 text-sm font-medium text-gray-900">{{
            name
          }}</label>
        </li>
      </ul>
    </div>
  </div>
</template>
