import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/index.vue'
import category from '../views/category/category.vue'
import cart from '../views/cart/cart.vue'
import me from '../views/me/me.vue'
import search from '../views/search/search.vue'
import login from '../views/login/login.vue'
import register from '../views/register/register.vue'
import orderPayment from '../views/orderPayment/orderPayment.vue'
import submitOrder from '../views/cart/base/SubmitOrder'
import paySuccess from '../views/cart/base/PaySuccess'
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
    component: cart,
    beforeEnter: (to, from, next) => {
      var isLogin = localStorage.getItem("isLogin")
      isLogin === 'false' ? isLogin = false : isLogin = true
      console.log(isLogin)
      isLogin ? next() : next("/login")
    }
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/me',
    name: 'me',
    component: me,
    beforeEnter: (to, from, next) => {
      var isLogin = localStorage.getItem("isLogin")
      isLogin === 'false' ? isLogin = false : isLogin = true
      console.log(isLogin)
      isLogin ? next() : next("/login")
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/orderPayment',
    name: 'orderPayment',
    component: orderPayment
  },
  {
    path: '/submitOrder',
    name: 'submitOrder',
    component: submitOrder
  },
  {
    path: '/paySuccess',
    name: 'paySuccess',
    component: paySuccess
  }
]

const router = new VueRouter({
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
export default router
