import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/index.vue'
import category from '../views/category/category.vue'
import cart from '../views/cart/index.vue'
import me from '../views/me/index.vue'
import search from '../views/search/index.vue'
import set from '../views/set/set.vue'
import addressmanage from '../views/addressManage/addressmanage.vue'
import addressedit from '../views/addressEdit/addressedit.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/category',
    name: 'category',
    component: category
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/me',
    name: 'me',
    component: me
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/set',
    name: 'set',
    component: set
  },
  {
    path: '/addressmanage',
    name: 'addressmanage',
    component: addressmanage
  },
  {
    path: '/addressedit',
    name: 'addressedit',
    component: addressedit
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
