<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        Recipe App
      </router-link>

      <!-- Main navigation links -->
      <div class="nav-links">
        <router-link to="/categories" class="nav-link" :class="{ active: $route.path === '/categories' }">Categories</router-link>
        <router-link to="/news" class="nav-link" :class="{ active: $route.path === '/news' }">News</router-link>
        <router-link to="/about" class="nav-link" :class="{ active: $route.path === '/about' }">About</router-link>
      </div>

      <!-- User profile section -->
      <div class="user-section" v-click-outside="closeDropdown">
        <template v-if="isAuthenticated">
          <div class="profile-menu" @click="handleProfileClick">
            <div class="avatar">
              <img :src="userAvatar" :alt="currentUser?.name" />
            </div>
            <span class="user-name">{{ currentUser?.name }}</span>
            <i class="arrow-down"></i>
          </div>
          
          <!-- Dropdown Menu -->
          <div v-show="showDropdown" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item">
              <i class="icon-profile"></i>
              My Profile
            </router-link>
            <router-link to="/saved-recipes" class="dropdown-item">
              <i class="icon-saved"></i>
              Saved Recipes
            </router-link>
            <router-link to="/voted-recipes" class="dropdown-item">
              <i class="icon-voted"></i>
              Voted Recipes
            </router-link>
            <div class="dropdown-divider"></div>
            <button @click="handleLogout" class="dropdown-item logout">
              <i class="icon-logout"></i>
              Logout
            </button>
          </div>
        </template>
        <router-link v-else to="/login" class="login-btn">
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import userService from '../services/userService'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import defaultAvatar from '../assets/default-avatar.svg'

export default {
  name: 'Navbar',
  directives: {
    'click-outside': {
      mounted(el, binding) {
        el.clickOutsideEvent = function(event) {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event)
          }
        }
        document.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  },
  setup() {
    const router = useRouter()
    const isAuthenticated = ref(false)
    const currentUser = ref(null)
    const showDropdown = ref(false)
    const userAvatar = ref(defaultAvatar)

    const checkAuth = () => {
      isAuthenticated.value = userService.isAuthenticated()
      currentUser.value = userService.getCurrentUser()
    }

    const handleAuthStateChanged = (event) => {
      isAuthenticated.value = event.detail.isAuthenticated
      currentUser.value = event.detail.user
      if (!event.detail.isAuthenticated) {
        showDropdown.value = false
      }
    }

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value
    }

    const closeDropdown = () => {
      showDropdown.value = false
    }

    const handleLogout = () => {
      userService.logout()
      router.push('/')
      closeDropdown()
    }

    const handleProfileClick = () => {
      router.push('/profile')
      closeDropdown()
    }

    onMounted(() => {
      checkAuth()
      window.addEventListener('auth-state-changed', handleAuthStateChanged)
      window.addEventListener('storage', checkAuth)
    })

    onUnmounted(() => {
      window.removeEventListener('auth-state-changed', handleAuthStateChanged)
      window.removeEventListener('storage', checkAuth)
    })

    return {
      isAuthenticated,
      currentUser,
      showDropdown,
      userAvatar,
      toggleDropdown,
      closeDropdown,
      handleLogout,
      handleProfileClick
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  padding: 0.75rem 2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
  margin: 0 2rem;
}

.nav-link {
  text-decoration: none;
  color: #4a5568;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.25rem 0;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #2d3748;
}

.nav-link.active {
  color: #1a202c;
  font-weight: 600;
}

.user-section {
  position: relative;
}

.profile-menu {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.profile-menu:hover {
  background-color: #f7fafc;
}

.avatar {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  overflow: hidden;
  background-color: #e2e8f0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  color: #2d3748;
  font-size: 0.95rem;
  font-weight: 500;
}

.arrow-down {
  border: solid #4a5568;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  margin-top: -3px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 200px;
  z-index: 1000;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #4a5568;
  text-decoration: none;
  transition: background-color 0.2s;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  font-size: 0.95rem;
}

.dropdown-item:hover {
  background-color: #f7fafc;
  color: #2d3748;
}

.dropdown-item i {
  font-size: 1.1rem;
  opacity: 0.7;
}

.dropdown-divider {
  height: 1px;
  background-color: #e2e8f0;
  margin: 0.5rem 0;
}

.logout {
  color: #e53e3e;
}

.logout:hover {
  background-color: #fff5f5;
  color: #c53030;
}

.login-btn {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background-color: #4299e1;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.login-btn:hover {
  background-color: #3182ce;
}

@media (max-width: 768px) {
  .navbar {
    padding: 0.75rem 1rem;
  }

  .nav-links {
    gap: 1.5rem;
    margin: 0 1rem;
  }

  .user-name {
    display: none;
  }
}

@media (max-width: 640px) {
  .nav-links {
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.9rem;
  }

  .logo {
    font-size: 1.25rem;
  }
}
</style> 