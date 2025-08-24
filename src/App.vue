<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <RouterView />
</template>
<style>
.loading {
  text-align: center;
  margin-top: 4rem;
  font-size: 2.5rem;
  color: #efeaea;
}
.error {
  color: red;
  text-align: center;
  font-size: 18px;
}
.data-list {
  width: 90%;
  display: flex;
  justify-content: space-between;
  list-style: none;
  flex-wrap: wrap;
}

.data-item {
  border: 1px solid #ddd;
  flex-basis: 30%;
  padding: 0.5rem;
  margin: 0.7rem 0;
}

.pagination {
  display: flex;
  gap: 1rem;
  margin-left: 1rem;
}

.current_page {
  border-bottom: 1px solid black;
}
</style>
