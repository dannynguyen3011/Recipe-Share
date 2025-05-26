# Recipe Share App

A Vue.js application for sharing and discovering recipes. This app allows users to browse recipes, save favorites, and interact with a community of food enthusiasts.

## Project Structure

```
Recipe Share/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── views/
│   │   │   │   ├── mountain.jpg
│   │   │   │   └── ocean.jpg
│   │   │   ├── empty-votes.svg
│   │   │   └── empty-saved.svg
│   │   ├── default-avatar.svg
│   │   └── vue.svg
│   ├── components/
│   │   └── RecipeCard.vue
│   ├── views/
│   │   ├── About.vue
│   │   └── AboutView.vue
│   ├── App.vue
│   └── main.js
├── public/
│   └── vite.svg
├── vite.config.js
└── package.json
```

## Key Components

### About.vue
```vue
<template>
  <div>
    <h2>About This App</h2>
    <p>This app helps users share and find amazing recipes!</p>

    <div class="mb-3">
      <input v-model="firstName" placeholder="First Name" class="form-control mb-2">
      <input v-model="lastName" placeholder="Last Name" class="form-control mb-2">
      <p v-if="firstName || lastName">Welcome, {{ fullName }}!</p>
    </div>

    <div>
      <label><input type="radio" value="Mountain" v-model="selection" /> Mountain</label>
      <label class="ms-3"><input type="radio" value="Ocean" v-model="selection" /> Ocean</label>
      <div class="mt-3">
        <img v-if="selection" :src="imageUrl" class="img-fluid" alt="Selected" />
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-md-6">
        <img :src="'/cos30043/s104181789/A3/assets/images/views/mountain.jpg'" class="img-fluid rounded" alt="Mountain View">
      </div>
      <div class="col-md-6">
        <img :src="'/cos30043/s104181789/A3/assets/images/views/ocean.jpg'" class="img-fluid rounded" alt="Ocean View">
      </div>
    </div>
  </div>
</template>

<script>
const BASE_URL = '/cos30043/s104181789/A3'

export default {
  name: 'About',
  data() {
    return {
      firstName: '',
      lastName: '',
      selection: ''
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`.trim()
    },
    imageUrl() {
      return this.selection === 'Mountain'
        ? `${BASE_URL}/assets/images/views/mountain.jpg`
        : `${BASE_URL}/assets/images/views/ocean.jpg`
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  margin: 0 -15px;
}

.col-md-6 {
  flex: 0 0 50%;
  padding: 0 15px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.rounded {
  border-radius: 8px;
}

.mb-3 {
  margin-bottom: 1rem;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.mt-3 {
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 1.5rem;
}

.ms-3 {
  margin-left: 1rem;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
</style>
```

### AboutView.vue
```vue
<template>
  <div class="about-container">
    <div class="about-content">
      <section class="app-description">
        <h1>About Recipe App</h1>
        <p>
          Welcome to Recipe App, your ultimate destination for culinary inspiration! Our platform brings together food enthusiasts, home cooks, and professional chefs to share and discover delicious recipes from around the world. With features like recipe saving, voting, and categorization, we make it easy to find and organize your favorite dishes.
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
        return '/cos30043/s104181789/A3/assets/images/views/mountain.jpg'
      } else if (selectedView.value === 'ocean') {
        return '/cos30043/s104181789/A3/assets/images/views/ocean.jpg'
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

/* Responsive Design */
@media (min-width: 1024px) {
  .about-content {
    display: grid;
    grid-template-columns: 1fr;
  }

  .image-container {
    height: 400px;
  }
}

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
```

### vite.config.js
```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/cos30043/s104181789/A3/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
```

## Setup and Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Image Assets

Place images in the following directory structure:
```
src/assets/images/views/
├── mountain.jpg
└── ocean.jpg
```

## Base URL Configuration

The application is configured to run under the base URL `/cos30043/s104181789/A3/`. This is set in `vite.config.js` and must be used when referencing assets and routes.

## Responsive Design

The application includes responsive design with breakpoints:
- Desktop: ≥1024px
- Tablet: 768px-1023px
- Mobile: <768px

## Features

1. User Personalization
   - Name input fields
   - Welcome message
   - View selection

2. Image Views
   - Mountain view option
   - Ocean view option
   - Responsive image containers

3. Styling
   - Modern UI components
   - Smooth transitions
   - Hover effects
   - Responsive layout

## Notes

- All image paths must include the base URL: `/cos30043/s104181789/A3/`
- Images are stored in `src/assets/images/views/`
- The application uses Vue 3 with Composition API
- Styles are scoped to components
