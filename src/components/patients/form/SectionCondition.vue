<template>
  <section class="form-section">
    <h2 class="section-title">
      <i class="ri-stethoscope-line"></i> Current Condition
    </h2>

    <div class="form-grid">
      <!-- Reason for visit -->
      <div class="form-group full" :class="{ error: errors.reason }">
        <label for="reason">Reason for Visit *</label>
        <textarea
          id="reason"
          v-model="form.reason"
          @input="validateField('reason')"
          placeholder="e.g. Abdominal pain for two days"
        ></textarea>
        <small v-if="errors.reason" class="error-msg">{{ errors.reason }}</small>
      </div>

      <!-- Current Symptoms -->
      <div class="form-group full">
        <label>Current Symptoms</label>
        <div class="checkbox-group">
          <label v-for="symptom in predefinedSymptoms" :key="symptom">
            <input
              type="checkbox"
              :value="symptom"
              v-model="form.symptoms"
            />
            {{ symptom }}
          </label>
        </div>
      </div>

      <!-- Other Symptoms -->
      <div class="form-group full">
        <label for="other">Other Symptoms</label>
        <input
          id="other"
          v-model="otherSymptom"
          placeholder="Type a symptom and press Enter"
          @keydown.enter.prevent="addOtherSymptom"
        />
        <small class="hint">Press Enter to add to the list</small>
      </div>

      <!-- Tags -->
      <div class="form-group full" v-if="form.symptoms.length">
        <div class="selected-symptoms">
          <span
            class="symptom-tag"
            v-for="(symptom, index) in form.symptoms"
            :key="index"
          >
            {{ symptom }}
            <i class="ri-close-line" @click="removeSymptom(symptom)"></i>
          </span>
        </div>
      </div>

      <!-- Affected Area -->
      <div class="form-group full">
        <label for="area">Affected Area</label>
        <input
          id="area"
          type="text"
          v-model="form.affectedArea"
          placeholder="e.g. Left leg, chest"
        />
      </div>

      <!-- First Time? -->
      <div class="form-group full" :class="{ error: errors.firstTime }">
        <label>Is this the first time?</label>
        <div class="radio-group">
          <label>
            <input type="radio" value="yes" v-model="form.firstTime" @change="validateField('firstTime'); validateField('previousDescription')" />
            Yes
          </label>
          <label>
            <input type="radio" value="no" v-model="form.firstTime" @change="validateField('firstTime'); validateField('previousDescription')" />
            No
          </label>
        </div>
        <small v-if="errors.firstTime" class="error-msg">{{ errors.firstTime }}</small>
      </div>

      <!-- Previous Episodes -->
      <div class="form-group full" v-if="form.firstTime === 'no'" :class="{ error: errors.previousDescription }">
        <label for="previous">Previous Episodes Description</label>
        <textarea
          id="previous"
          v-model="form.previousDescription"
          @input="validateField('previousDescription')"
          placeholder="When or how did it happen before?"
        ></textarea>
        <small v-if="errors.previousDescription" class="error-msg">{{ errors.previousDescription }}</small>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionCondition',
  props: {
    modelValue: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: JSON.parse(JSON.stringify(this.modelValue)),
      errors: {},
      otherSymptom: '',
      predefinedSymptoms: ['Fever', 'Cough', 'Pain', 'Fatigue']
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
    addOtherSymptom() {
      const trimmed = this.otherSymptom.trim()
      if (trimmed && !this.form.symptoms.includes(trimmed)) {
        this.form.symptoms.push(trimmed)
        this.otherSymptom = ''
      }
    },
    removeSymptom(symptom) {
      this.form.symptoms = this.form.symptoms.filter(s => s !== symptom)
    },
    validateField(field) {
      switch (field) {
        case 'reason':
          this.errors.reason = this.form.reason.trim()
            ? null
            : 'Reason is required'
          break

        case 'firstTime':
          this.errors.firstTime = this.form.firstTime
            ? null
            : 'Please select an option'
          break

        case 'previousDescription':
          if (this.form.firstTime === 'no') {
            this.errors.previousDescription = this.form.previousDescription.trim()
              ? null
              : 'Description required for previous episodes'
          } else {
            this.errors.previousDescription = null
          }
          break
      }
    },
    validate() {
      this.validateField('reason')
      this.validateField('firstTime')
      this.validateField('previousDescription')

      return {
        isValid: Object.values(this.errors).every(e => !e),
        errors: this.errors
      }
    }
  }
}
</script>

<style scoped>
.form-section {
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  margin-bottom: 2rem;
  background-color: #fff;
  animation: fadeUp 0.3s ease;
}

/* ========== Title ========== */
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
  font-size: 1.8rem;
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
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full {
  width: 100%;
}

/* ======== labels, inputs & select  ======== */
label {
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #334155;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
}

input,
select,
textarea {
  padding: 0.7rem 0.9rem;
  font-size: 0.95rem;
  font-family: 'Manrope', sans-serif;
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  background-color: #f8fafc;
  transition: all 0.2s ease;
  outline: none;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

input::placeholder,
textarea::placeholder {
  color: #94a3b8;
  font-style: italic;
}

textarea {
  min-height: 100px;
  max-height: 200px; 
  resize: vertical;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.radio-group {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.selected-symptoms {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.symptom-tag {
  background-color: #e2e8f0;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-family: 'Manrope', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.symptom-tag i {
  cursor: pointer;
  font-size: 1rem;
  color: #475569;
  transition: color 0.2s ease;
}

.symptom-tag i:hover {
  color: #dc2626;
}

.hint {
  font-size: 0.75rem;
  color: #94a3b8;
  font-style: italic;
  margin-top: 0.25rem;
}

/* ========== Error ========= */
.form-group.error textarea,
.form-group.error input,
.form-group.error select {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}

.error-msg {
  color: #dc2626;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 0.25rem;
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