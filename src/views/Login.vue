<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" class="form-control mb-2" required>
      <input v-model="password" type="password" placeholder="Password" class="form-control mb-2" required>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
    <p class="mt-2 text-danger" v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      const user = JSON.parse(localStorage.getItem(this.email));
      if (user && user.password === this.password) {
        localStorage.setItem("currentUser", this.email);
        this.$router.push("/");
      } else {
        this.error = "Invalid email or password.";
      }
    }
  }
}
</script>
