import Vue from 'vue'
import Router from 'vue-router'
import PhotoForm from '@/components/PhotoForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/PhotoForm',
      name: 'PhotoForm',
      component: PhotoForm
    }
  ]
})
