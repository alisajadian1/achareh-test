import { createRouter, createWebHistory } from 'vue-router'

// Views
import SubmitAdress from '@/views/SubmitAdress.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/submitaddres', // Redirect home to SubmitAdress
    },
    {
      path: '/submitaddress',
      name: 'SubmitAdress',
      component: SubmitAdress,
    },
    {
      path: '/selectonmap',
      name: 'SelectOnMap',
      component: () => import('@/components/LocationPicker.vue'),
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
