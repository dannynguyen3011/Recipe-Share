import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import userService from '../services/userService'
import NewsView from '../views/NewsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    component: () => import('../views/CategoriesView.vue')
  },
  {
    path: '/category/:id',
    name: 'category',
    component: () => import('../views/CategoryView.vue')
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: () => import('../views/RecipeView.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/saved-recipes',
    name: 'SavedRecipes',
    component: () => import('../views/SavedRecipesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/voted-recipes',
    name: 'VotedRecipes',
    component: () => import('../views/VotedRecipesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/NewsView.vue')
  },
  // Catch all route - redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory('/cos30043/s104181789/A3/'),
  routes
})

// Navigation guard for authenticated routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!userService.isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
