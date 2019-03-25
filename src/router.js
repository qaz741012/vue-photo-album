import Vue from 'vue'
import Router from 'vue-router'
import Edit from '@/views/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
