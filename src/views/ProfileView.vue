<template>
  <div class="profile-container">
    <div class="profile-header">
      <div class="profile-avatar">
        <img :src="userAvatar" :alt="currentUser?.name" />
      </div>
      <div class="profile-info">
        <h1>{{ currentUser?.name }}</h1>
        <p class="email">{{ currentUser?.email }}</p>
        <p class="member-since">Member since {{ formatDate(currentUser?.createdAt) }}</p>
      </div>
    </div>

    <div class="profile-content">
      <div class="profile-section">
        <h2>My Activity</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <h3>{{ votedRecipes.length }}</h3>
            <p>Recipes Voted</p>
          </div>
          <div class="stat-card">
            <h3>{{ savedRecipes.length }}</h3>
            <p>Recipes Saved</p>
          </div>
        </div>
      </div>

      <div class="profile-section">
        <h2>My Voted Recipes</h2>
        <div v-if="votedRecipes.length > 0" class="recipes-grid">
          <router-link 
            v-for="recipe in votedRecipes" 
            :key="recipe.id" 
            :to="'/recipe/' + recipe.id"
            class="recipe-card"
          >
            <img :src="recipe.image" :alt="recipe.title" />
            <div class="recipe-info">
              <h3>{{ recipe.title }}</h3>
              <p class="category">{{ recipe.category }}</p>
              <p class="description">{{ recipe.description }}</p>
              <div class="recipe-meta">
                <span>{{ recipe.prepTime }} prep</span>
                <span>{{ recipe.difficulty }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <p v-else class="no-items">No voted recipes yet</p>
      </div>

      <div class="profile-section">
        <h2>My Saved Recipes</h2>
        <div v-if="savedRecipes.length > 0" class="recipes-grid">
          <router-link 
            v-for="recipe in savedRecipes" 
            :key="recipe.id" 
            :to="'/recipe/' + recipe.id"
            class="recipe-card"
          >
            <img :src="recipe.image" :alt="recipe.title" />
            <div class="recipe-info">
              <h3>{{ recipe.title }}</h3>
              <p class="category">{{ recipe.category }}</p>
              <p class="description">{{ recipe.description }}</p>
              <div class="recipe-meta">
                <span>{{ recipe.prepTime }} prep</span>
                <span>{{ recipe.difficulty }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <p v-else class="no-items">No saved recipes yet</p>
      </div>

      <div class="profile-section">
        <h2>Account Settings</h2>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </div>

      <!-- Add this section for account deletion -->
      <div class="danger-zone">
        <h2>Danger Zone</h2>
        <div class="delete-account">
          <h3>Delete Account</h3>
          <p>Once you delete your account, there is no going back. Please be certain.</p>
          <button 
            @click="showDeleteConfirmation = true" 
            class="delete-btn"
          >
            Delete Account
          </button>
        </div>
      </div>

      <!-- Delete Account Confirmation Modal -->
      <div v-if="showDeleteConfirmation" class="modal-overlay">
        <div class="modal">
          <h2>Delete Account</h2>
          <p>Are you sure you want to delete your account? This action cannot be undone.</p>
          <div class="modal-actions">
            <button 
              @click="handleDeleteAccount" 
              class="delete-confirm-btn"
              :disabled="isDeleting"
            >
              {{ isDeleting ? 'Deleting...' : 'Yes, Delete My Account' }}
            </button>
            <button 
              @click="showDeleteConfirmation = false"
              class="cancel-btn"
              :disabled="isDeleting"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import userService from '../services/userService'
import defaultAvatar from '../assets/default-avatar.svg'

export default {
  name: 'ProfileView',
  setup() {
    const router = useRouter()
    const currentUser = ref(null)
    const votedRecipes = ref([])
    const savedRecipes = ref([])
    const userAvatar = ref(defaultAvatar)
    const showDeleteConfirmation = ref(false)
    const isDeleting = ref(false)

    onMounted(async () => {
      if (!userService.isAuthenticated()) {
        router.push('/login')
        return
      }

      currentUser.value = userService.getCurrentUser()
      try {
        // Get voted and saved recipe IDs
        const [votedIds, savedIds] = await Promise.all([
          userService.getVotedRecipes(),
          userService.getSavedRecipes()
        ])

        // Fetch full recipe details for each ID
        const allRecipes = await userService.getRecipes()
        
        // Map voted recipe IDs to full recipe objects
        votedRecipes.value = votedIds
          .map(id => allRecipes.find(recipe => recipe.id === id))
          .filter(recipe => recipe) // Remove any undefined entries
        
        // Map saved recipe IDs to full recipe objects
        savedRecipes.value = savedIds
          .map(id => allRecipes.find(recipe => recipe.id === id))
          .filter(recipe => recipe) // Remove any undefined entries

      } catch (error) {
        console.error('Error fetching user data:', error)
      }

      // Add event listener for recipe-saved events
      window.addEventListener('recipe-saved', handleRecipeSaved)
    })

    onUnmounted(() => {
      window.removeEventListener('recipe-saved', handleRecipeSaved)
    })

    const handleRecipeSaved = (event) => {
      const { recipeId, isSaved, recipe } = event.detail
      if (isSaved && recipe) {
        if (!savedRecipes.value.some(r => r.id === recipeId)) {
          savedRecipes.value = [...savedRecipes.value, recipe]
        }
      } else {
        savedRecipes.value = savedRecipes.value.filter(r => r.id !== recipeId)
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    const handleLogout = () => {
      userService.logout()
      router.push('/')
    }

    const handleDeleteAccount = async () => {
      try {
        isDeleting.value = true
        await userService.deleteAccount()
        router.push('/')
      } catch (error) {
        alert(error.message || 'Failed to delete account')
      } finally {
        isDeleting.value = false
        showDeleteConfirmation.value = false
      }
    }

    return {
      currentUser,
      votedRecipes,
      savedRecipes,
      userAvatar,
      formatDate,
      handleLogout,
      showDeleteConfirmation,
      isDeleting,
      handleDeleteAccount
    }
  }
}
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 80px auto 2rem;
  padding: 0 1rem;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #e2e8f0;
  background-color: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #f7fafc;
}

.profile-info h1 {
  margin: 0;
  font-size: 2rem;
  color: #1a202c;
}

.profile-info .email {
  color: #4a5568;
  margin: 0.5rem 0;
}

.member-since {
  color: #718096;
  font-size: 0.9rem;
  margin: 0;
}

.profile-content {
  margin-top: 2rem;
}

.profile-section {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-section h2 {
  margin: 0 0 1.5rem;
  color: #2d3748;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #f7fafc;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.stat-card h3 {
  margin: 0;
  font-size: 2rem;
  color: #2b6cb0;
}

.stat-card p {
  margin: 0.5rem 0 0;
  color: #4a5568;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.recipe-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  text-decoration: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.recipe-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recipe-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recipe-info {
  padding: 1rem;
}

.recipe-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2d3748;
  font-weight: 600;
}

.category {
  color: #4299e1;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  font-weight: 500;
}

.description {
  color: #718096;
  font-size: 0.9rem;
  margin: 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
  color: #718096;
  font-size: 0.85rem;
}

.recipe-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.no-items {
  color: #718096;
  text-align: center;
  padding: 2rem;
}

.logout-btn {
  background-color: #e53e3e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #c53030;
}

.danger-zone {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ff4444;
}

.danger-zone h2 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.delete-account {
  padding: 1rem;
  background-color: #fff5f5;
  border-radius: 4px;
}

.delete-account h3 {
  color: #dc3545;
  margin-bottom: 0.5rem;
}

.delete-account p {
  color: #666;
  margin-bottom: 1rem;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #c82333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
}

.modal h2 {
  color: #dc3545;
  margin-bottom: 1rem;
}

.modal p {
  color: #666;
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
}

.delete-confirm-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.delete-confirm-btn:hover:not(:disabled) {
  background-color: #c82333;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.cancel-btn:hover:not(:disabled) {
  background-color: #5a6268;
}

.delete-confirm-btn:disabled,
.cancel-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .profile-info h1 {
    font-size: 1.75rem;
  }
}
</style> 