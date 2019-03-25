import Vue from 'vue'
import Router from 'vue-router'
import AuthPanel from '@/components/AuthPanel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AuthPanel',
      name: 'AuthPanel',
      component: AuthPanel
    }
  ]
})
