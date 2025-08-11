<template>
  <section class="drugs-table-card">
    <!-- Header -->
    <header class="drugs-table-card__header">
      <h2 class="drugs-table-card__title">Top Prescribed Medications</h2>
      <p class="drugs-table-card__subtitle">
        Overview of the most commonly prescribed drugs of all time
      </p>
    </header>

    <!-- Table -->
    <div class="drugs-table-wrapper">
      <table class="drugs-table">
        <thead>
          <tr>
            <th>Medication</th>
            <th>Prescriptions</th>
            <th>Route</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="drug in drugs" :key="drug.id">
            <td>{{ drug.name }}</td>
            <td>{{ drug.prescriptions }}</td>
            <td>{{ drug.route }}</td>
            <td>{{ drug.type }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TopPrescribedDrugsTable',
  props: {
    drugs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.drugs-table-card {
  background-color: #ffffff;
  border-radius: 1.25rem;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* =========== Header =========== */
.drugs-table-card__header {
  margin-bottom: 0.5rem;
}

.drugs-table-card__title {
  font-family: 'Manrope', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.drugs-table-card__subtitle {
  font-family: 'Manrope', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  color: #64748b;
  margin: 0.25rem 0 0;
}

/* =========== Table =========== */
.drugs-table-wrapper {
  overflow-x: auto;
}

.drugs-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Manrope', sans-serif;
}

.drugs-table thead {
  background-color: #f1f5f9;
}

.drugs-table th,
.drugs-table td {
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  white-space: nowrap;
}

.drugs-table th {
  font-weight: 700;
  color: #334155;
}

.drugs-table td {
  color: #475569;
  border-top: 1px solid #e2e8f0;
}

/* =========== Responsive =========== */
@media (max-width: 640px) {
  .drugs-table th,
  .drugs-table td {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
}
</style>
