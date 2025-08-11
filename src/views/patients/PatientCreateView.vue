<template>
  <div class="patient-create-view">

    <header class="header">
      <h1 class="title">
        <i class="ri-user-add-line icon-title"></i>
        New Patient
      </h1>

      <router-link to="/patients" class="btn back-btn">
        <i class="ri-arrow-left-line"></i>
        Back to Patients
      </router-link>
    </header>

    <div class="form-container">
      <!-- Sections -->
      <SectionPersonalData ref="personalRef" v-model="formData.personalData" />
      <SectionEmergencyContact ref="emergencyRef" v-model="formData.emergencyContact" />
      <SectionCondition ref="conditionRef" v-model="formData.currentCondition" />

      <div class="form-actions">
        <button class="btn save" @click="handleSubmit">
          <i class="ri-check-line"></i>
          Save Patient
        </button>

        <router-link to="/patients" class="btn cancel">
          <i class="ri-close-line"></i>
          Cancel
        </router-link>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-box">
        <h2 class="modal-title">
          <i class="ri-user-add-line"></i>
          Patient Created
        </h2>
        <p>
          Patient "<strong>{{ createdPatient.name }}</strong>" was successfully created.
        </p>
        <p>Do you want to create a prescription for this patient?</p>

        <div class="modal-actions">
          <!-- It doesn't work because it expects something from the backend.
          Since this is just a frontend with mock data. -->
          <!-- <button class="btn primary" @click="goToPrescription">Yes, Create Prescription</button> -->
          <button class="btn secondary" @click="closeModal">No, Later</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SectionPersonalData from '../../components/patients/form/SectionPersonalData.vue'
import SectionEmergencyContact from '../../components/patients/form/SectionEmergencyContact.vue'
import SectionCondition from '../../components/patients/form/SectionCondition.vue'

export default {
  name: 'PatientCreateView',
  components: {
    SectionPersonalData,
    SectionEmergencyContact,
    SectionCondition
  },
  data() {
    return {
      formData: {
        personalData: {
          firstName: '',
          lastName: '',
          dob: '',
          age: '',
          gender: '',
          phone1: '',
          phone2: '',
          email: '',
          address: {
            street: '',
            colony: '',
            zip: '',
            city: ''
          }
        },
        emergencyContact: {
          name: '',
          relationship: '',
          phone: ''
        },
        currentCondition: {
          reason: '',
          symptoms: [],
          affectedArea: '',
          firstTime: '',
          previousDescription: ''
        }
      },
      showModal: false,
      createdPatient: { id: null, name: '' }
    }
  },
  methods: {
    async handleSubmit() {
      const personalValid = this.$refs.personalRef.validate()
      const emergencyValid = this.$refs.emergencyRef.validate()
      const conditionValid = this.$refs.conditionRef.validate()

      const allValid = personalValid.isValid && emergencyValid.isValid && conditionValid.isValid

      if (!allValid) {
        if (!personalValid.isValid) {
          this.scrollToSection('personalRef')
        } else if (!emergencyValid.isValid) {
          this.scrollToSection('emergencyRef')
        } else if (!conditionValid.isValid) {
          this.scrollToSection('conditionRef')
        }
        return
      }

      const response = await this.fakeApiCall() 

      this.createdPatient = {
        id: response.id,
        name: `${this.formData.personalData.firstName} ${this.formData.personalData.lastName}`
      }
      this.showModal = true
    },

    fakeApiCall() {
      return new Promise((resolve) =>
        setTimeout(() => resolve({ id: 123 }), 1000)
      )
    },

    closeModal() {
      this.showModal = false
      this.$router.push('/patients')
    },

    goToPrescription() {
      this.$router.push(`/prescriptions/create?patient_id=${this.createdPatient.id}`)
    },

    scrollToSection(refName) {
      const section = this.$refs[refName]?.$el
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }
}
</script>

<style scoped>
.patient-create-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 1rem;
}

/* ========== Header ========== */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  border-bottom: 2px solid #e2e8f0;
  font-family: 'Manrope', sans-serif;
}

.title {
  font-size: 2rem;
  font-weight: 400;
  color: #0f172a;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}

.icon-title {
  font-size: 1.8rem;
  color: #007bff;
}

.back-btn {
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

.back-btn:hover {
  background-color: #e2e8f0;
  color: #1e293b;
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

/* ========== Sections ========== */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* ========== Actions ========== */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  font-family: 'Manrope', sans-serif;
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

/* ========== MODAL ========== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6); 
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-box {
  background-color: #f8fafc;
  color: #0f172a;
  padding: 2rem;
  border-radius: 1.25rem;
  max-width: 420px;
  width: 90%;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.05),
    0 12px 24px rgba(0, 0, 0, 0.1);
  animation: fadeInUp 0.3s ease-out;
  font-family: 'Manrope', sans-serif;
  text-align: center;
}

.modal-title {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Manrope', sans-serif;
  color: #1e3a8a;
  margin-bottom: 1rem;
}

.modal-title i {
  font-size: 1.5rem;
  font-weight: 400;
}

.modal-box p {
  font-size: 1rem;
  color: #475569;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.modal-box strong {
  color: #0f172a;
  font-weight: 600;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.modal-actions .btn {
  padding: 0.6rem 1.3rem;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.modal-actions .btn.primary {
  background-color: #3b82f6;
  color: white;
}

.modal-actions .btn.primary:hover {
  background-color: #2563eb;
}

.modal-actions .btn.secondary {
  background-color: #e2e8f0;
  color: #1e293b;
}

.modal-actions .btn.secondary:hover {
  background-color: #cbd5e1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>