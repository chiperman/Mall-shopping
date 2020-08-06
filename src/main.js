import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/index.js'
import Cookies from 'js-cookie'
import '@/assets/style/common.css'
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
  CountDown,
  Sidebar,
  SidebarItem,
  Grid,
  GridItem,
  Button,
  Field,
  Dialog,
  Progress,
  Cell,
  Checkbox,
  SwipeCell,
  Stepper,
  SubmitBar,
  CheckboxGroup,
  CellGroup,
  Radio,
  PasswordInput,
  Popup,
  NumberKeyboard,
  RadioGroup,
  ContactCard,
  Card,
  Panel,
  CouponCell,
  CouponList,
  ImagePreview,
  Tag,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Sku
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
  .use(Sidebar)
  .use(SidebarItem)
  .use(Grid)
  .use(GridItem)
  .use(Button)
  .use(Field)
  .use(Dialog)
  .use(Progress)
  .use(Cell)
  .use(Checkbox)
  .use(SubmitBar)
  .use(SwipeCell)
  .use(Stepper)
  .use(CheckboxGroup)
  .use(Radio)
  .use(CellGroup)
  .use(PasswordInput)
  .use(Popup)
  .use(RadioGroup)
  .use(NumberKeyboard)
  .use(ContactCard)
  .use(Card)
  .use(Panel)
  .use(CouponCell)
  .use(CouponList)
  .use(ImagePreview)
  .use(Tag)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Sku)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$Cookies = Cookies
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
