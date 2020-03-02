import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Postcode from '@/components/Postcode'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/postcode',
      name: 'Postcode',
      component: Postcode
    }
  ]
})
