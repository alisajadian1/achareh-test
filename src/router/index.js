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
      path: '/submitaddres',
      name: 'SubmitAdress',
      component: SubmitAdress,
    },
    {
      path: '/selectonmap',
      name: 'SelectOnMap',
      component: () => import('@/components/LocationPicker.vue'),
    },
    // {
    //   path: '/submitaddres/submitted',
    //   name: 'Submitted',
    //   component: () => import('@/components/Submitted.vue'),
    // },
  ],
})

export default router
