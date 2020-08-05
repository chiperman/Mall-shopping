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
<<<<<<< HEAD
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
=======
  Sidebar,
  SidebarItem,
  NavBar,
  Grid,
  GridItem,
  Col,
  Row,
  Image
>>>>>>> 9b495c4bf2a5008c2d2c6d9852d6d30a305fb491
} from 'vant'
Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Notify)
<<<<<<< HEAD
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
=======
  .use(Sidebar).use(SidebarItem).use(NavBar).use(Grid).use(GridItem).use(Col).use(Row).use(Image)

>>>>>>> 9b495c4bf2a5008c2d2c6d9852d6d30a305fb491
Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
