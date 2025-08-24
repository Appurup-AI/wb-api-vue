<script setup lang="ts">
const emit = defineEmits(['filter'])
const filter = (e) => {
  emit('filter', e.target.value)
}
</script>
<template>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="all" checked @change="filter" />
    <span class="whitespace-nowrap ml-1">Все</span>
  </label>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="today" @change="filter" />
    <span class="whitespace-nowrap ml-1">Сегодняшние</span>
  </label>
  <label class="flex mr-4 items-center flex-nowrap">
    <input type="radio" name="show" value="past" @change="filter" />
    <span class="whitespace-nowrap ml-1">Прошлые</span>
  </label>
</template>
<style scoped></style>
