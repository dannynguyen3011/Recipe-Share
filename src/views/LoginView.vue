<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>{{ isLogin ? 'Login' : 'Register' }}</h1>
      
      <div v-if="error" class="error-alert">
        {{ error }}
      </div>

      <!-- Test User Info -->
      <div v-if="isLogin" class="test-user-info">
        <h3>Test Account</h3>
        <div class="test-credentials">
          <p><strong>Email:</strong> sarah@recipe.com</p>
          <p><strong>Password:</strong> Recipe2024!</p>
        </div>
      </div>
      
      <form @submit.prevent="handleSubmit" class="auth-form" novalidate>
        <div class="form-group" v-if="!isLogin">
          <label for="name">Full Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            :class="{ 'error': v$.form.name.$error }"
            @blur="v$.form.name.$touch()"
            aria-required="true"
          >
          <span class="error-text" v-if="v$.form.name.$error">
            Name is required
          </span>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            :class="{ 'error': v$.form.email.$error }"
            @blur="v$.form.email.$touch()"
            aria-required="true"
          >
          <span class="error-text" v-if="v$.form.email.$error">
            {{ v$.form.email.email.$message || 'Email is required' }}
          </span>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            :class="{ 'error': v$.form.password.$error }"
            @blur="v$.form.password.$touch()"
            aria-required="true"
          >
          <span class="error-text" v-if="v$.form.password.$error">
            Password must be at least 6 characters
          </span>
        </div>

        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isSubmitting"
          @click="handleSubmit"
        >
          <span v-if="isSubmitting">Loading...</span>
          <span v-else>{{ isLogin ? 'Login' : 'Register' }}</span>
        </button>

        <p class="toggle-text">
          {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
          <button 
            type="button" 
            class="toggle-btn"
            @click="toggleMode"
          >
            {{ isLogin ? 'Register' : 'Login' }}
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import userService from '../services/userService'

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter()
    const isLogin = ref(true)
    const isSubmitting = ref(false)
    const error = ref('')

    const form = reactive({
      name: '',
      email: '',
      password: ''
    })

    const rules = {
      form: {
        name: { required: !isLogin.value },
        email: { required, email },
        password: { required, minLength: minLength(6) }
      }
    }

    const v$ = useVuelidate(rules, { form })

    // Watch for login mode changes to update validation rules
    watch(isLogin, (newVal) => {
      rules.form.name.required = !newVal
      v$.value.$reset()
    })

    const handleSubmit = async () => {
      console.log('Form submission started')
      error.value = ''
      const result = await v$.value.$validate()
      console.log('Validation result:', result)
      if (!result) {
        console.log('Validation failed')
        return
      }

      try {
        isSubmitting.value = true
        if (isLogin.value) {
          await userService.login(form.email, form.password)
        } else {
          await userService.register({
            name: form.name,
            email: form.email,
            password: form.password
          })
        }
        // After successful login or registration
        router.push('/')
      } catch (err) {
        console.error('Auth error:', err)
        error.value = err.message
      } finally {
        isSubmitting.value = false
      }
    }

    const toggleMode = () => {
      isLogin.value = !isLogin.value
      error.value = ''
      v$.value.$reset()
      form.name = ''
      form.email = ''
      form.password = ''
    }

    return {
      isLogin,
      isSubmitting,
      error,
      form,
      v$,
      handleSubmit,
      toggleMode
    }
  }
}
</script>

<style scoped>
.auth-container {
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f5f5f5;
  margin-top: 60px;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.auth-card h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.error-alert {
  background-color: #dc3545;
  color: white;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #333;
  font-weight: 500;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #1976d2;
}

.form-group input.error {
  border-color: #dc3545;
}

.error-text {
  color: #dc3545;
  font-size: 0.85rem;
}

.submit-btn {
  background-color: #1976d2;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1565c0;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.toggle-text {
  text-align: center;
  color: #666;
  margin-top: 1rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #1976d2;
  font-weight: 500;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
}

.toggle-btn:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }

  .auth-card h1 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .form-group input {
    padding: 0.5rem;
  }
}

.test-user-info {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.test-user-info h3 {
  color: #2d3748;
  font-size: 1rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.test-credentials {
  font-size: 0.9rem;
  color: #4a5568;
}

.test-credentials p {
  margin: 0.25rem 0;
}

.test-credentials strong {
  color: #2d3748;
  font-weight: 600;
}
</style> 