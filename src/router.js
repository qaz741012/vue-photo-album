import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Login from '@/views/Login'
import SignUp from '@/views/SignUp'
import New from '@/views/New'
import Show from '@/views/Show'
import Edit from '@/views/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/photos/new',
      name: 'New',
      component: New
    },
    {
      path: '/photos/edit/:id',
      name: 'Edit',
      component: Edit
    },
    {
      path: '/photos/:id',
      name: 'Show',
      component: Show
    }
  ]
})
