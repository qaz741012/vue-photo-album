import Vue from 'vue'
import Router from 'vue-router'
import SignUp from '@/views/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
