<template>
  <div class="about-container">
    <div class="about-content">
      <section class="app-description">
        <h1>About Recipe App</h1>
        <p>
          Welcome to Recipe App, your ultimate destination for culinary inspiration! Our platform brings together food enthusiasts, home cooks, and professional chefs to share and discover delicious recipes from around the world. With features like recipe saving, voting, and categorization, we make it easy to find and organize your favorite dishes. Whether you're a beginner or an experienced cook, our detailed instructions and chef's tips will help you create amazing meals.
        </p>
      </section>

      <section class="user-greeting">
        <h2>Personalize Your Experience</h2>
        <div class="input-group">
          <div class="form-field">
            <label for="firstName">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              v-model="firstName" 
              placeholder="Enter your first name"
            >
          </div>
          <div class="form-field">
            <label for="lastName">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="lastName" 
              placeholder="Enter your last name"
            >
          </div>
        </div>
        <div class="welcome-message" v-if="showWelcome">
          <h3>Welcome, {{ fullName }}!</h3>
          <p>We're excited to have you explore our recipes.</p>
        </div>
      </section>

      <section class="image-selection">
        <h2>Choose Your View</h2>
        <div class="radio-group">
          <label class="radio-option">
            <input 
              type="radio" 
              v-model="selectedView" 
              value="mountain"
              name="view"
            >
            Mountain
          </label>
          <label class="radio-option">
            <input 
              type="radio" 
              v-model="selectedView" 
              value="ocean"
              name="view"
            >
            Oceanside
          </label>
        </div>
        <div class="image-container" v-if="selectedView">
          <img 
            :src="selectedImage" 
            :alt="selectedView === 'mountain' ? 'Mountain kitchen view' : 'Ocean dining view'"
            class="view-image"
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'AboutView',
  setup() {
    const firstName = ref('')
    const lastName = ref('')
    const selectedView = ref('')

    const fullName = computed(() => {
      if (firstName.value && lastName.value) {
        return `${firstName.value} ${lastName.value}`
      }
      return firstName.value || lastName.value
    })

    const showWelcome = computed(() => {
      return firstName.value.trim() !== '' || lastName.value.trim() !== ''
    })

    const selectedImage = computed(() => {
      if (selectedView.value === 'mountain') {
        return '/cos30043/s104181789/A3/mountain.jpg'
      } else if (selectedView.value === 'ocean') {
        return '/cos30043/s104181789/A3/ocean.jpg'
      }
      return ''
    })

    return {
      firstName,
      lastName,
      fullName,
      showWelcome,
      selectedView,
      selectedImage
    }
  }
}
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 80px auto 2rem;
  padding: 0 1rem;
}

.about-content {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.app-description,
.user-greeting,
.image-selection {
  padding: 2rem;
  border-bottom: 1px solid #e2e8f0;
}

.app-description h1 {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
}

.app-description p {
  color: #4a5568;
  line-height: 1.6;
  font-size: 1.1rem;
}

h2 {
  color: #2d3748;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: #4a5568;
  font-weight: 500;
}

input[type="text"] {
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input[type="text"]:focus {
  border-color: #4299e1;
  outline: none;
}

.welcome-message {
  background: #ebf8ff;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1.5rem;
}

.welcome-message h3 {
  color: #2b6cb0;
  margin: 0 0 0.5rem;
}

.welcome-message p {
  color: #4a5568;
  margin: 0;
}

.radio-group {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.radio-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.image-container {
  border-radius: 8px;
  overflow: hidden;
  max-height: 400px;
}

.view-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.view-image:hover {
  transform: scale(1.02);
}

/* Responsive Design - Desktop (default) */
@media (min-width: 1024px) {
  .about-content {
    display: grid;
    grid-template-columns: 1fr;
  }

  .image-container {
    height: 400px;
  }
}

/* Tablet */
@media (max-width: 1023px) and (min-width: 768px) {
  .about-container {
    margin: 60px auto 2rem;
  }

  .app-description,
  .user-greeting,
  .image-selection {
    padding: 1.5rem;
  }

  .image-container {
    height: 300px;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .about-container {
    margin: 40px auto 1rem;
  }

  .app-description,
  .user-greeting,
  .image-selection {
    padding: 1rem;
  }

  .app-description h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.25rem;
  }

  .input-group {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .radio-group {
    flex-direction: column;
    gap: 1rem;
  }

  .image-container {
    height: 200px;
  }
}
</style> 