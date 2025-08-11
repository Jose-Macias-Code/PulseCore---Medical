<template>
  <section class="form-section">
    <!-- Título -->
    <h2 class="section-title">
      <i class="ri-user-line"></i>
      Personal Information
    </h2>

    <!-- Datos Personales -->
    <div class="form-grid">
      <!-- First Name -->
      <div class="form-group" :class="{ error: errors.firstName, valid: form.firstName && !errors.firstName }">
        <label for="firstName">First Name(s) *</label>
        <input
          id="firstName"
          type="text"
          v-model="form.firstName"
          @input="toUpperCase('firstName'); validateField('firstName')"
        />
        <small v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</small>
      </div>

      <!-- Last Name -->
      <div class="form-group" :class="{ error: errors.lastName, valid: form.lastName && !errors.lastName }">
        <label for="lastName">Last Name(s) *</label>
        <input
          id="lastName"
          type="text"
          v-model="form.lastName"
          @input="toUpperCase('lastName'); validateField('lastName')"
        />
        <small v-if="errors.lastName" class="error-msg">{{ errors.lastName }}</small>
      </div>

      <!-- Date of Birth -->
      <div class="form-group" :class="{ error: errors.dob, valid: form.dob && !errors.dob }">
        <label for="dob">Date of Birth *</label>
        <input
          id="dob"
          type="date"
          v-model="form.dob"
          @change="calculateAge(); validateField('dob')"
        />
        <small v-if="errors.dob" class="error-msg">{{ errors.dob }}</small>
      </div>

      <!-- Age -->
      <div class="form-group">
        <label for="age">Age</label>
        <input
          id="age"
          type="number"
          :value="form.age"
          readonly
        />
      </div>

      <!-- Gender -->
      <div class="form-group" :class="{ error: errors.gender, valid: form.gender && !errors.gender }">
        <label for="gender">Gender *</label>
        <select id="gender" v-model="form.gender" @change="validateField('gender')">
          <option value="" disabled>Select an option</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <small v-if="errors.gender" class="error-msg">{{ errors.gender }}</small>
      </div>

      <!-- Primary Phone -->
      <div class="form-group" :class="{ error: errors.phone1, valid: form.phone1 && !errors.phone1 }">
        <label for="phone1">Primary Phone *</label>
        <input
          id="phone1"
          type="tel"
          v-model="form.phone1"
          placeholder="Ej: 5551234567"
          @input="validateField('phone1')"
        />
        <small v-if="errors.phone1" class="error-msg">{{ errors.phone1 }}</small>
      </div>

      <!-- Secondary Phone -->
      <div class="form-group">
        <label for="phone2">Secondary Phone <span class="optional">(optional)</span></label>
        <input
          id="phone2"
          type="tel"
          v-model="form.phone2"
          placeholder="Ej: 5551234567"
        />
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email <span class="optional">(optional)</span></label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="example@email.com"
        />
      </div>
    </div>

    <!-- Separador -->
    <div class="section-divider"></div>

    <!-- Dirección -->
    <div class="form-grid">
      <!-- Calle y Número -->
      <div class="form-group full">
        <label for="street">Street and Number <span class="optional">(optional)</span></label>
        <input
          id="street"
          type="text"
          v-model="form.address.street"
        />
      </div>

      <!-- Colonia -->
      <div class="form-group">
        <label for="colony">Neighborhood <span class="optional">(optional)</span></label>
        <input
          id="colony"
          type="text"
          v-model="form.address.colony"
        />
      </div>

      <!-- CP -->
      <div class="form-group">
        <label for="zip">Postal Code <span class="optional">(optional)</span></label>
        <input
          id="zip"
          type="text"
          v-model="form.address.zip"
        />
      </div>

      <!-- Ciudad/Estado -->
      <div class="form-group full">
        <label for="city">City / State <span class="optional">(optional)</span></label>
        <input
          id="city"
          type="text"
          v-model="form.address.city"
        />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionPersonalData',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(this.modelValue)),
      errors: {}
    }
  },
  watch: {
    form: {
      handler(newVal) {
        this.$emit('update:modelValue', newVal)
      },
      deep: true
    }
  },
  methods: {
    toUpperCase(field) {
      if (this.form[field]) {
        this.form[field] = this.form[field].toUpperCase()
      }
    },
    calculateAge() {
      const birthDate = new Date(this.form.dob)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      this.form.age = age
    },
    validate() {
      this.errors = {}

      if (!this.form.firstName.trim()) {
        this.errors.firstName = 'First name is required'
      }

      if (!this.form.lastName.trim()) {
        this.errors.lastName = 'Last name is required'
      }

      if (!this.form.dob) {
        this.errors.dob = 'Date of birth is required'
      }

      if (!this.form.gender) {
        this.errors.gender = 'Gender is required'
      }

      const phonePattern = /^\d{10}$/
      if (!this.form.phone1.trim()) {
        this.errors.phone1 = 'Primary phone is required'
      } else if (!phonePattern.test(this.form.phone1.trim())) {
        this.errors.phone1 = 'Invalid phone format'
      }

      return {
        isValid: Object.keys(this.errors).length === 0,
        errors: this.errors
      }
    },
    validateField(field) {
      switch (field) {
        case 'firstName':
          this.errors.firstName = this.form.firstName.trim() ? null : 'First name is required'
          break

        case 'lastName':
          this.errors.lastName = this.form.lastName.trim() ? null : 'Last name is required'
          break

        case 'dob':
          this.errors.dob = this.form.dob ? null : 'Date of birth is required'
          break

        case 'gender':
          this.errors.gender = this.form.gender ? null : 'Gender is required'
          break

        case 'phone1': {
          let phone = this.form.phone1.trim().replace(/\D/g, '')

          if (!phone) {
            this.errors.phone1 = 'Primary phone is required'
          } else if (phone.length !== 10) {
            this.errors.phone1 = 'Phone must be 10 digits'
          } else {
            this.form.phone1 = phone 
            this.errors.phone1 = null
          }

          break
        }
      }
    }
  }
}
</script>

<style scoped>
.form-section {
  background-color: #ffffff;
  padding: 1rem 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  animation: fadeUp 0.4s ease;
}

/* ======== Title ======== */
.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.section-title i {
  font-size: 1.6rem;
  color: #3b82f6;
  font-weight: 400;
}

.section-title::after {
  content: '';
  flex-grow: 1;
  height: 2px;
  background-color: #3b82f6;
  border-radius: 999px;
  margin-left: 0.75rem;
  transform: translateY(2px);
}

/* ======== Layout ======== */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full {
  grid-column: span 2;
}

.optional {
  font-weight: 500;
  font-size: 0.85rem;
  color: #94a3b8;
  font-style: italic;
  margin-left: 0.25rem;
}

/* ======== labels, inputs & select  ======== */
label {
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'Manrope', sans-serif;
  color: #334155;
  margin-bottom: 0.4rem;
}

input,
select {
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  outline: none;
  box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.02),
              inset -1px -1px 2px rgba(255, 255, 255, 0.7);
}

input:focus,
select:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

input::placeholder,
select::placeholder {
  color: #94a3b8;
  font-style: italic;
}

.section-divider {
  margin: 2rem 0 1.5rem;
  height: 1px;
  background-color: #e2e8f0;
  width: 100%;
}

/* ========== Error ========= */
.form-group.error input,
.form-group.error select {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}

.error-msg {
  margin-top: 0.25rem;
  color: #dc2626;
  font-size: 0.8rem;
  font-weight: 500;
}

.form-group.valid input,
.form-group.valid select {
  border-color: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.1);
}

/* ======== Animation ======== */
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