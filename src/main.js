import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index.js'
import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Lazyload,
  Notify,
  Sidebar,
  SidebarItem,
  NavBar,
  Grid,
  GridItem,
  Col,
  Row,
  Image
} from 'vant'
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Notify)
  .use(Sidebar).use(SidebarItem).use(NavBar).use(Grid).use(GridItem).use(Col).use(Row).use(Image)

Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
