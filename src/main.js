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
  Search,
  Sticky,
  NavBar,
  Divider,
  Row,
  Col,
  List,
  Icon,
  PullRefresh,
  Toast,
  Image,
  CountDown
} from 'vant'
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Notify)
  .use(Search)
  .use(Sticky)
  .use(NavBar)
  .use(Divider)
  .use(Row)
  .use(Col)
  .use(List)
  .use(Icon)
  .use(PullRefresh)
  .use(Toast)
  .use(Image)
  .use(CountDown)
Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
