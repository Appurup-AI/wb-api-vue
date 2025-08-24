<script setup lang="ts"></script>
<template>
  <header>
    <nav>
      <ul>
        <li>
          <router-link :to="{ name: 'sales' }"> Продажи </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'orders' }"> Заказы </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'incomes' }"> Доходы </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'stocks' }"> Склады </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
.router-link-active {
  border-bottom: 1px solid black;
}

nav {
  padding: 2rem;
}
ul {
  display: flex;
  gap: 4rem;
}
</style>
