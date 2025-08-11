<template>
  <div class="patients-table-container">
    <table class="patients-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Phone</th>
          <th>Last Appointment</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="patient in patients" :key="patient.id">
          <td class="cell-name">
            {{ formatName(patient) }}
          </td>
          <td>{{ patient.age }}</td>
          <td>
            <span :class="['gender-badge', getGenderClass(patient.gender)]">
              <i :class="getGenderIcon(patient.gender)"></i>
              <span class="gender-label">{{ capitalizeGender(patient.gender) }}</span>
            </span>
          </td>
          <td>{{ patient.phone }}</td>
          <td>{{ formatDate(patient.lastAppointment) }}</td>
          <td class="cell-actions">
            <button class="icon-btn delete" @click="$emit('delete', patient)">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </tr>
        <tr v-if="patients.length === 0">
          <td colspan="6" class="no-data">No patients found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PatientsTable',
  props: {
    patients: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatName(patient) {
      return `${patient.lastName}, ${patient.firstName}`;
    },
    formatDate(dateStr) {
      if (!dateStr) return '—';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    },
    capitalizeGender(gender) {
      return gender.charAt(0).toUpperCase() + gender.slice(1);
    },
    getGenderClass(gender) {
      switch (gender) {
        case 'male': return 'badge-male';
        case 'female': return 'badge-female';
        case 'other': return 'badge-other';
        default: return 'badge-default';
      }
    },
    getGenderIcon(gender) {
      switch (gender) {
        case 'male': return 'ri-men-line';
        case 'female': return 'ri-women-line';
        case 'other': return 'ri-genderless-line gender-icon other';
        default: return 'ri-question-line';
      }
    }
  }
};
</script>

<style scoped>
.patients-table-container {
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  width: 95%;                
  margin: 0 auto;            
}

/* ========== Table ========== */
.patients-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Manrope', sans-serif;
}

.patients-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.patients-table td {
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.cell-name {
  font-weight: 600;
  color: #1e293b;
}

/* ========== Actions ========== */
.cell-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: left;
  align-items: left;
}

.icon-btn {
  all: unset;
  cursor: pointer;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.icon-btn.delete {
  color: #dc2626;
  border: 1.5px solid rgba(220, 38, 38, 0.2);
  background-color: rgba(220, 38, 38, 0.05);
}

.icon-btn.delete:hover {
  background-color: rgba(220, 38, 38, 0.15);
  transform: translateY(-1px) scale(1.05);
}

/* ========== Gender ========== */
.gender-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.6rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  text-transform: capitalize;
}

.badge-male {
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.badge-female {
  background-color: rgba(236, 72, 153, 0.1);
  color: #ec4899;
}

.badge-other {
  background-color: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}

.badge-default {
  background-color: rgba(203, 213, 225, 0.4);
  color: #475569;
}

.gender-badge i {
  font-size: 1rem;
  vertical-align: middle;
}

/* ========== No Data ========== */
.no-data {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}
</style>
