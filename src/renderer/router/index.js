import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/home.vue'
import Nofinished from '../pages/nofinished.vue'
import finished from '../pages/finished.vue'
import recycle from '../pages/recycle.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[{
    path:"/",
    name:"Home",
    component:Home,
  },
  {
    path:"/Nofinished",
    name:"Nofinished",
    component:Nofinished,
  },
  {
    path:"/finished",
    name:"finished",
    component:finished,
  },{
    path:"/recycle",
    name:"recycle",
    component:recycle,
  }
]
})
export default router;