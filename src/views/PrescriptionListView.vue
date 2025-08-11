<template>
  <div>
    <!-- Title, subtitle and action button -->
    <section class="prescription_header">
      <div class="prescription_header__text">
        <h1 class="prescription_header__title">Prescriptions</h1>
        <p class="prescription_header__subtitle">
          Manage prescriptions quickly and completely.
        </p>
      </div>
    </section>

    <PrescriptionsFilters @filter-change="handleFilterChange" />

    <PrescriptionsTable
      :prescriptions="filteredPrescriptions"
      @view="onViewPrescription"
      @delete="onDeletePrescription"
      @create-prescription="onCreatePrescription"
    />

    <DeletePrescriptionModal
      v-if="showDeleteModal"
      :prescription="prescriptionToDelete"
      @cancel="showDeleteModal = false"
      @confirm-delete="confirmDelete"
    />
  </div>

</template>

<script>
import PrescriptionsFilters from '../components/prescriptions/PrescriptionsFilters.vue'
import PrescriptionsTable from '../components/prescriptions/PrescriptionsTable.vue'
import DeletePrescriptionModal from '../components/prescriptions/actions/DeletePrescriptions.vue'

export default {
  name: 'PrescriptionListView',
  components: {
    PrescriptionsFilters,
    PrescriptionsTable,
    DeletePrescriptionModal,
  },

  data() {
    return {
      prescriptions: [
        {
          id: 1,
          date: '2025-06-01',
          patient: {
            id: 1,
            firstName: 'Juan',
            phone: '5551234567'
          },
          mainDrug: 'Amoxicilina'
        },
      ],
      filters: { searchQuery: '', range: '' },
      showDeleteModal: false,
      prescriptionToDelete: null,
    }
  },

  computed: {
    filteredPrescriptions() {
      let result = this.prescriptions

      if (this.filters.searchQuery) {
        const query = this.filters.searchQuery.toLowerCase()
        result = result.filter(p =>
          p.patient.firstName.toLowerCase().includes(query) ||
          p.patient.phone.includes(query)
        )
      }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (this.filters.range === 'today') {
        result = result.filter(p => {
          const [y, m, d] = p.date.split('-')
          const date = new Date(+y, +m - 1, +d)
          return date.getTime() === today.getTime()
        })
      }

      else if (this.filters.range === 'week') {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        const weekAgo = new Date(now)
        weekAgo.setDate(now.getDate() - 7)

        result = result.filter(p => {
          const [y, m, d] = p.date.split('-')
          const date = new Date(+y, +m - 1, +d)
          return date >= weekAgo && date <= now
        })
      }

      else if (this.filters.range === 'month') {
        const now = new Date()
        now.setHours(0, 0, 0, 0)
        const monthAgo = new Date(now)
        monthAgo.setMonth(now.getMonth() - 1)

        result = result.filter(p => {
          const [y, m, d] = p.date.split('-')
          const date = new Date(+y, +m - 1, +d)
          return date >= monthAgo && date <= now
        })
      }

      return result
    }
  },

  methods: {
    // View 
    onViewPrescription(prescription) {
      this.$router.push({ name: 'prescriptions-view', params: { id: prescription.patient.id }, query: {
        first_name: prescription.patient.firstName,
      } })
    },
    // Delete
    onDeletePrescription(prescription) {
      this.prescriptionToDelete = prescription
      this.showDeleteModal = true
    },
    confirmDelete() {
      const id = this.prescriptionToDelete?.id
      if (!id) return

      this.prescriptions = this.prescriptions.filter(p => p.id !== id)
      this.showDeleteModal = false
      this.prescriptionToDelete = null
    },
    // Create
    onCreatePrescription(patient) {
      this.$router.push({
        path: '/prescriptions/create',
        query: {
          patient_id: patient.id,
          first_name: patient.firstName,
          phone: patient.phone
        }
      })
    },
    // Fiters
    handleFilterChange(newFilters) {
      this.filters = newFilters
    }
  }
}
</script>

<style scoped>
/* =========== Header =========== */
.prescription_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.prescription_header__text {
  display: flex;
  flex-direction: column;
}

.prescription_header__title {
  font-family: 'Manrope', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 0;
}

.prescription_header__subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  line-height: 1.3;
  margin-top: 0.15rem;
}

.add-patient-button {
  background-color: #3b82f6;
  color: white;
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
  text-decoration: none;
}

.add-patient-button:hover {
  background-color: #2563eb;
}

.add-patient-button .icon {
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1;
}
</style>