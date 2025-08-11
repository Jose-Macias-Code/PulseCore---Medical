<template>
  <div class="prescription-form-section">
    <!-- Title -->
    <h2 class="section-title">
      <i class="ri-clipboard-line icon-title"></i>
      Prescription Items
    </h2>

    <!-- Table -->
    <table class="medications-table">
      <thead>
        <tr>
          <th>Drug</th>
          <th>Dosage</th>
          <th>Route</th>
          <th>Type</th>
          <th>Frequency</th>
          <th>Days</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in medications" :key="index">
          <td>
            <input
              v-model="item.drug"
              type="text"
              class="input"
              placeholder="e.g. Ibuprofen"
            />
          </td>
          <td>
            <input
              v-model="item.dosage"
              type="text"
              class="input"
              placeholder="500mg"
            />
          </td>
          <td class="select-cell">
            <select v-model="item.route" class="input">
              <option disabled value="">Route</option>
              <option>Oral</option>
              <option>Inhalation</option>
              <option>Topical</option>
              <option>Intravenous</option>
              <option>Subcutaneous</option>
              <option>Intramuscular</option>
              <option>Rectal</option>
              <option>Ophthalmic</option>
            </select>
          </td>
          <td class="select-cell">
            <select v-model="item.type" class="input">
              <option disabled value="">Type</option>
              <option>Tablet</option>
              <option>Capsule</option>
              <option>Syrup</option>
              <option>Injection</option>
              <option>Cream</option>
              <option>Drops</option>
              <option>Spray</option>
              <option>Suppository</option>
            </select>
          </td>
          <td>
            <input
              v-model="item.frequency"
              type="text"
              class="input"
              placeholder="Twice a day"
            />
          </td>
          <td class="duration-cell">
            <input
              v-model.number="item.duration"
              type="number"
              class="input"
              min="1"
            />
          </td>
          <td class="actions">
            <button class="icon-btn delete" @click="removeMedication(index)" :disabled="medications.length === 1">
              <i class="ri-delete-bin-6-line"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn add-medication" @click="addMedication">
      <i class="ri-add-line"></i>
      Add Medication
    </button>

    <div class="notes-section">
      <label for="notes" class="notes-label">Additional Notes</label>
      <textarea
        id="notes"
        v-model="notes"
        class="textarea notes-textarea"
        placeholder="E.g. Take with food or after meals"
        rows="3"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrescriptionFormSection',
  props: {
    modelValue: Object
  },
  emits: ['update:modelValue'],
  computed: {
    medications: {
      get() {
        return this.modelValue.medications || []
      },
      set(value) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          medications: value
        })
      }
    },
    notes: {
      get() {
        return this.modelValue.notes || ''
      },
      set(value) {
        this.$emit('update:modelValue', {
          ...this.modelValue,
          notes: value
        })
      }
    }
  },
  created() {
    if (!this.modelValue.medications || this.modelValue.medications.length === 0) {
      this.medications = [{ drug: '', dosage: '', frequency: '', route: '', type: '', duration: 1 }]
    }
  },
  methods: {
    isValidPrescription() {
      return this.medications.some(m =>
        (m?.drug || '').trim() !== '' &&
        (m?.dosage || '').trim() !== '' &&
        (m?.route || '').trim() !== '' &&
        (m?.type || '').trim() !== '' &&
        (m?.frequency || '').trim() !== '' &&
        Number(m?.duration) > 0
      )
    },
    addMedication() {
      this.medications = [
        ...this.medications,
        { drug: '', dosage: '', frequency: '', route: '', type: '', duration: 1 }
      ]
    },
    removeMedication(index) {
      if (this.medications.length > 1) {
        const updated = [...this.medications]
        updated.splice(index, 1)
        this.medications = updated
      }
    }
  }
}
</script>

<style scoped>
.prescription-form-section {
  padding: 1rem 0;
  font-family: 'Manrope', sans-serif;
}

/* ========== Title ========== */
.section-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1.5px solid #e2e8f0;
  color: #334155;
}

.section-title .icon-title {
  font-size: 1.4rem;
  color: #007bff;
}

/* ========== Table ========== */
.medications-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  font-family: 'Manrope', sans-serif;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
}

.duration-cell {
  max-width: 50px;
  white-space: nowrap;
}

td.select-cell {
  min-width: 105px;
  max-width: 140px;
  padding: 0;
  margin: 0;
}

select.input {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #f8fafc;
  font-size: 0.85rem;
}

select.input::-ms-expand {
  display: none;
}

.medications-table thead {
  background: linear-gradient(to right, #f1f5f9, #e2e8f0);
}

.medications-table th {
  padding: 1rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 700;
  color: #475569;
  border-bottom: 1px solid #cbd5e1;
  letter-spacing: 0.5px;
}

.medications-table td {
  padding: 0.75rem 1rem;
  vertical-align: top;
  border-bottom: 1px solid #f1f5f9;
}

.input {
  width: 100%;
  padding: 0.55rem 0.75rem;
  font-size: 0.9rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.actions {
  text-align: center;
}

.icon-btn.delete {
  background: none;
  border: none;
  color: #ef4444;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.45rem;
  border-radius: 8px;
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon-btn.delete:hover {
  color: #b91c1c;
  transform: scale(1.05);
}

.icon-btn.delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* ========== Button ========== */
.btn.add-medication {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem 1.1rem;
  font-size: 0.92rem;
  font-weight: 600;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  font-family: 'Manrope', sans-serif;
}

.btn.add-medication i {
  font-size: 1rem;
}

.btn.add-medication:hover {
  background-color: #005dc1;
}

/* ========== Notes ========== */
.notes-section {
  margin-top: 2rem;
  max-width: 600px;
}

.notes-label {
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.4rem;
  display: inline-block;
}

.notes-textarea {
  width: 100%;
  padding: 0.65rem 0.85rem;
  font-size: 0.92rem;
  line-height: 1.5;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  font-family: 'Manrope', sans-serif;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  min-height: 80px;  
  max-height: 220px;
}

.notes-textarea::placeholder {
  color: #94a3b8;
  font-style: italic;
}

.notes-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>