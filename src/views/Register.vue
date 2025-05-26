<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" required>
      <input v-model="password" type="password" placeholder="Password" class="form-control mb-2" required>
      <button type="submit" class="btn btn-success">Register</button>
    </form>
    <p class="mt-2 text-success" v-if="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    register() {
      const user = { email: this.email, password: this.password };
      localStorage.setItem(this.email, JSON.stringify(user));
      this.message = "Registration successful. You can now login.";
      this.email = '';
      this.password = '';
    }
  }
}
</script>
