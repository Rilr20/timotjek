import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Auth from '../views/Auth.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Auth
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})
router.beforeEach((to, from, next)=> {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('token');
  console.log(token);
  
  if (authRequired && token === "") {
    next('/login');
  } else {
    console.log("next");
    
    next();
  }
})

export default router
