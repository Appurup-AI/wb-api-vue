import { createRouter, createWebHistory } from 'vue-router'

import AppIncomes from '@/pages/AppIncomes.vue'
import AppOrders from '@/pages/AppOrders.vue'
import AppSales from '@/pages/AppSales.vue'
import AppStocks from '@/pages/AppStocks.vue'

const routes = [
  { path: '/', redirect: '/sales' },
  { path: '/sales', name: 'sales', component: AppSales },
  { path: '/orders', name: 'orders', component: AppOrders },
  { path: '/incomes', name: 'incomes', component: AppIncomes },
  { path: '/stocks', name: 'stocks', component: AppStocks },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
