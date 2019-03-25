import Vue from 'vue'
import Router from 'vue-router'
import ItemListElement from '@/components/ItemListElement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ItemListElement',
      name: 'ItemListElement',
      component: ItemListElement
    }
  ]
})
