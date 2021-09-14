import { createRouter, createWebHistory } from 'vue-router'
import Join from '../views/Join.vue'
import Home from '../views/Home.vue'
import UserFind from '../views/UserFind'
import Authorization from '../views/Authorization'
import ProFile from '../views/ProFile'
import PwChange from '../views/PwChange'
import Items from '../views/Items'
import Detail from '../views/Detail'
import Order from '../views/Order'
import Buy from '../views/Buy'
import TimeSale from '../views/TimeSale'
import Best from '../views/Best'
import New from '../views/New'
import OrderHistory from '../views/OrderHistory'

const routes = [
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/orderHistory',
    name: 'OrderHistory',
    component: OrderHistory
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/timeSale',
    name: 'TimeSale',
    component: TimeSale
  },
  {
    path: '/best',
    name: 'Best',
    component: Best
  },
  {
    path: '/buy',
    name: 'Buy',
    component: Buy
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
  {
    path: '/items',
    name: 'Items',
    component: Items
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/userfind',
    name: 'UserFind',
    component: UserFind
  },
  {
    path: '/profile',
    name: 'ProFile',
    component: ProFile
  },
  {
    path: '/authorization',
    name: 'Authorization',
    component: Authorization
  },
  {
    path: '/pwchange',
    name: 'PwChange',
    component: PwChange
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
