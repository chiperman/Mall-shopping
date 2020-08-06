import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/index.vue'
import category from '../views/category/category.vue'
import cart from '../views/cart/cart.vue'
import me from '../views/me/index.vue'
import set from '../views/set/set.vue'
import addressmanage from '../views/addressManage/addressmanage.vue'
import addressedit from '../views/addressEdit/addressedit.vue'
import search from '../views/search/search.vue'
import login from '../views/login/login.vue'
import register from '../views/register/register.vue'
import orderPayment from '../views/orderPayment/orderPayment.vue'
import submitOrder from '../views/cart/base/SubmitOrder'
import paySuccess from '../views/cart/base/PaySuccess'
import goodsDetails from '../views/goodsDetails/goodsDetails.vue'
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
      isLogin ? next() : next("/login")
    }
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
  },
  {
    path: '/goodsDetails/:goodsId',
    name: 'goodsDetails',
    component: goodsDetails,
    props: true
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
