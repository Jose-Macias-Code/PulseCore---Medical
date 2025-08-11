<template>
  <div class="prescriptions-table-container">
    <table class="prescriptions-table">
      <thead>
        <tr>
          <th>Last recipe</th>
          <th>Patient</th>
          <th>Phone Number</th>
          <th>Main Drug</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prescription in prescriptions" :key="prescription.id">
          <td>{{ formatDate(prescription.date) }}</td>
          <td class="cell-name">{{ prescription.patient.firstName }}</td>
          <td>{{ prescription.patient.phone }}</td>
          <td>{{ prescription.mainDrug }}</td>
          <td class="cell-actions">
            <button class="icon-btn view" @click="$emit('view', prescription)">
              <i class="ri-eye-line"></i>
            </button>
            <button class="icon-btn delete" @click="$emit('delete', prescription)">
              <i class="ri-delete-bin-line"></i>
            </button>
            <button class="icon-btn create" @click="$emit('create-prescription', prescription.patient)">
              <i class="ri-file-add-line"></i>
            </button>
          </td>
        </tr>
        <tr v-if="prescriptions.length === 0">
          <td colspan="5" class="no-data">No prescriptions found</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionsTable',
  props: {
    prescriptions: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(dateStr) {
      if (!dateStr) return '—'

      const [y, m, d] = dateStr.split('-')
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      return `${monthNames[+m - 1]} ${+d}, ${y}`
    }
  }
};
</script>

<style scoped>
.prescriptions-table-container {
  overflow-x: auto;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background-color: #fff;
  width: 95%;
  margin: 0 auto;
}

/* ========== Table ========== */
.prescriptions-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Manrope', sans-serif;
}

.prescriptions-table th {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.prescriptions-table td {
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  vertical-align: middle;
}

.prescriptions-table .cell-name {
  font-weight: 600;
  color: #1e293b;
}

/* ========== Actions ========== */
.cell-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
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

.icon-btn.view {
  color: #0d9488;
  border: 1.5px solid rgba(13, 148, 136, 0.2);
  background-color: rgba(13, 148, 136, 0.05);
}

.icon-btn.view:hover {
  background-color: rgba(13, 148, 136, 0.15);
  transform: translateY(-1px) scale(1.05);
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

.icon-btn.create {
  color: #2563eb;
  border: 1.5px solid rgba(37, 99, 235, 0.2); 
  background-color: rgba(37, 99, 235, 0.05);
}

.icon-btn.create:hover {
  background-color: rgba(37, 99, 235, 0.15);
  transform: translateY(-1px) scale(1.05);
}

/* ========== No Data ========== */
.no-data {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}
</style>