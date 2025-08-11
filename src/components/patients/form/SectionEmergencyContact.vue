<template>
  <section class="form-section">
    <h2 class="section-title">
      <i class="ri-phone-line"></i> Emergency Contact <span class="optional">(optional)</span>
    </h2>

    <!-- Enable/Disable Emergency Contact -->
    <div class="form-group">
      <label>
        <input type="checkbox" v-model="enabled" />
        Add emergency contact information
      </label>
    </div>

    <div v-if="enabled" class="form-grid">
      <!-- Full name -->
      <div class="form-group" :class="{ error: errors.name, valid: form.name && !errors.name }">
        <label for="contactName">Full Name *</label>
        <input
          id="contactName"
          type="text"
          v-model="form.name"
          @input="validateField('name')"
        />
        <small v-if="errors.name" class="error-msg">{{ errors.name }}</small>
      </div>

      <!-- Relationship -->
      <div class="form-group" :class="{ error: errors.relationship, valid: form.relationship && !errors.relationship }">
        <label for="contactRelation">Relationship *</label>
        <select id="contactRelation" v-model="form.relationship" @change="validateField('relationship')">
          <option value="" disabled>Select an option</option>
          <option>Mother</option>
          <option>Father</option>
          <option>Partner</option>
          <option>Sibling</option>
          <option>Other</option>
        </select>
        <small v-if="errors.relationship" class="error-msg">{{ errors.relationship }}</small>
      </div>

      <!-- Phone -->
      <div class="form-group" :class="{ error: errors.phone, valid: form.phone && !errors.phone }">
        <label for="contactPhone">Phone *</label>
        <input
          id="contactPhone"
          type="tel"
          v-model="form.phone"
          placeholder="Ej: 5551234567"
          @input="validateField('phone')"
        />
        <small v-if="errors.phone" class="error-msg">{{ errors.phone }}</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionEmergencyContact',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      enabled: Object.keys(this.modelValue).some((key) => this.modelValue[key] !== ''),
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
    },
    enabled(val) {
      if (!val) {
        this.form = {
          name: '',
          relationship: '',
          phone: ''
        }
        this.errors = {}
        this.$emit('update:modelValue', this.form)
      }
    }
  },
  methods: {
    validateField(field) {
      switch (field) {
        case 'name':
          this.errors.name = this.form.name.trim() ? null : 'Full name is required'
          break

        case 'relationship':
          this.errors.relationship = this.form.relationship ? null : 'Relationship is required'
          break

        case 'phone': {
          const raw = this.form.phone.trim().replace(/\D/g, '')
          if (!raw) {
            this.errors.phone = 'Phone is required'
          } else if (raw.length !== 10) {
            this.errors.phone = 'Phone must be 10 digits'
          } else {
            this.form.phone = raw
            this.errors.phone = null
          }
          break
        }
      }
    },
    validate() {
      if (!this.enabled) {
        return {
          isValid: true,
          errors: {}
        }
      }

      this.validateField('name')
      this.validateField('relationship')
      this.validateField('phone')

      return {
        isValid: Object.values(this.errors).every(val => !val),
        errors: this.errors
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
  font-size: 1rem;
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
