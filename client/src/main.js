import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import Inventory from './views/Inventory.vue'
import Orders from './views/Orders.vue'
import Demand from './views/Demand.vue'
import Spending from './views/Spending.vue'
import Reports from './views/Reports.vue'
import './styles/tokens.css'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard, meta: { labelKey: 'nav.overview', icon: 'overview' } },
    { path: '/inventory', component: Inventory, meta: { labelKey: 'nav.inventory', icon: 'inventory' } },
    { path: '/orders', component: Orders, meta: { labelKey: 'nav.orders', icon: 'orders' } },
    { path: '/demand', component: Demand, meta: { labelKey: 'nav.demandForecast', icon: 'demand' } },
    { path: '/spending', component: Spending, meta: { labelKey: 'nav.finance', icon: 'finance' } },
    { path: '/reports', component: Reports, meta: { label: 'Reports', icon: 'reports' } }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
