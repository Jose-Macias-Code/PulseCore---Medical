<template>
  <div>
    <!-- Title, subtitle and action button -->
    <section class="patients-header">
      <div class="patients-header__text">
        <h1 class="patients-header__title">Patients</h1>
        <p class="patients-header__subtitle">
          Manage clinical records quickly and completely.
        </p>
      </div>

      <router-link to="/patients/create" class="add-patient-button">
        <i class="ri-user-add-line icon"></i>
        New Patient
      </router-link>
    </section>

    <PatientsFilters @filter-change="applyFilters" />

    <PatientsTable
      :patients="filteredPatients"
      @delete="onDeletePatient"
    />

    <DeletePatient
      v-if="showDeleteModal"
      :patient="patientToDelete"
      @cancel="showDeleteModal = false"
      @confirm-delete="confirmDelete"
    />
  </div>
</template>

<script>
import PatientsFilters from '../components/patients/PatientsFilters.vue'
import PatientsTable from '../components/patients/PatientsTable.vue'
// Action Delete
import DeletePatient from '../components/patients/actions/DeletePatient.vue'

export default {
  name: 'PatientsView',
  components: {
    PatientsFilters,
    PatientsTable,
    DeletePatient,
  },

  data() {
    return {
      patients: [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          age: 29,
          gender: 'male',
          phone: '555-123-4567',
          lastAppointment: '2024-11-01'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          age: 34,
          gender: 'female',
          phone: '555-987-6543',
          lastAppointment: '2025-05-22'
        },
        {
          id: 3,
          firstName: 'Jack',
          lastName: 'Brat',
          age: 24,
          gender: 'other',
          phone: '555-123-4567',
          lastAppointment: '2024-11-01'
        },
      ],
      showDeleteModal: false,
      patientToDelete: null,
      filteredPatients: [],
    }
  },

  created() {
    this.filteredPatients = this.patients;
  },

  methods: {
    // Eliminate Patient
    onDeletePatient(patient) {
      this.patientToDelete = patient
      this.showDeleteModal = true
    },
    confirmDelete() {
      this.filteredPatients = this.filteredPatients.filter(
        (p) => p.id !== this.patientToDelete.id
      )
      this.showDeleteModal = false
      this.patientToDelete = null
    },
    // Filters
    applyFilters({ searchQuery, gender }) {
      const query = searchQuery.trim().toLowerCase()

      this.filteredPatients = this.patients.filter(patient => {
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase()
        const matchesSearch =
          fullName.includes(query) || patient.phone.includes(query)

        const matchesGender = gender ? patient.gender === gender : true

        return matchesSearch && matchesGender
      })
    },
  }
}
</script>

<style scoped>
/* =========== Header =========== */
.patients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-family: 'Manrope', sans-serif;
}

.patients-header__text {
  display: flex;
  flex-direction: column;
}

.patients-header__title {
  font-size: 2rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 0;
}

.patients-header__subtitle {
  font-size: 1rem;
  font-weight: 500;
  color: #64748b;
  line-height: 1.3;
  margin-top: 0.15rem;
}

.add-patient-button {
  background-color: #3b82f6;
  color: white;
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