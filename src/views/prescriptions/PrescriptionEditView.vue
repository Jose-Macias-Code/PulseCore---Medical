<template>
  <div class="prescriptions-create-view">
    <div v-if="showValidationError" class="toast-error">
      <i class="ri-error-warning-line icon"></i>
      Please complete at least one valid medication before saving.
    </div>

    <!-- Header -->
    <section class="header">
      <div class="header-text">
        <h1 class="header-title">
          <i class="ri-edit-line icon-title"></i>
          Edit Recipe For <span class="name-patient">{{ selectedPatient?.firstName }}</span>
        </h1>
      </div>

      <div class="header-actions">
        <router-link to="/prescriptions" class="btn ghost-btn">
          <i class="ri-arrow-left-line"></i>
          Back to Prescriptions
        </router-link>

        <router-link
          v-if="selectedPatient"
          :to="{
            name: 'prescriptions-view',
            params: { id: selectedPatient.id || 1 }, 
            query: { first_name: selectedPatient.firstName }
          }"
          class="btn return-btn"
        >
          <i class="ri-eye-line"></i>
          View Details
        </router-link>
      </div>
    </section>

    <div class="form-container">

      <PrescriptionForm v-model="formData" ref="prescriptionForm" />

      <div class="form-actions">
        <button class="btn save" @click="handleSubmit">
          <i class="ri-check-line"></i>
          Update Prescription
        </button>

        <router-link to="/prescriptions" class="btn cancel">
          <i class="ri-close-line"></i>
          Cancel
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PrescriptionForm from '../../components/prescriptions/PrescriptionForm.vue'

export default {
  name: 'PrescriptionEditView',
  components: {
    PrescriptionForm
  },
  data() {
    return {
      selectedPatient: null,
      formData: {
        medications: [],
        notes: ''
      },
      showValidationError: false
    }
  },
  created() {
    const id = +this.$route.params.id

    const mockPrescriptions = [
      {
        id: 1,
        patient: { firstName: 'Juan', phone: '5551234567' },
        medications: [
          { drug: 'Paracetamol', dosage: '500mg', frequency: '3 times a day', duration: 7 }
        ],
        notes: 'Take with food.'
      },
      {
        id: 2,
        patient: { firstName: 'Juan', phone: '5551234567' },
        medications: [
          { drug: 'Amoxicilina', dosage: '100mg', frequency: '2 times a day', duration: 5 }
        ],
        notes: ''
      },
    ]

    const found = mockPrescriptions.find(p => p.id === id)
    if (found) {
      this.selectedPatient = {
        id,
        ...found.patient
      }
      this.formData = {
        medications: found.medications,
        notes: found.notes
      }
    }
  },
  methods: {
    handleSubmit() {
      const isValid = this.$refs.prescriptionForm?.isValidPrescription?.()

      if (!isValid) {
        this.showValidationError = true
        setTimeout(() => {
          this.showValidationError = false
        }, 3000)
        return
      }

      this.showValidationError = false

      const payload = {
        patient: this.selectedPatient,
        ...this.formData
      }

      console.log('Updated prescription:', payload)
    }
  }
}
</script>

<style scoped>
.prescriptions-create-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

/* ========== Header ========== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem 0;
  border-bottom: 2px solid #e2e8f0;
  font-family: 'Manrope', sans-serif;
  gap: 1rem;
}

.header-text .header-title {
  font-size: 1.65rem;
  font-weight: 800;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}

.name-patient {
  color: #005dc1;
}

.icon-title {
  font-size: 1.8rem;
  color: #007bff;
  font-weight: 400;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn.ghost-btn {
  background-color: #f1f5f9;
  color: #0f172a;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid #cbd5e1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.btn.ghost-btn:hover {
  background-color: #e2e8f0;
  color: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.btn.return-btn {
  background-color: #2563eb; 
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 2px 6px rgba(37, 99, 235, 0.25); 
}

.btn.return-btn:hover {
  background-color: #1e40af;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.35); 
}

/* ========== Form ========== */
.form-container {
  margin-top: 1rem;
  font-family: 'Manrope', sans-serif;
}

.selected-patient-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: #fafafa;
  border: 1px solid #ccc;
  border-radius: 0.85rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.patient-details {
  display: flex;
  flex-direction: column;
}

.patient-details .label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.name-phone {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
}

.name-phone .phone {
  font-size: 0.9rem;
  font-weight: 400;
  color: #475569;
  
}

.btn.change-btn {
  background-color: #fafafa;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: all 0.25s ease-in-out;
}

.btn.change-btn:hover {
  background-color: #e2e8f0;
  color: #1e293b;
  transform: translateY(-1px);
}

/* ========== Actions ========== */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 0.95rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.btn.save {
  background-color: #38a169;
  color: #fff;
  border: 1px solid #2f855a;
}

.btn.save:hover {
  background-color: #2f855a;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.btn.cancel {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
}

.btn.cancel:hover {
  background-color: #e2e8f0;
  color: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

/* ========== Error ========== */
.toast-error {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 9999;
  background-color: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  padding: 0.9rem 1.2rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-weight: 300;
  font-size: 0.93rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.07);
  animation: fadeInOut 4s ease-in-out forwards;
  font-family: 'Manrope', sans-serif;
}

.toast-error .icon {
  font-size: 1.2rem;
  color: #dc2626;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  10% {
    opacity: 1;
    transform: translateY(0);
  }
  85% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>