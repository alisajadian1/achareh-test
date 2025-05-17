import { createRouter, createWebHistory } from 'vue-router'

// Views
import SubmitAddress from '@/views/SubmitAddress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/submit-address',
    },
    {
      path: '/submit-address',
      name: 'SubmitAddress',
      component: SubmitAddress,
    },
    {
      path: '/submit-address/success',
      name: 'AddressSuccess',
      component: () => import('@/components/AddressSubmitSuccess.vue'),
    },
    {
      path: '/saved-addresses',
      name: 'savedaddress',
      component: () => import('@/views/SavedAddresses.vue'),
    },
  ],
})

export default router
