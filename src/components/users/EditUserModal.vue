<template>
  <div class="modal-backdrop" @click.self="$emit('cancel')">
    <div class="modal-content">
      <section class="form-section">
        <h2 class="section-title">
          <i class="ri-user-settings-line"></i> Edit User
        </h2>

        <form @submit.prevent="handleSubmit" class="user-form">
          <div class="form-grid">
            <!-- Full Name -->
            <div class="form-group full" :class="{ error: errors.name }">
              <label for="name">Full Name *</label>
              <input
                id="name"
                v-model="form.name"
                placeholder="e.g. Dr. Alan Grant"
                @input="validateField('name')"
              />
              <small v-if="errors.name" class="error-msg">{{ errors.name }}</small>
            </div>

            <!-- Email -->
            <div class="form-group full" :class="{ error: errors.email }">
              <label for="email">Email *</label>
              <input
                id="email"
                type="email"
                v-model="form.email"
                placeholder="e.g. alan@example.com"
                @input="validateField('email')"
              />
              <small v-if="errors.email" class="error-msg">{{ errors.email }}</small>
            </div>

            <!-- Action Buttons -->
            <div class="modal-actions">
              <button type="button" class="btn cancel" @click="$emit('cancel')">
                <i class="ri-close-line"></i> Cancel
              </button>
              <button type="submit" class="btn confirm">
                <i class="ri-check-line"></i> Update
              </button>
            </div>

            <p v-if="error" class="form-error">
              <i class="ri-error-warning-line"></i> {{ error }}
            </p>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUserModal',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['cancel', 'update'],
  data() {
    return {
      form: { ...this.user },
      error: '',
      errors: {}
    }
  },
  methods: {
    validateField(field) {
      switch (field) {
        case 'name':
          this.errors.name = this.form.name.trim() ? null : 'Name is required.'
          break
        case 'email':
          this.errors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(this.form.email)
            ? null
            : 'Invalid email format.'
          break
      }
    },
    handleSubmit() {
      this.validateField('name')
      this.validateField('email')

      if (Object.values(this.errors).some(e => e)) return

      this.error = ''
      this.$emit('update', { ...this.form })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700&display=swap');

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #f2f2f2;
  padding: 1rem 2rem;
  width: 100%;
  max-width: 480px;
  border-radius: 1rem;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  animation: fadeUp 0.3s ease;
}

.form-section {
  font-family: 'Manrope', sans-serif;
}

/* ========== Title ========== */
.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: #0f172a;
}

.section-title i {
  font-size: 2rem;
  color: #3b82f6;
  font-weight: 400;
}

/* ========== Form ========== */
.form-grid {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group.full {
  width: 100%;
}

label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #334155;
  font-size: 0.95rem;
}

input {
  width: 94%;
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  outline: none;
}

input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.25);
}

/* ========== Actions ========== */
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.625rem;
  font-size: 0.95rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Manrope', sans-serif;
  transition: background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn.cancel {
  background-color: #f3f4f6;
  color: #374151;
  border: 1.5px solid #aeaeae;
}

.btn.cancel:hover {
  background-color: #e5e7eb;
  transform: translateY(-1px);
}

.btn.confirm {
  background-color: #3b82f6;
  color: white;
  border: 1.5px solid #3b82f6;
}

.btn.confirm:hover {
  background-color: #2563eb;
  transform: translateY(-1px);
}

/* ==========Error ========== */
.form-group.error input {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.15);
}

.error-msg {
  color: #dc2626;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

.form-error {
  margin-top: 1rem;
  color: #dc2626;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

/* ========== Animations ========== */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>