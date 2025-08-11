<template>
  <div class="prescription-card">
    <!-- Fecha -->
    <div class="card-date">
      {{ formatDate(prescription.date) }}
    </div>

    <div class="card-meta">
      <div class="card-label">Main Drug:</div>
      <div class="card-drug">
        {{ prescription.mainDrug }}
      </div>
    </div>

    <!-- Acciones -->
    <div class="card-actions">
      <button class="btn-icon edit" @click="$emit('edit', prescription)">
        <i class="ri-pencil-line"></i>
      </button>
      <button class="btn-icon delete" @click="$emit('delete', prescription)">
        <i class="ri-delete-bin-line"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionCard',
  props: {
    prescription: {
      type: Object,
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
}
</script>

<style scoped>
.prescription-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  transition: all 0.25s ease;
}

.card-date {
  font-size: 0.85rem;
  font-weight: 600;
  color: #5c5043; 
  background-color: #f5f5f4; 
  padding: 0.4rem 0.85rem;
  border-radius: 9999px;
  width: fit-content;
  box-shadow: inset 0 0 0 1px #5c5043; 
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.3px;
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.card-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #7c6f60; 
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-family: 'Inter', sans-serif;
  opacity: 0.85;
}

.card-drug {
  font-size: 1rem;
  font-weight: 800;
  color: #3a3127; 
  line-height: 1.4;
  margin: 0;
  font-family: 'Inter', sans-serif;
  letter-spacing: -0.25px;
  word-break: break-word;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 2px solid #e7e5e4; 
}

.btn-icon {
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  font-size: 1.25rem;
  border-radius: 0.65rem;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  border: 1px solid transparent;
}

.btn-icon.edit {
  color: #3b3b3b;
  background-color: #f4f3ee; /* crema grisáceo */
  border-color: #e2e0dc;
}

.btn-icon.edit:hover {
  background-color: #eae9e4;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
}

.btn-icon.delete {
  color: #991b1b;
  background-color: #fef2f2; /* rosado crema */
  border-color: #fcdcdc;
}

.btn-icon.delete:hover {
  background-color: #fde8e8;
  transform: translateY(-1px) scale(1.03);
  box-shadow: 0 2px 6px rgba(153, 27, 27, 0.1);
}

</style>