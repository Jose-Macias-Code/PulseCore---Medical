<template>
  <div class="patient-prescriptions-view">
    <!-- Header -->
    <section class="header">
      <div class="header-text">
        <h1 class="header-title">
          <i class="ri-capsule-line icon-title"></i>
          <span class="name-patient">{{ patient.firstName }}'s</span> Prescriptions
        </h1>
        <p class="subtitle">
          Summary of prescribed treatments.
        </p>
      </div>

      <div class="header-actions">
        <router-link to="/prescriptions" class="btn ghost-btn">
          <i class="ri-arrow-left-line"></i>
          Back to Prescriptions
        </router-link>

        <router-link
          :to="{
            path: '/prescriptions/create',
            query: {
              patient_id: patient?.id,
              first_name: patient?.firstName,
            }
          }"
          class="btn create-btn"
        >
          <i class="ri-file-add-line"></i>
          New Prescription
        </router-link>
      </div>
    </section>

    <!-- Prescriptions List -->
    <section class="cards-container" v-if="prescriptions.length">
      <PrescriptionCard
        v-for="prescription in prescriptions"
        :key="prescription.id"
        :prescription="prescription"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </section>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <i class="ri-inbox-line"></i>
      <p>No prescriptions found for this patient.</p>
    </div>

    <DeletePrescriptionModal
      v-if="showDeleteModal"
      :prescription="prescriptionToDelete"
      @cancel="showDeleteModal = false"
      @confirm-delete="confirmDelete"
    />
  </div>
</template>

<script>
import PrescriptionCard from '../../components/prescriptions/PrescriptionCard.vue'
import DeletePrescriptionModal from '../../components/prescriptions/actions/DeletePrescriptions.vue'

export default {
  name: 'PatientPrescriptionsView',
  components: {
    PrescriptionCard,
    DeletePrescriptionModal
  },
  data() {
    return {
      patient: null,
      prescriptions: [],
      showDeleteModal: false,
      prescriptionToDelete: null,
    }
  },
  created() {
    const { id } = this.$route.params
    const { first_name } = this.$route.query

    if (!id || !first_name) {
      console.warn('Missing patient data in route')
      return this.$router.replace('/patients')
    }

    this.patient = {
      id: Number(id),
      firstName: first_name
    }

    this.prescriptions = [
      {
        id: 1,
        date: '2025-06-20',
        mainDrug: 'Paracetamol'
      },
      {
        id: 2,
        date: '2025-05-14',
        mainDrug: 'Ibuprofeno'
      }
    ]
  },
  methods: {
    // Edit
    handleEdit(prescription) {
      this.$router.push({
        name: 'prescriptions-edit',
        params: { id: prescription.id }
      })
    },
    // Delete
    handleDelete(prescription) {
      this.prescriptionToDelete = prescription
      this.showDeleteModal = true
    },
    confirmDelete() {
      const id = this.prescriptionToDelete?.id
      if (!id) return

      this.prescriptions = this.prescriptions.filter(p => p.id !== id)
      this.showDeleteModal = false
      this.prescriptionToDelete = null
    }
  }
}
</script>

<style scoped>
.patient-prescriptions-view {
  padding: 1rem;
  max-width: 900px;
  margin: 0 auto;
}

/* ===== Header General ===== */
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
  font-size: 1.7rem;
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
}

.subtitle {
  font-size: 0.92rem;
  color: #64748b;
  margin-top: 0.25rem;
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

.btn.create-btn {
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

.btn.create-btn:hover {
  background-color: #1e40af;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(37, 99, 235, 0.35); 
}

/* ========== Prescriptions List ========== */
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

/* ========== No Data ========== */
.empty-state {
  text-align: center;
  color: #9ca3af;
  font-size: 1rem;
  padding: 4rem 0;
}

.empty-state i {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}
</style>
