import { createRouter, createWebHistory } from 'vue-router'

// Views
import SubmitAddress from '@/views/SubmitAddress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/submitaddress',
    },
    {
      path: '/submitaddress',
      name: 'SubmitAddress',
      component: SubmitAddress,
    },
    {
      path: '/submitaddress/success',
      name: 'AddressSuccess',
      component: () => import('@/components/AddressSubmitSuccess.vue'),
    },
    {
      path: '/savedaddresses',
      name: 'savedaddress',
      component: () => import('@/views/SavedAddresses.vue'),
    },
  ],
})

export default router
