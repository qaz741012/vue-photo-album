import Vue from 'vue'
import Router from 'vue-router'
import Show from '@/views/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Show',
      name: 'Show',
      component: Show
    }
  ]
})
