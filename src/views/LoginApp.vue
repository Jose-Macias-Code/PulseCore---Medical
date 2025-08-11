<template>
  <div>
    <!-- Image -->
    <svg class="login__blob" viewBox="0 0 900 840">
      <mask id="mask0" mask-type="alpha">
        <path d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
         0H900V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
         591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
         167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z" />
      </mask>

      <g mask="url(#mask0)">
        <path d="M342.407 73.6315C388.53 56.4007 394.378 17.3643 391.538 
         0H900V840H0C14.5385 834.991 100.266 804.436 77.2046 707.263C49.6393 
         591.11 115.306 518.927 176.468 488.873C363.385 397.026 156.98 302.824 
         167.945 179.32C173.46 117.209 284.755 95.1699 342.407 73.6315Z" />
        <image class="login__img" href="../assets/login-img/bg-img.jpg" />
      </g>
    </svg>

    <!-- Login -->
    <div class="login container grid">
      <div class="login__access">
        <h1 class="login__title">
          <span class="login__title-highlight">Welcome back</span><br />
          Log in to your <span class="login__title-underline">account</span>
        </h1>

        <div class="login__area">
          <form class="login__form" @submit.prevent="handleSubmit">
            <div class="login__content grid">
              <div>
                <div class="login__box" :class="{ 'error-border': emailError }">
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    @focus="focusedField = 'email'"
                    @blur="focusedField = ''; validateEmailLive()"
                    class="login__input"
                    required
                  />
                  <label
                    for="email"
                    class="login__label"
                    :class="{ active: focusedField === 'email' || email, 'error-label': emailError }"
                  >
                    Email
                  </label>
                  <i class="ri-mail-fill login__icon"></i>
                </div>
                <span v-if="emailError" class="login__error">{{ emailError }}</span>
              </div>

              <div>
                <div class="login__box" :class="{ 'error-border': passwordError }">
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    id="password"
                    v-model="password"
                    @focus="focusedField = 'password'"
                    @blur="focusedField = ''; validatePasswordLive()"
                    class="login__input"
                    required
                  />
                  <label
                    for="password"
                    class="login__label"
                    :class="{ active: focusedField === 'password' || password, 'error-label': passwordError }"
                  >
                    Password
                  </label>
                  <i
                    :class="showPassword ? 'ri-eye-fill' : 'ri-eye-off-fill'"
                    class="login__icon login__password"
                    @click="togglePassword"
                  ></i>
                </div>
                <span v-if="passwordError" class="login__error">{{ passwordError }}</span>
              </div>
            </div>
            <button type="submit" class="login__button">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginApp',

  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      emailError: '',
      passwordError: '',
      focusedField: ''
    }
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },

    validateEmailLive() {
      this.emailError = this.validateEmail(this.email)
        ? ''
        : 'Please enter a valid email address.'
    },

    validatePasswordLive() {
      this.passwordError = this.validatePassword(this.password)
    },

    validateEmail(email) {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return pattern.test(email)
    },

    validatePassword(password) {
      if (password.length < 8)
        return 'Password must be at least 8 characters long.'
      if (!/[a-z]/.test(password))
        return 'Password must contain at least one lowercase letter.'
      if (!/[A-Z]/.test(password))
        return 'Password must contain at least one uppercase letter.'
      if (!/[0-9]/.test(password))
        return 'Password must contain at least one number.'
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
        return 'Password must contain at least one special character.'
      return ''
    },

    async handleSubmit() {
      this.validateEmailLive()
      this.validatePasswordLive()
      if (this.emailError || this.passwordError) return

      this.$router.replace({ name: 'dashboard' })
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap");

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body,
input,
button {
  font-family: "Poppins", system-ui;
  font-size: 0.938rem;
  background-color: #ffffff;
  color: #6c757d;
}

input,
button {
  border: none;
  outline: none;
}

a {
  text-decoration: none;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 1120px;
  margin-inline: 1.5rem;
}

.grid {
  display: grid;
  gap: 1rem;
}

/*============ Login ============*/
.login {
  position: relative;
  max-height: 90vh;
  margin-top: 3rem;
  align-items: start;
  overflow: hidden;
  display: grid;
}

.login__blob {
  display: none;
}

.login__title {
  font-size: 2rem;
  color: #0f172a;
  text-align: center;
  margin-bottom: 2rem;
  line-height: 1.3;
  font-weight: 600;
  animation: fadeDown 0.6s ease-in-out;
  position: relative;
  font-family: 'Manrope', sans-serif;
}

.login__title-highlight {
  display: inline-block;
  color: #007bff;
  font-weight: 800;
  font-size: 3.3rem;
  letter-spacing: -0.5px;
}

.login__title-underline {
  position: relative;
  z-index: 1;
}

.login__title-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0.1em;
  width: 100%;
  height: 0.25em;
  background-color: #007bff;
  opacity: 0.3;
  z-index: -1;
  border-radius: 2px;
}

.login__box {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f1f5f9; 
  border-radius: 1rem;
  animation: fadeDown 0.8s ease-in-out;
}

.login__input {
  background: none;
  width: 100%;
  padding: 2rem 2.5rem 1rem 1.25rem; 
  font-weight: 600;
  border: 3px solid transparent;
  border-radius: 1rem;
  z-index: 1;
  transition: border-color 0.4s;
  color: #0f172a;
  box-sizing: border-box;
}

.login__label {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  transition:
    top 0.6s ease,        
    transform 0.6s ease,   
    font-size 0.6s ease,
    color 0.6s ease;
  color: #6c757d;
  background: #f1f5f9;
  padding: 0 5px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login__label.active {
  top: 1.2rem;
  font-size: 0.8rem;
  color: #007bff;  
}

.login__label.error-label {
  color: #ec1a03 !important;
}

.login__icon {
  position: absolute;
  right: 1rem;
  font-size: 1.25rem;
  transition: color 0.4s;
  color: #6c757d;
}

.login__password {
  cursor: pointer;
  z-index: 10;
}

.login__button {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  background-color: #007bff;
  color: #fff;
  font-weight: 600;
  padding-block: 1.5rem;
  border-radius: 4rem;
  margin-block: 2rem;
  cursor: pointer;
  transition: background-color 0.4s, box-shadow 0.4s;
  animation: fadeDown 1s ease-in-out;
}

.login__button:hover {
  background-color: #0069d9;
  box-shadow: 0 8px 24px rgba(0, 123, 255, 0.3);
}

.login__access {
  width: 100%;
}

.login__error {
  color: #ec1a03;
  font-size: .85rem;
  margin-top: 0.25rem;
  display: block;
  font-weight: 600;
  padding-left: 1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login__input.invalid ~ .login__label {
  color: #ec1a03;
}

.login__input:focus ~ .login__icon,
.login__input.filled ~ .login__icon {
  color: #007bff;
}

.login__input:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(35, 163, 110, 0.2);
  outline: none;
}

/* ========== Animations ======== */
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* ========== Responsive ========== */
@media screen and (max-width: 320px) {
  .container {
    margin-inline: 1rem;
  }
}

@media screen and (max-width: 540px) {
  .login__title {
    font-size: 1.5rem;
  }
  .login__title-highlight {
    font-size: 2rem;
  }
  .login__title-underline {
    font-size: 1.4rem;
  }
}

@media screen and (min-width: 350px) and (max-height: 600px) {
  .login {
    height: 760px;
  }
}

@media screen and (min-width: 1150px) {
  .container {
    margin-inline: auto;
  }
  .login__area {
    width: 460px;
    margin: initial;
  }
  .login__access {
    width: 600px;
  }
  .login__title {
    text-align: initial;
    margin-bottom: 3rem;
  }
  .login__button {
    margin-bottom: 3rem;
  }
  .login__blob {
    display: block;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
  }
  .login__img {
    transform: translate(0rem, 0rem);
  }
}
</style>